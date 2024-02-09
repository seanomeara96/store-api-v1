import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getProductBySku } from "../../functions/products/getProductBySKU";
//import { getProductById } from "../../functions/products/getProductById";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";

require("../../config/config").config("px");
//const no_discount_category_ID = 1493;
const data = [
  { sku: "110631", retail_price: 84.0, sale_price: 64.99 },
  { sku: "110625", retail_price: 84.0, sale_price: 64.99 },
  { sku: "110542", retail_price: 74.0, sale_price: 56.99 },
  { sku: "111006", retail_price: 89.0, sale_price: 67.99 },
  { sku: "101106", retail_price: 74.0, sale_price: 56.99 },
  { sku: "111598", retail_price: 84.0, sale_price: 64.99 },
  { sku: "110700", retail_price: 74.0, sale_price: 59.99 },
  { sku: "101602", retail_price: 54.0, sale_price: 44.99 },
  { sku: "110616", retail_price: 49.0, sale_price: 39.99 },
  { sku: "104403", retail_price: 75.0, sale_price: 57.99 },
  { sku: "106053", retail_price: 79.0, sale_price: 62.99 },
  { sku: "6244", retail_price: 60.0, sale_price: 49.99 },
  { sku: "110541", retail_price: 46.0, sale_price: 37.99 },
  { sku: "110641", retail_price: 66.0, sale_price: 52.99 },
  { sku: "103605", retail_price: 105.0, sale_price: 83.99 },
  { sku: "110910", retail_price: 22.0, sale_price: 19.99 },
  { sku: "102021", retail_price: 54.0, sale_price: 47.99 },
  { sku: "6798", retail_price: 28.0, sale_price: 22.99 },
  { sku: "11141", retail_price: 69.0, sale_price: 59.0 },
  { sku: "6797", retail_price: 28.0, sale_price: 22.99 },
  { sku: "110548", retail_price: 62.0, sale_price: 49.99 },
  { sku: "110630", retail_price: 52.0, sale_price: 41.99 },
  { sku: "110104", retail_price: 85.0, sale_price: 69.99 },
  { sku: "10280", retail_price: 34.0, sale_price: 30.99 },
  { sku: "10282", retail_price: 64.0, sale_price: 56.99 },
  { sku: "100851", retail_price: 28.0, sale_price: 22.99 },
  { sku: "101511", retail_price: 54.0, sale_price: 41.99 },
  { sku: "12210", retail_price: 109.0, sale_price: 91.99 },
  { sku: "7797", retail_price: 17.0, sale_price: 13.99 },
  { sku: "5887", retail_price: 16.0, sale_price: 12.99 },
  { sku: "110905", retail_price: 45.0, sale_price: 36.99 },
  { sku: "110551", retail_price: 74.0, sale_price: 61.99 },
  { sku: "110722", retail_price: 48.0, sale_price: 39.99 },
  { sku: "6341", retail_price: 99.0, sale_price: 84.99 },
  { sku: "6508", retail_price: 105.0, sale_price: 91.99 },
  { sku: "7799", retail_price: 16.0, sale_price: 13.99 },
  { sku: "9310", retail_price: 28.0, sale_price: 24.99 },
  { sku: "5354", retail_price: 74.0, sale_price: 64.99 },
  { sku: "102321", retail_price: 74.0, sale_price: 61.99 },
  { sku: "110624", retail_price: 52.0, sale_price: 43.99 },
  { sku: "7802", retail_price: 19.5, sale_price: 17.99 },
  { sku: "7603", retail_price: 34.0, sale_price: 29.99 },
  { sku: "7216", retail_price: 74.0, sale_price: 60.99 },
  { sku: "7796", retail_price: 166.0, sale_price: 132.99 },
  { sku: "7998", retail_price: 79.0, sale_price: 69.99 },
  { sku: "110633", retail_price: 67.0, sale_price: 52.99 },
  { sku: "7215", retail_price: 46.0, sale_price: 38.99 },
  { sku: "7725", retail_price: 173.0, sale_price: 147.99 },
  { sku: "7829", retail_price: 40.0, sale_price: 34.99 },
  { sku: "10378", retail_price: 75.0, sale_price: 64.99 },
  { sku: "7801", retail_price: 17.0, sale_price: 13.99 },
  { sku: "11310", retail_price: 54.0, sale_price: 48.99 },
  { sku: "7803", retail_price: 22.0, sale_price: 17.99 },
  { sku: "11234", retail_price: 27.0, sale_price: 23.99 },
  { sku: "5760", retail_price: 82.0, sale_price: 67.99 },
  { sku: "11990", retail_price: 32.0, sale_price: 28.99 },
  { sku: "7805", retail_price: 19.0, sale_price: 17.99 },
  { sku: "7830", retail_price: 42.0, sale_price: 34.99 },
  { sku: "9309", retail_price: 26.0, sale_price: 21.99 },
  { sku: "8755", retail_price: 74.0, sale_price: 61.99 },
  { sku: "8069", retail_price: 54.0, sale_price: 51.99 },
  { sku: "8281", retail_price: 45.0, sale_price: 40.99 },
  { sku: "11311", retail_price: 74.0, sale_price: 69.0 },
  { sku: "7453", retail_price: 75.0, sale_price: 66.99 },
  { sku: "7806", retail_price: 27.0, sale_price: 23.99 },
  { sku: "8282", retail_price: 99.0, sale_price: 80.99 },
  { sku: "10380", retail_price: 66.0, sale_price: 59.99 },
  { sku: "104513", retail_price: 62.0, sale_price: 51.99 },
  { sku: "11030", retail_price: 65.0, sale_price: 59.0 },
  { sku: "10121", retail_price: 164.0, sale_price: 136.99 },
  { sku: "6826", retail_price: 91.0, sale_price: 81.99 },
  { sku: "10379", retail_price: 42.0, sale_price: 39.99 },
  { sku: "7804", retail_price: 19.0, sale_price: 17.99 },
  { sku: "9193", retail_price: 101.0, sale_price: 86.99 },
  { sku: "110677", retail_price: 68.0, sale_price: 59.99 },
  { sku: "9454", retail_price: 109.0, sale_price: 101.99 },
  { sku: "9716", retail_price: 79.0, sale_price: 66.99 },
  { sku: "110709", retail_price: 67.0, sale_price: 54.99 },
  { sku: "105012", retail_price: 71.0, sale_price: 65.99 },
  { sku: "110105", retail_price: 44.0, sale_price: 37.99 },
  { sku: "100789", retail_price: 111.0, sale_price: 82.99 },
  { sku: "113511", retail_price: 35.0, sale_price: 28.99 },
  { sku: "5234", retail_price: 81.0, sale_price: 71.7 },
  { sku: "5891", retail_price: 57.0, sale_price: 53.99 },
  { sku: "7831", retail_price: 65.0, sale_price: 55.99 },
  { sku: "100923", retail_price: 57.0, sale_price: 48.99 },
  { sku: "12737", retail_price: 85.0, sale_price: 78.0 },
  { sku: "12745", retail_price: 54.0, sale_price: 44.99 },
  { sku: "12746", retail_price: 65.0, sale_price: 53.99 },
  { sku: "12747", retail_price: 65.0, sale_price: 59.0 },
  { sku: "12743", retail_price: 114.0, sale_price: 105.0 },
  { sku: "12740", retail_price: 105.0, sale_price: 92.99 },
  { sku: "12738", retail_price: 105.0, sale_price: 92.0 },
  { sku: "12739", retail_price: 105.0, sale_price: 94.0 },
  { sku: "13101", retail_price: 39.0, sale_price: 37.99 },
  { sku: "12748", retail_price: 65.0, sale_price: 59.0 },
  { sku: "12742", retail_price: 252.0, sale_price: 230.0 },
];

