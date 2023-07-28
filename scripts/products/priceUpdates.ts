import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getProductById } from "../../functions/products/getProductById";
import { getProductIdFromSku } from "../../functions/products/getProductIdFromSku";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";

require("../../config/config").config("bf");
const data = [
  { sku: "10497A", sale_price: 25.85 },
  { sku: "10492", sale_price: 28.4 },
  { sku: "10493", sale_price: 28.4 },
  { sku: "9545", sale_price: 75.0 },
  { sku: "9539", sale_price: 60.0 },
  { sku: "9541", sale_price: 83.0 },
  { sku: "9555", sale_price: 53.0 },
  { sku: "10593", sale_price: 21.99 },
  { sku: "9070A", sale_price: 28.0 },
  { sku: "9357", sale_price: 9.0 },
  { sku: "7986", sale_price: 16.9 },
  { sku: "10187", sale_price: 40.0 },
  { sku: "100024", sale_price: 72.0 },
  { sku: "8755", sale_price: 47.0 },
  { sku: "9306", sale_price: 44.0 },
  { sku: "8858", sale_price: 75.0 },
  { sku: "7905", sale_price: 15.0 },
  { sku: "9991", sale_price: 114.0 },
  { sku: "9990", sale_price: 114.0 },
  { sku: "9993", sale_price: 144.0 },
  { sku: "11569", sale_price: 49.95 },
  { sku: "11581", sale_price: 20.95 },
  { sku: "11565", sale_price: 11.95 },
  { sku: "11574", sale_price: 6.95 },
  { sku: "11566", sale_price: 9.95 },
  { sku: "10590", sale_price: 27.0 },
  { sku: "10109", sale_price: 14.99 },
  { sku: "10113", sale_price: 19.99 },
  { sku: "10114", sale_price: 14.99 },
  { sku: "11265", sale_price: 54.0 },
  { sku: "9125", sale_price: 135.2 },
  { sku: "KER_E007710", sale_price: 35.0 },
  { sku: "9678", sale_price: 12.5 },
  { sku: "9681", sale_price: 15.0 },
  { sku: "9679", sale_price: 18.0 },
  { sku: "10356", sale_price: 10.5 },
  { sku: "9817", sale_price: 33.99 },
  { sku: "8296", sale_price: 48.5 },
  { sku: "11286", sale_price: 22.5 },
  { sku: "6077", sale_price: 16.99 },
  { sku: "10921", sale_price: 45.0 },
  { sku: "10924", sale_price: 45.0 },
  { sku: "12082", sale_price: 13.99 },
  { sku: "12161", sale_price: 8.99 },
  { sku: "10183", sale_price: 18.0 },
  { sku: "11603", sale_price: 13.0 },
  { sku: "7500", sale_price: 18.99 },
  { sku: "9434", sale_price: 19.0 },
  { sku: "11344", sale_price: 63.0 },
  { sku: "11250", sale_price: 60.0 },
  { sku: "11251", sale_price: 60.0 },
  { sku: "12046", sale_price: 53.0 },
  { sku: "12045", sale_price: 70.0 },
  { sku: "12048", sale_price: 50.5 },
  { sku: "12044", sale_price: 27.0 },
  { sku: "12047", sale_price: 34.5 },
  { sku: "12049", sale_price: 27.0 },
  { sku: "10591", sale_price: 20.0 },
  { sku: "10592", sale_price: 17.0 },
  { sku: "9105", sale_price: 9.95 },
  { sku: "7176", sale_price: 7.99 },
  { sku: "11092", sale_price: 25.6 },
  { sku: "9707", sale_price: 25.0 },
  { sku: "9701", sale_price: 18.0 },
];

const clearanceCategoryId = 515;
const noDiscountCategoryId = 640;

async function main() {
  // identify product ids
  // reduce to 15% margin
  // add to clearance sections
  for (const row of data) {
    try {
      console.log(`finding product id for sku: ${row.sku}...`);
      const p_id = await getProductIdFromSku(row.sku);
      const variants = await getProductVariants(p_id);
      const product = await getProductById(p_id);
      const updatedProductCategories = [
        ...product.categories,
        clearanceCategoryId,
        noDiscountCategoryId,
      ];
      if (variants.length === 1 && variants[0].sku_id === null) {
        console.log("only one base variant. updating product");
        // update product
        await updateProduct(p_id, {
          sale_price: row.sale_price,
          categories: updatedProductCategories,
        });
      } else {
        console.log("looking for variant");
        const variant = variants.find((v) => v.sku === row.sku);
        if (variant) {
          console.log("variant found");
          // update variant
          await updateProductVariant(p_id, variant.id, {
            sale_price: row.sale_price,
          });
          await updateProduct(p_id, {
            categories: updatedProductCategories,
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
