import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
//import { getProductById } from "../../functions/products/getProductById";
import { getProductIdFromSku } from "../../functions/products/getProductIdFromSku";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";

require("../../config/config").config("pb");
const data = [
  { sku: "6163", rrp: 69.99, sales: 62.99 },
  { sku: "7021", rrp: 199.99, sales: 182.99 },
  { sku: "8751", rrp: 76.99, sales: 74.99 },
  { sku: "6160", rrp: 64.99, sales: 54.99 },
  { sku: "6159", rrp: 69.99, sales: 59.99 },
  { sku: "6161", rrp: 99.99, sales: 89.99 },
  { sku: "8752", rrp: 69.99, sales: 59.99 },
  { sku: "7029", rrp: 79.99, sales: 74.99 },
  { sku: "10860", rrp: 69.99, sales: 65.99 },
  { sku: "7027", rrp: 19.99, sales: 11.99 },
  { sku: "7027", rrp: 19.99, sales: 11.99 },
  { sku: "7025", rrp: 21.99, sales: 14.99 },
  { sku: "7025", rrp: 21.99, sales: 14.99 },
  { sku: "7026", rrp: 32.99, sales: 29.99 },
  { sku: "7026", rrp: 32.99, sales: 29.99 },
  { sku: "7699", rrp: 69.99, sales: 59.99 },
  { sku: "7700", rrp: 69.99, sales: 59.99 },
  { sku: "7693", rrp: 39.99, sales: 36.99 },
  { sku: "7695", rrp: 59.99, sales: 49.99 },
  { sku: "7696", rrp: 59.99, sales: 49.99 },
  { sku: "9798", rrp: 59.99, sales: 49.99 },
];

async function main() {
  // identify product ids
  // reduce to 15% margin
  // add to clearance sections
  for (const row of data) {
    try {
      console.log(`finding product id for sku: ${row.sku}...`);
      const p_id = await getProductIdFromSku(row.sku);
      const variants = await getProductVariants(p_id);
      //const product = await getProductById(p_id);

      if (variants.length === 1 && variants[0].sku_id === null) {
        console.log("only one base variant. updating product");
        // update product
        await updateProduct(p_id, {
          price: row.rrp,
          retail_price: row.rrp,
          sale_price: row.sales,
        });
      } else {
        console.log("looking for variant");
        const variant = variants.find((v) => v.sku === row.sku);
        if (variant) {
          console.log("variant found", variant.price);
          // update variant
          await updateProductVariant(p_id, variant.id, {
            price: row.rrp,
            retail_price: row.rrp,
            sale_price: row.sales,
          });
        }
      }
      console.log(`updated product with sku: ${row.sku}`);
    } catch (err) {
      console.log(err);
      continue;
    }
  }
  console.log("done");
}
main();
