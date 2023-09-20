import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
//import { getProductById } from "../../functions/products/getProductById";
import { getProductIdFromSku } from "../../functions/products/getProductIdFromSku";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";

require("../../config/config").config("pb");
const data = [
  { sku: "7125", sale_price: 6.99 },
  { sku: "7126", sale_price: 6.99 },
  { sku: "7127", sale_price: 6.99 },
  { sku: "10761", sale_price: 13.99 },
  { sku: "10760", sale_price: 13.99 },
  { sku: "7109", sale_price: 7.99 },
  { sku: "9590", sale_price: 3.99 },
  { sku: "5306", sale_price: 5.99 },
  { sku: "9582", sale_price: 8.99 },
  { sku: "7241", sale_price: 21.99 },
  { sku: "8709", sale_price: 6.99 },
  { sku: "6432", sale_price: 11.99 },
  { sku: "7118", sale_price: 4.99 },
  { sku: "7121", sale_price: 21.99 },
  { sku: "5383", sale_price: 8.99 },
  { sku: "9622", sale_price: 9.99 },
  { sku: "9623", sale_price: 9.99 },
  { sku: "9624", sale_price: 9.99 },
  { sku: "9625", sale_price: 9.99 },
  { sku: "7242", sale_price: 18.99 },
  { sku: "5303", sale_price: 2.99 },
  { sku: "11972", sale_price: 9.99 },
  { sku: "9617", sale_price: 6.99 },
  { sku: "9621", sale_price: 7.99 },
  { sku: "9578", sale_price: 14.99 },
  { sku: "9601", sale_price: 9.99 },
  { sku: "9602", sale_price: 9.99 },
  { sku: "9604", sale_price: 9.99 },
  { sku: "9605", sale_price: 9.99 },
  { sku: "9618", sale_price: 6.99 },
  { sku: "9619", sale_price: 6.99 },
  { sku: "9620", sale_price: 6.99 },
  { sku: "7649", sale_price: 9.99 },
  { sku: "9581", sale_price: 15.99 },
  { sku: "9607", sale_price: 14.99 },
  { sku: "9609", sale_price: 14.99 },
  { sku: "9610", sale_price: 14.99 },
  { sku: "12723", sale_price: 7.99 },
  { sku: "9596", sale_price: 8.99 },
  { sku: "9597", sale_price: 8.99 },
  { sku: "9598", sale_price: 8.99 },
  { sku: "9599", sale_price: 8.99 },
  { sku: "9600", sale_price: 8.99 },
  { sku: "9612", sale_price: 4.99 },
  { sku: "9613", sale_price: 4.99 },
  { sku: "9614", sale_price: 4.99 },
  { sku: "9615", sale_price: 4.99 },
  { sku: "6099", sale_price: 29.99 },
  { sku: "7461", sale_price: 28.99 },
  { sku: "9591", sale_price: 5.99 },
  { sku: "9592", sale_price: 5.99 },
  { sku: "8706", sale_price: 8.99 },
  { sku: "8704", sale_price: 8.99 },
  { sku: "9589", sale_price: 12.99 },
  { sku: "12725", sale_price: 10.99 },
  { sku: "12726", sale_price: 10.99 },
  { sku: "12727", sale_price: 10.99 },
  { sku: "12728", sale_price: 10.99 },
  { sku: "11954", sale_price: 61.99 },
  { sku: "6191", sale_price: 41.99 },
  { sku: "7100", sale_price: 14.99 },
  { sku: "9616", sale_price: 16.99 },
  { sku: "7129", sale_price: 55.99 },
  { sku: "7243", sale_price: 55.99 },
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
          sale_price: row.sale_price,
        });
      } else {
        console.log("looking for variant");
        const variant = variants.find((v) => v.sku === row.sku);
        if (variant) {
          console.log("variant found", variant.price);
          // update variant
          await updateProductVariant(p_id, variant.id, {
            sale_price: row.sale_price,
            price: row.sale_price
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