async function main() {
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    console.log(`${i+1} / ${data.length} Updating prices for sku ${row.sku}`)
    try {
      /**
       * price update fields
       */
      let updates = {
        price: row.retail_price,
        retail_price: row.retail_price,
        sale_price: row.sale_price,
      };

      /**
       * get product and it's variants
       */
      const product = await getProductBySku(row.sku);
      const variants = await getProductVariants(product.id);
      
      /**
       * check to see if the product has multiple variants
       */
      const onlyOneVariant = variants.length === 1;
      /**
       * check to see if sku is base variant
       */
      const isBaseVariant = variants[0].sku_id === null;
      if (onlyOneVariant && isBaseVariant) {
        /**
         * if there is only one variant and is a base variant then update the prices ar product level
         */
        await updateProduct(product.id, updates);
      } else {
        /**
         * else find variant with sku
         */
        const variant = variants.find((v) => v.sku === row.sku);
        if (variant) {
          /**
           * update the price for the specific variant with that sku
           */
          await updateProductVariant(product.id, variant.id, updates);
        } else {
          throw new Error(`Expected to find a variant for ${row.sku}`)
        }
      }
    } catch (err) {
      console.log(err);
      continue;
    }
    /**
     * wait 1.5s
     */
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  console.log("done");
}
main();
