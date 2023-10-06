import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
//import { getProductById } from "../../functions/products/getProductById";
import { getProductIdFromSku } from "../../functions/products/getProductIdFromSku";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";

require("../../config/config").config("ah");
const data = [
  { sku: "MOR_MO0002", cost: 22.5, rrp: 44.45, sales: 41.45 },
  { sku: "MOR_MO0004", cost: 16.46, rrp: 32.85, sales: 32.85 },
  { sku: "MOR_MO0006", cost: 16.8, rrp: 32.85, sales: 32.85 },
  { sku: "MOR_MO0008", cost: 16.96, rrp: 33.85, sales: 33.85 },
  { sku: "MOR_MO0011", cost: 22.26, rrp: 43.45, sales: 43.45 },
  { sku: "MOR_MO0020", cost: 11.22, rrp: 22.45, sales: 22.45 },
  { sku: "MOR_MO0029", cost: 9.16, rrp: 17.85, sales: 17.85 },
  { sku: "MOR_MO0040", cost: 9.16, rrp: 17.85, sales: 17.85 },
  { sku: "MOR_MO0043", cost: 12.53, rrp: 24.85, sales: 24.85 },
  { sku: "MOR_MO0032", cost: 10.9, rrp: 21.45, sales: 21.45 },
  { sku: "MOR_MO0037", cost: 10.65, rrp: 19.85, sales: 18.99 },
  { sku: "MOR_MO0035", cost: 10.65, rrp: 19.85, sales: 19.85 },
  { sku: "MOR_MO0036", cost: 12.8, rrp: 23.85, sales: 23.85 },
  { sku: "MOR_MO0053", cost: 17.39, rrp: 33.85, sales: 33.85 },
  { sku: "MOR_MO0054", cost: 10.1, rrp: 20.45, sales: 20.45 },
  { sku: "MOR_MO0075", cost: 15.93479675, rrp: 32.45, sales: 32.45 },
  { sku: "MOR_MO0094", cost: 11.22, rrp: 22.45, sales: 22.45 },
  { sku: "MOR_MO0096", cost: 11.22, rrp: 22.45, sales: 22.45 },
  { sku: "MOR_MOULDINGCREAM", cost: 12.41, rrp: 25.45, sales: 25.45 },
  { sku: "MOR_MO0111", cost: 12.5, rrp: 25.45, sales: 25.45 },
  { sku: "WOW_CW0002", cost: 17.85, rrp: 32.95, sales: 32.95 },
  { sku: "WOW_CW0003", cost: 17.85, rrp: 32.95, sales: 32.95 },
  { sku: "WOW_CW0004", cost: 17.85, rrp: 32.95, sales: 31.99 },
  { sku: "WOW_CW0005", cost: 17.85, rrp: 32.95, sales: 31.99 },
  { sku: "MOR_P018823", cost: 11.52, rrp: 23.45, sales: 23.45 },
  { sku: "MOR_MO0018", cost: 11.22, rrp: 22.45, sales: 22.45 },
  { sku: "100703", cost: 17.85, rrp: 32.95, sales: 32.95 },
  { sku: "100704", cost: 12.8, rrp: 23.85, sales: 23.85 },
  { sku: "4976", cost: 13.55, rrp: 25, sales: 25 },
  { sku: "5022", cost: 10.95, rrp: 21.45, sales: 21.45 },
  { sku: "5023", cost: 10.95, rrp: 21.45, sales: 21.45 },
  { sku: "5032", cost: 15.15, rrp: 28, sales: 28 },
  { sku: "5378", cost: 10.59, rrp: 21.35, sales: 21.35 },
  { sku: "5380", cost: 11.62, rrp: 23.25, sales: 23.25 },
  { sku: "5873", cost: 6.2, rrp: 11.95, sales: 11.95 },
  { sku: "5874", cost: 4.07, rrp: 7.7, sales: 7.7 },
  { sku: "5875", cost: 4.07, rrp: 7.7, sales: 7.7 },
  { sku: "5876", cost: 6.2, rrp: 11.95, sales: 11.95 },
  { sku: "5880", cost: 7.54, rrp: 14.25, sales: 14.25 },
  { sku: "5881", cost: 6.15, rrp: 11.25, sales: 11.25 },
  { sku: "5878", cost: 6.11, rrp: 11.95, sales: 11.95 },
  { sku: "5879", cost: 7.15, rrp: 13.85, sales: 13.85 },
  { sku: "5885", cost: 11, rrp: 22.25, sales: 22.25 },
  { sku: "6242", cost: 12.49, rrp: 25.45, sales: 25.45 },
  { sku: "6346", cost: 16.87, rrp: 33.85, sales: 33.85 },
  { sku: "6347", cost: 17.35, rrp: 33.45, sales: 33.45 },
  { sku: "7489", cost: 13.55, rrp: 25, sales: 22.99 },
  { sku: "7656", cost: 14.65, rrp: 27, sales: 24.99 },
  { sku: "7494", cost: 16.25, rrp: 30, sales: 30 },
  { sku: "7495", cost: 16.25, rrp: 30, sales: 26.99 },
  { sku: "7586", cost: 10.9, rrp: 21.45, sales: 21.45 },
  { sku: "7654", cost: 13.55, rrp: 25, sales: 24.99 },
  { sku: "7655", cost: 13.55, rrp: 25, sales: 22.99 },
  { sku: "7657", cost: 15.75, rrp: 29, sales: 26 },
  { sku: "7833", cost: 7.15, rrp: 12.5, sales: 12.5 },
  { sku: "7834", cost: 7.15, rrp: 12.5, sales: 12.5 },
  { sku: "7836", cost: 43.05, rrp: 79.5, sales: 68.5 },
  { sku: "7837", cost: 43.05, rrp: 79.5, sales: 68.5 },
  { sku: "7838", cost: 43.05, rrp: 79.5, sales: 72.5 },
  { sku: "7839", cost: 17.85, rrp: 32.95, sales: 32.95 },
  { sku: "7840", cost: 34.65, rrp: 64, sales: 60 },
  { sku: "7841", cost: 36.35, rrp: 61, sales: 61 },
  { sku: "7988", cost: 15.75, rrp: 29, sales: 27.99 },
  { sku: "8207", cost: 12.27, rrp: 24.85, sales: 24.85 },
  { sku: "8888", cost: 15.7, rrp: 30.45, sales: 30.45 },
  { sku: "9083", cost: 4.04, rrp: 7.95, sales: 7.95 },
  { sku: "9227", cost: 16.1, rrp: 30.85, sales: 30.85 },
  { sku: "9228", cost: 15.7, rrp: 30.45, sales: 30.45 },
  { sku: "9473", cost: 63.41463415, rrp: 120, sales: 105.99 },
  { sku: "9472", cost: 55.48780488, rrp: 105, sales: 93.99 },
  { sku: "9471", cost: 42.72560976, rrp: 81, sales: 75.99 },
  { sku: "9459", cost: 21.13821138, rrp: 40, sales: 36.99 },
  { sku: "9457", cost: 21.13821138, rrp: 40, sales: 35.99 },
  { sku: "9455", cost: 26.42276423, rrp: 50, sales: 45.99 },
  { sku: "9463", cost: 20.08130081, rrp: 38, sales: 38 },
  { sku: "9890", cost: 11.95, rrp: 22, sales: 22 },
  { sku: "10032", cost: 26.42276423, rrp: 50, sales: 45.99 },
  { sku: "10033", cost: 26.42276423, rrp: 50, sales: 45.99 },
  { sku: "10034", cost: 34.3495935, rrp: 65, sales: 58.99 },
  { sku: "10035", cost: 34.3495935, rrp: 65, sales: 58.99 },
  { sku: "10036", cost: 26.42276423, rrp: 50, sales: 45.99 },
  { sku: "10038", cost: 23.7804878, rrp: 45, sales: 44.99 },
  { sku: "10040", cost: 95.12195122, rrp: 180, sales: 160 },
  { sku: "10041", cost: 52.84552846, rrp: 100, sales: 100 },
  { sku: "10053", cost: 27.4796748, rrp: 52, sales: 46.99 },
  { sku: "10147", cost: 8.25, rrp: 14.5, sales: 14.5 },
  { sku: "7586a", cost: 10.9, rrp: 21.45, sales: 21.45 },
  { sku: "5884", cost: 4.89, rrp: 9.25, sales: 9.25 },
  { sku: "10644", cost: 12.53, rrp: 24.85, sales: 24.85 },
  { sku: "10645", cost: 12.53, rrp: 24.85, sales: 24.85 },
  { sku: "10491", cost: 14.65, rrp: 27, sales: 25.99 },
  { sku: "11045", cost: 8, rrp: 14, sales: 14 },
  { sku: "11046", cost: 8, rrp: 14, sales: 14 },
  { sku: "11053", cost: 12.27, rrp: 24.85, sales: 24.85 },
  { sku: "11054", cost: 14.19, rrp: 26.85, sales: 26.85 },
  { sku: "11243", cost: 57.07317073, rrp: 108, sales: 98 },
  { sku: "11244", cost: 55.48780488, rrp: 105, sales: 93.99 },
  { sku: "11240", cost: 26.42276423, rrp: 50, sales: 45.99 },
  { sku: "11261", cost: 36.99186992, rrp: 70, sales: 63.99 },
  { sku: "11249", cost: 63.94308943, rrp: 121, sales: 108.99 },
  { sku: "11242", cost: 50.20325203, rrp: 95, sales: 83.99 },
  { sku: "11248", cost: 50.20325203, rrp: 95, sales: 83.99 },
  { sku: "11246", cost: 68.69918699, rrp: 130, sales: 116.99 },
  { sku: "11247", cost: 73.98373984, rrp: 140, sales: 122.99 },
  { sku: "11245", cost: 52.84552846, rrp: 100, sales: 90.99 },
  { sku: "11393", cost: 24.45, rrp: 45, sales: 42 },
  { sku: "11392", cost: 67.64227642, rrp: 128, sales: 114 },
  { sku: "11391", cost: 76.62601626, rrp: 145, sales: 126.99 },
  { sku: "11434", cost: 58.1300813, rrp: 110, sales: 100.99 },
  { sku: "11435", cost: 60.77235772, rrp: 115, sales: 102.99 },
  { sku: "11436", cost: 68.69918699, rrp: 130, sales: 116.99 },
  { sku: "11437", cost: 68.69918699, rrp: 130, sales: 116.99 },
  { sku: "11438", cost: 67.64227642, rrp: 128, sales: 122 },
  { sku: "11604", cost: 11.05, rrp: 21.85, sales: 21.85 },
  { sku: "12175", cost: 158.5365854, rrp: 300, sales: 300 },
  { sku: "12176", cost: 132.1138211, rrp: 250, sales: 250 },
  { sku: "12195", cost: 20.08130081, rrp: 38, sales: 36.99 },
  { sku: "10054", cost: 27.02616822, rrp: 51.14018692, sales: 47.99 },
  { sku: "10055", cost: 27.02616822, rrp: 51.14018692, sales: 47.99 },
  { sku: "10056", cost: 27.02616822, rrp: 51.14018692, sales: 47.99 },
  { sku: "10057", cost: 27.02616822, rrp: 51.14018692, sales: 47.99 },
  { sku: "10058", cost: 27.02616822, rrp: 51.14018692, sales: 47.99 },
  { sku: "10059", cost: 27.02616822, rrp: 51.14018692, sales: 47.99 },
  { sku: "12402", cost: 41.22, rrp: 78, sales: 72.99 },
  { sku: "12403", cost: 45.44715447, rrp: 86, sales: 76 },
  { sku: "12404", cost: 45.44666667, rrp: 86, sales: 76 },
  { sku: "12411", cost: 15.45, rrp: 29, sales: 29 },
  { sku: "12412", cost: 15.45, rrp: 29, sales: 29 },
  { sku: "12414", cost: 15.15, rrp: 28, sales: 28 },
  { sku: "12415", cost: 20.6, rrp: 38, sales: 38 },
  { sku: "12995", cost: 28.1402439, rrp: 71, sales: 71 },
  { sku: "13140", cost: 20.05, rrp: 37, sales: 25.5 },
  { sku: "13307", cost: 76.62601626, rrp: 145, sales: 132.99 },
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
          cost_price: row.cost,
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
            cost_price: row.cost,
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
