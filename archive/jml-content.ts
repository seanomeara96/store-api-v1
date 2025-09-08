import path from "path";
import fs from "fs";
import puppeteer from "puppeteer";
import { getProductBySku } from "../functions/products/getProductBySKU";
import { generateProductDescription } from "../functions/chat/generateProductDescription";
import { beautyfeaturesPrompt } from "../chat/prompts";
import { updateProduct } from "../functions/products/updateProduct";
import { image } from "image-downloader";
import { createProductImageFromFile } from "../functions/images/createProductImage";
import { getAllProductImages } from "../functions/images/getAllProductImages";

require("../config/config").config("bf");

interface data {
  URL: string;
  sku: string;
  barcode: string;
}

const data: data[] =[];

let close: () => Promise<void>;

async function testMain() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    close = browser.close;

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0 Safari/537.36"
    );

    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      console.log(i, data.length, row.sku);

      const pageStatus = (await fetch(row.URL, { redirect: "manual" })).status;
      if (pageStatus != 200) {
        fs.appendFileSync(
          path.resolve(__dirname, "skip-reasons.txt"),
          `skipped ${row.sku} because the page id redirected or broken ${row.URL}`
        );
        continue;
      }

      const product = await getProductBySku(row.sku);
      if (!product) throw `expected ${row.sku} to return a product`;

      if (product.is_visible) continue;

      const productImages = await getAllProductImages(product.id);
      let doImages = productImages.length === 0;
      let doContent = product.description.length === 0;

      if (!doImages && !doContent) continue;

      // navigate to page
      await page.goto(row.URL, {
        waitUntil: "domcontentloaded", // or 'networkidle2'
        timeout: 0, // disable timeout while testing
      });

      if (doContent) {
        // get content

        const content = await page.evaluate(function () {
          return (
            document.querySelector(
              "#Details-description-template--25520256778566__main"
            )?.textContent || ""
          )
            .trim()
            .replace(/[\s]+/gi, " ");
        });

        const bfContent = await generateProductDescription(
          `Product Name: ${product.name};` + content,
          "",
          beautyfeaturesPrompt
        );

        await updateProduct(product.id, { description: bfContent });
      }

      if (doImages) {
        const imageLinks = await page.evaluate(function () {
          return [
            ...document.querySelectorAll<HTMLImageElement>(
              ".product__media-item img"
            ),
          ].map((img) => {
            if (!img.srcset) {
              return "";
            }
            const srcs = img.srcset.split("\n");
            if (srcs.length < 1) {
              return "";
            }
            const m = srcs[0].match(/www[^]+\.(jpg|jpeg|png|webp|gif|svg)/i);
            if (!m) {
              return "";
            }
            return `https://` + m[0];
          });
        });

        if (imageLinks.length < 1) {
          throw `I expected image links on this page: ${row.URL}`;
        }

        if (!fs.existsSync(path.resolve(__dirname, "jml-images"))) {
          fs.mkdirSync(path.resolve(__dirname, "jml-images"));
        }

        if (
          !fs.existsSync(path.resolve(__dirname, `jml-images`, `${row.sku}`))
        ) {
          fs.mkdirSync(path.resolve(__dirname, `jml-images`, `${row.sku}`));
        }

        let retries = 5;
        for (let j = 0; j < imageLinks.length; j++) {
          try {
            const imageLink = imageLinks[j];
            const res = await image({
              url: imageLink,
              dest: path.resolve(__dirname, `jml-images/${row.sku}`),
            });
            await createProductImageFromFile(
              product.id,
              res.filename,
              `${product.name} image ${j}`,
              j === 0,
              j
            );
          } catch (err) {
            if (retries > 0) {
              j--;
              retries--;
              console.log(
                `retrying image fetch for product ${row.sku} image number ${j}`
              );
              continue;
            }
            throw err;
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  close();
}
testMain();
