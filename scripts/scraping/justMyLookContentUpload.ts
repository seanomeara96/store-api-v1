import path from "path";
import fs from "fs";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { beautyfeaturesPrompt } from "../../chat/prompts";
import OpenAI from "openai";
import { marked } from "marked";
import { createProductImageFromFile } from "../../functions/images/createProductImage";
import { updateProduct } from "../../functions/products/updateProduct";

type jmlProductDetail = {
  name: string;
  price: number;
  barcode: number;
  url: string;
  sku: string;
  scrapedAt: string;
  description: string;
  images: string[];
};

type ProgressState = {
  // key: sku
  products: Record<
    string,
    {
      descriptionUploaded?: boolean;
      imageUploaded?: Record<number, boolean>; // key: image index
    }
  >;
};

async function justMyLookContentUpload() {
  try {
    const fileContents = fs.readFileSync(
      path.resolve(__dirname, "products.json"),
      { encoding: "utf-8" },
    );
    const jmlData = JSON.parse(fileContents) as jmlProductDetail[];
    require("../../config/config").config("bf");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const progressFile = path.resolve(__dirname, "jml_upload_progress.json");

    const loadProgress = (): ProgressState => {
      try {
        if (fs.existsSync(progressFile)) {
          return JSON.parse(
            fs.readFileSync(progressFile, { encoding: "utf-8" }),
          ) as ProgressState;
        }
      } catch (e) {
        console.log("Failed to read progress file, starting fresh:", e);
      }
      return { products: {} };
    };

    const saveProgress = (state: ProgressState) => {
      fs.writeFileSync(progressFile, JSON.stringify(state, null, 2), {
        encoding: "utf-8",
      });
    };

    const progress = loadProgress();

    for (let i = 0; i < jmlData.length; i++) {
      console.log(i, jmlData.length);
      const row = jmlData[i];

      progress.products[row.sku] ??= {};
      progress.products[row.sku].imageUploaded ??= {};

      const product = await getProductBySku(row.sku);
      if (!product) {
        console.log(`no product found on bf with sku ${row.sku}`);
        continue;
      }

      if (!progress.products[row.sku].descriptionUploaded) {
        const prompt = beautyfeaturesPrompt(row.description);
        let response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
        });
        product!.description = await marked(
          response.choices[0].message.content || "",
        );
        console.log(product.id, product.name);

        await updateProduct(product.id, { description: product.description });

        progress.products[row.sku].descriptionUploaded = true;
        saveProgress(progress);
      } else {
        console.log(
          `Skipping description upload for sku ${row.sku} (already uploaded)`,
        );
      }

      for (let ii = 0; ii < row.images.length; ii++) {
        if (progress.products[row.sku].imageUploaded?.[ii]) {
          console.log(
            `Skipping image ${ii} upload for sku ${row.sku} (already uploaded)`,
          );
          continue;
        }

        const imgPath = row.images[ii];
        await createProductImageFromFile(
          product.id,
          path.resolve(__dirname, imgPath),
          row.name + ` image ${ii}`,
          ii === 0,
          ii,
        );

        progress.products[row.sku].imageUploaded![ii] = true;
        saveProgress(progress);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

justMyLookContentUpload();
