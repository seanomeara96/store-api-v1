import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const store: string = "bf";
require("../../config/config").config(store);
//const no_discount_category_ID = 1493;
const data = [
  { sku: "9631", sale_price: 224.4 },
  { sku: "11352", sale_price: 28.5 },
  { sku: "11351", sale_price: 25.3 },
  { sku: "11425", sale_price: 25.55 },
  { sku: "11426", sale_price: 19.35 },
  { sku: "11427", sale_price: 19.35 },
  { sku: "11428", sale_price: 27.2 },
  { sku: "11429", sale_price: 27.2 },
  { sku: "11430", sale_price: 25.55 },
  { sku: "11431", sale_price: 25.55 },
  { sku: "11432", sale_price: 25.55 },
  { sku: "11433", sale_price: 25.55 },
  { sku: "11452", sale_price: 15.4 },
  { sku: "11453", sale_price: 18.65 },
  { sku: "11454", sale_price: 25.3 },
  { sku: "11455", sale_price: 21.25 },
  { sku: "11456", sale_price: 15.4 },
  { sku: "11457", sale_price: 18.65 },
  { sku: "11458", sale_price: 15.4 },
  { sku: "11459", sale_price: 18.65 },
  { sku: "11460", sale_price: 24.05 },
  { sku: "11461", sale_price: 24.05 },
  { sku: "11462", sale_price: 27.2 },
  { sku: "11463", sale_price: 19.35 },
  { sku: "11464", sale_price: 19.35 },
  { sku: "11465", sale_price: 15.4 },
  { sku: "11466", sale_price: 21.25 },
  { sku: "11467", sale_price: 14.9 },
  { sku: "11468", sale_price: 15.4 },
  { sku: "11469", sale_price: 18.65 },
  { sku: "11470", sale_price: 25.3 },
  { sku: "11471", sale_price: 15.4 },
  { sku: "11472", sale_price: 18.65 },
  { sku: "11473", sale_price: 25.3 },
  { sku: "11474", sale_price: 21.25 },
  { sku: "11475", sale_price: 6.1 },
  { sku: "11476", sale_price: 14.9 },
  { sku: "11477", sale_price: 14.9 },
  { sku: "11478", sale_price: 14.9 },
  { sku: "11479", sale_price: 18.65 },
  { sku: "11480", sale_price: 20.8 },
  { sku: "11481", sale_price: 25.3 },
  { sku: "11482", sale_price: 16.55 },
  { sku: "11483", sale_price: 15.4 },
  { sku: "11484", sale_price: 25.3 },
  { sku: "11485", sale_price: 14.9 },
  { sku: "11486", sale_price: 18 },
  { sku: "11487", sale_price: 43.25 },
  { sku: "11708", sale_price: 18.25 },
  { sku: "11745", sale_price: 29.75 },
  { sku: "11746", sale_price: 20.4 },
  { sku: "11749", sale_price: 250.75 },
  { sku: "11750", sale_price: 269 },
  { sku: "11785", sale_price: 8.5 },
  { sku: "11786", sale_price: 6.8 },
  { sku: "11787", sale_price: 5.1 },
  { sku: "11788", sale_price: 5.1 },
  { sku: "11789", sale_price: 5.1 },
  { sku: "11790", sale_price: 8.5 },
  { sku: "11791", sale_price: 6.8 },
  { sku: "11792", sale_price: 6.8 },
  { sku: "11793", sale_price: 7.65 },
  { sku: "11794", sale_price: 6.8 },
  { sku: "11795", sale_price: 29.6 },
  { sku: "11797", sale_price: 32.6 },
  { sku: "11798", sale_price: 32.6 },
  { sku: "11848", sale_price: 22.95 },
  { sku: "11868", sale_price: 34.05 },
  { sku: "11873", sale_price: 29.45 },
  { sku: "11988", sale_price: 27.45 },
  { sku: "12023", sale_price: 41.65 },
  { sku: "12025", sale_price: 29.99 },
  { sku: "12026", sale_price: 29.99 },
  { sku: "12033", sale_price: 221 },
  { sku: "12101", sale_price: 20.4 },
  { sku: "12109", sale_price: 319.6 },
  { sku: "11485A", sale_price: 17.99 },
  { sku: "12211", sale_price: 15.05 },
  { sku: "12212", sale_price: 18.25 },
  { sku: "12213", sale_price: 15.05 },
  { sku: "12214", sale_price: 15.05 },
  { sku: "12215", sale_price: 18.25 },
  { sku: "12216", sale_price: 15.05 },
  { sku: "12217", sale_price: 18.25 },
  { sku: "12218", sale_price: 18.25 },
  { sku: "12219", sale_price: 18.25 },
  { sku: "12220", sale_price: 18.25 },
  { sku: "12221", sale_price: 16.6 },
  { sku: "12222", sale_price: 18.25 },
  { sku: "12223", sale_price: 15.05 },
  { sku: "12224", sale_price: 18.25 },
  { sku: "12225", sale_price: 18.25 },
  { sku: "12226", sale_price: 16.6 },
  { sku: "12227", sale_price: 18.25 },
  { sku: "12540", sale_price: 56 },
  { sku: "12542", sale_price: 57.5 },
  { sku: "12543", sale_price: 57.5 },
  { sku: "12544", sale_price: 57.5 },
  { sku: "12545", sale_price: 57.5 },
  { sku: "12546", sale_price: 64.95 },
  { sku: "12547", sale_price: 64.95 },
  { sku: "12548", sale_price: 64.95 },
  { sku: "12549", sale_price: 57.5 },
  { sku: "12550", sale_price: 57.5 },
  { sku: "12551", sale_price: 57.5 },
  { sku: "12552", sale_price: 57.5 },
  { sku: "12553", sale_price: 39.1 },
  { sku: "12554", sale_price: 39.1 },
  { sku: "12555", sale_price: 39.1 },
  { sku: "12556", sale_price: 39.1 },
  { sku: "12557", sale_price: 39.1 },
  { sku: "12558", sale_price: 32.1 },
  { sku: "12559", sale_price: 39.1 },
  { sku: "12560", sale_price: 39.1 },
  { sku: "12561", sale_price: 32.1 },
  { sku: "12562", sale_price: 39.1 },
  { sku: "12563", sale_price: 32.1 },
  { sku: "12679", sale_price: 43.2 },
  { sku: "12680", sale_price: 19.8 },
  { sku: "12681", sale_price: 19.85 },
  { sku: "12682", sale_price: 19.8 },
  { sku: "12683", sale_price: 26.9 },
  { sku: "12684", sale_price: 19.8 },
  { sku: "12685", sale_price: 19.8 },
  { sku: "12686", sale_price: 41.9 },
  { sku: "12771", sale_price: 30.85 },
  { sku: "12924", sale_price: 37.85 },
  { sku: "12541", sale_price: 56 },
  { sku: "13142", sale_price: 6.8 },
  { sku: "13143", sale_price: 6.8 },
  { sku: "13144", sale_price: 6.8 },
  { sku: "13213", sale_price: 32.9 },
  { sku: "13214", sale_price: 30.15 },
  { sku: "13216", sale_price: 34.8 },
  { sku: "13217", sale_price: 99.49 },
  { sku: "13218", sale_price: 54.3 },
  { sku: "13219", sale_price: 32 },
  { sku: "13220", sale_price: 113.9 },
  { sku: "13221", sale_price: 61 },
  { sku: "13222", sale_price: 85 },
  { sku: "13223", sale_price: 53.5 },
  { sku: "13224", sale_price: 34.4 },
  { sku: "13225", sale_price: 39.8 },
  { sku: "13226", sale_price: 91.95 },
  { sku: "13227", sale_price: 86.95 },
  { sku: "13228", sale_price: 38.8 },
  { sku: "13229", sale_price: 44.65 },
  { sku: "13230", sale_price: 38.8 },
  { sku: "13231", sale_price: 53.5 },
  { sku: "13232", sale_price: 36.2 },
  { sku: "13233", sale_price: 99.49 },
  { sku: "13234", sale_price: 60.2 },
  { sku: "13269", sale_price: 33 },
  { sku: "13270", sale_price: 47 },
  { sku: "13271", sale_price: 56 },
  { sku: "13272", sale_price: 47 },
  { sku: "13273", sale_price: 44.2 },
  { sku: "13284", sale_price: 36.7 },
  { sku: "13330", sale_price: 20.4 },
  { sku: "13373", sale_price: 39.8 },
  { sku: "9631B", sale_price: 282.2 },
  { sku: "14195", sale_price: 80 },
  { sku: "14196", sale_price: 55 },
  { sku: "14197", sale_price: 60 },
  { sku: "14198", sale_price: 39.95 },
  { sku: "14199", sale_price: 54 },
  { sku: "14313", sale_price: 8.5 },
  { sku: "14314", sale_price: 8.5 },
  { sku: "14315", sale_price: 8.5 },
  { sku: "14412", sale_price: 36.7 },
  { sku: "14413", sale_price: 28 },
  { sku: "12222A", sale_price: 20 },
];

const addToNoDiscountCat = true;

async function main() {
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    console.log(`${i + 1} / ${data.length} Updating prices for sku ${row.sku}`);
    try {
      /**
       * price update fields
       */
      let updates = {
        sale_price: row.sale_price,
      };

      const vars = await getAllProductVariants({ sku: row.sku });
      const expect = 1;
      if (vars.length !== expect) {
        throw `Incorrect number of variants for sku ${row.sku}. Expected ${expect}, received ${vars.length}.`;
      }

      const toUpdate = vars[0];
      await updateProductVariant(toUpdate.product_id, toUpdate.id, updates);
      if (addToNoDiscountCat) {
        const product = await getProductBySku(row.sku);
        if (product) {
          let catID: number | undefined;
          if (store === "bf") {
            catID = 640;
          }
          if (!catID) {
            throw new Error(
              "No catId for nodiscountcat of current store " + store
            );
          }

          await updateProduct(product.id, {
            categories: product.categories.filter((id) => id !== catID),
          });
        }
      }
    } catch (err) {
      console.log(err);
      continue;
    }
    /**
     * wait 1.5s
     */
    //await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  console.log("done");
}
main();
