import { addCatToProduct } from "../functions/products/addCatToProduct";
import { getAllProducts } from "../functions/products/getAllProducts";
import { getProductBySku } from "../functions/products/getProductBySKU";
import { getProductIdFromSku } from "../functions/products/getProductIdFromSku";
import { getProductVariants } from "../functions/products/getProductVariants";
/**
 * needed to get products from a category on beautyskincare and map them to an equivalent category on pixieloves
 */

async function main() {
  try {
    const data = [
      { cat_name: "Product Range", bsk_id: 59, px_id: 449 },
      { cat_name: "Active Clearing", bsk_id: 93, px_id: 458 },
      { cat_name: "AGE Smart®", bsk_id: 12, px_id: 452 },
      { cat_name: "UltraCalming™ (Sensitive Skin)", bsk_id: 18, px_id: 459 },
      {
        cat_name: "MediBac Clearing® (Acne treatments)",
        bsk_id: 23,
        px_id: 451,
      },
      {
        cat_name: "Clear Start™ (Skincare for Teenagers)",
        bsk_id: 52,
        px_id: 460,
      },
      { cat_name: "Daily Skin Health", bsk_id: 16, px_id: 455 },
      { cat_name: "Daylight Defense", bsk_id: 17, px_id: 457 },
      { cat_name: "PowerBright TRx™", bsk_id: 53, px_id: 454 },
      { cat_name: "Gluten-Free", bsk_id: 79, px_id: 456 },
      { cat_name: "Vegan", bsk_id: 80, px_id: 453 },
      { cat_name: "Skin Concern", bsk_id: 60, px_id: 450 },
      { cat_name: "Signs of Ageing", bsk_id: 62, px_id: 467 },
      { cat_name: "Acne and Breakouts", bsk_id: 41, px_id: 465 },
      { cat_name: "Dryness and Dehydration", bsk_id: 40, px_id: 463 },
      { cat_name: "Oily Skin", bsk_id: 46, px_id: 461 },
      { cat_name: "Sensitivity and Redness", bsk_id: 61, px_id: 462 },
      { cat_name: "Uneven Skin Tone", bsk_id: 63, px_id: 466 },
      { cat_name: "Dermalogica Speed Mapping", bsk_id: 65, px_id: 464 },
    ];
    for (let x = 1; x < data.length; x++) {
      const category = data[x];

      require("./config/config").config("bsk");
      const bskSKUs = [];
      

      const products = await getAllProducts({
        "categories:in": category.bsk_id,
      });
      console.log(
        `there are ${products.length} products in the ${category.cat_name} category`
      );

      for (let i = 0; i < products.length; i++) {
        const product = products[i];

        console.log(`getting variants for ${i + 1}/${products.length}`);

        const variants = (await getProductVariants(product.id)) as any[];
        for (let ii = 0; ii < variants.length; ii++) {
          const variant = variants[ii];
          bskSKUs.push(variant.sku);
        }
      }

      const uniquebskSKUs = [...new Set(bskSKUs)];

      require("./config/config").config("px");

      for (let iii = 0; iii < uniquebskSKUs.length; iii++) {
        const sku = uniquebskSKUs[iii];

        let product;

        try {
          product = (await getProductBySku(sku)) as any;
        } catch (err) {
          continue;
        }

        console.log(`adding category to product ${product.name}`);

        try {
          await addCatToProduct(product.id, category.px_id);
        } catch (err) {
          console.log(
            `error adding cat id ${category.px_id} to ${product.name}`
          );
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}
main();
