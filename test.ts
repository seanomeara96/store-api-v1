import { getAllProductImages } from "./functions/images/getAllProductImages";
import { Product } from "./functions/products/Product";
import { getAllProducts } from "./functions/products/getAllProducts";
import { output } from "./scripts/utils/output";
import path from "path";
import { stringify } from "csv-stringify";
require("./config/config").config("bf");

const issues: Product[] = [];

async function doesProductNeedSetup(product: Product) {
  try {
    if (!product.inventory_level) {
      return false;
    }

    if (product.description === "") {
      issues.push(product);
      return true;
    }

    const images = await getAllProductImages(product.id);

    if (images.length === 0) {
      issues.push(product);
      return true;
    }

    return false;
  } catch (err) {
    throw err;
  }
}

async function test() {
  try {
    const products = await getAllProducts(/*{id: 7771}*/);
    
    const batchSize = 50;
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      const promises: Promise<boolean>[] = [];

      for (let ii = 0; ii < batch.length; ii++) {
        const product = batch[ii];
        const promise = doesProductNeedSetup(product);
        promises.push(promise);
      }

      await Promise.all(promises);
      // console.log(res)
    }
    console.log(`${issues.length} products need content / images`);
    const outputData = issues.map(({ id, name, sku }) => ({ id, name, sku }));
    output(path.resolve(__dirname, "instock-not-setup.csv"), outputData, true);

    /*const stringifyOptions = { header: true }
    stringify(stringifyOptions, outputData, (err, csv) => {
      if (err) throw err
      const attachment = Buffer.from(csv).toString("base64");
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const subj = `New Product Images & Content Report`;
      const msg = {
        to: ["sean@beautyfeatures.ie", "john@beautyfeatures.ie"],
        from: "sean@beautyfeatures.ie",
        subject: subj,
        text: subj,
        attachments: [
          {
            content: attachment,
            filename: `product-content-images.csv`,
            type: "text/csv",
            disposition: "attachment",
          },
        ],
      };
      
      sgMail.send(msg)
    });*/

  } catch (err) {
    console.log(err);
  }
}
test();
