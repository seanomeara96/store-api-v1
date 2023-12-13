import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getProductBySku } from "../../functions/products/getProductBySKU";
//import { getProductById } from "../../functions/products/getProductById";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";

require("../../config/config").config("px");
//const no_discount_category_ID = 1493;
const data = [
  { sku: "101511", sale_price: 42.71, new_price: 41.99 },
  { sku: "102321", sale_price: 55.99, new_price: 59.99 },
  { sku: "103605", sale_price: 84.73, new_price: 79.99 },
  { sku: "106053", sale_price: 63.72, new_price: 62.99 },
  { sku: "101602", sale_price: 41.99, new_price: 44.99 },
  { sku: "101106", sale_price: 58.94, new_price: 56.99 },
  { sku: "110542", sale_price: 58.94, new_price: 54.99 },
  { sku: "110541", sale_price: 36.39, new_price: 35.99 },
  { sku: "110616", sale_price: 38.78, new_price: 37.99 },
  { sku: "110700", sale_price: 55.99, new_price: 57.99 },
  { sku: "110631", sale_price: 78.07, new_price: 63.99 },
  { sku: "110630", sale_price: 42.03, new_price: 39.99 },
  { sku: "110625", sale_price: 66.11, new_price: 64.99 },
  { sku: "110548", sale_price: 44.99, new_price: 48.99 },
  { sku: "102021", sale_price: 42.71, new_price: 39.99 },
  { sku: "110641", sale_price: 49.99, new_price: 52.99 },
  { sku: "100851", sale_price: 22.72, new_price: 21.99 },
  { sku: "111006", sale_price: 71.75, new_price: 67.99 },
  { sku: "7601", sale_price: 63.72, new_price: 61.99 },
  { sku: "7796", sale_price: 133.76, new_price: 132.99 },
  { sku: "8755", sale_price: 58.08, new_price: 61.99 },
  { sku: "9716", sale_price: 73.29, new_price: 66.99 },
  { sku: "11030", sale_price: 65, new_price: 59 },
];

async function main() {
  // identify product ids
  // reduce to 15% margin
  // add to clearance sections
  for (const row of data) {
    try {
      console.log(`finding product id for sku: ${row.sku}...`);
      const product = await getProductBySku(row.sku);
      const variants = await getProductVariants(product.id);
      //const product = await getProductById(p_id);

      if (variants.length === 1 && variants[0].sku_id === null) {
        console.log("only one base variant. updating product");
        let updates: any = {
          sale_price: row.new_price,
        };

        // update product
        await updateProduct(product.id, updates);
      } else {
        console.log("looking for variant");
        const variant = variants.find((v) => v.sku === row.sku);
        if (variant) {
          console.log("variant found");

          // update variant
          await updateProductVariant(product.id, variant.id, {
            sale_price: row.new_price,
          });
        }
      }
      console.log(`updated product with sku: ${row.sku}`);
    } catch (err) {
      console.log(err);
      continue;
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  console.log("done");
}
main();
