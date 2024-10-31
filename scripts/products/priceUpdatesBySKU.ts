import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const store: string = "ah";
require("../../config/config").config(store);
//const no_discount_category_ID = 1493;
const data = [
  { sku: "NHP_6662", sale_price: 26.8 },
  { sku: "6760", sale_price: 18.4 },
  { sku: "6766", sale_price: 37.6 },
  { sku: "14408", sale_price: 52 },
  { sku: "20438", sale_price: 28.5 },
  { sku: "20437", sale_price: 30.4 },
  { sku: "20475", sale_price: 37 },
  { sku: "20476", sale_price: 34 },
  { sku: "20477", sale_price: 34 },
  { sku: "20478", sale_price: 48.3 },
  { sku: "20479", sale_price: 40 },
  { sku: "20469", sale_price: 58.8 },
  { sku: "20480", sale_price: 111.2 },
  { sku: "20471", sale_price: 59.99 },
  { sku: "20472", sale_price: 69.3 },
  { sku: "20473", sale_price: 69.3 },
  { sku: "20493", sale_price: 40 },
  { sku: "20494", sale_price: 34.4 },
  { sku: "20512", sale_price: 230.4 },
  { sku: "KER_E057430", sale_price: 22.85 },
  { sku: "8775", sale_price: 25 },
  { sku: "20605", sale_price: 23.2 },
  { sku: "20604", sale_price: 23.2 },
  { sku: "20603", sale_price: 23.2 },
  { sku: "20602", sale_price: 23.2 },
  { sku: "20601", sale_price: 24 },
  { sku: "20600", sale_price: 23.2 },
  { sku: "20599", sale_price: 26.4 },
  { sku: "20598", sale_price: 26.4 },
  { sku: "20597", sale_price: 23.2 },
  { sku: "20596", sale_price: 31.2 },
  { sku: "20595", sale_price: 24 },
  { sku: "20594", sale_price: 23.2 },
  { sku: "20593", sale_price: 31.2 },
  { sku: "20592", sale_price: 31.2 },
  { sku: "20591", sale_price: 26.4 },
  { sku: "20590", sale_price: 26.4 },
  { sku: "20589", sale_price: 24 },
  { sku: "20588", sale_price: 23.2 },
  { sku: "20587", sale_price: 23.2 },
  { sku: "20586", sale_price: 23.2 },
  { sku: "20585", sale_price: 23.2 },
  { sku: "20584", sale_price: 24 },
  { sku: "20583", sale_price: 31.2 },
  { sku: "20582", sale_price: 23.2 },
  { sku: "20581", sale_price: 23.2 },
  { sku: "20580", sale_price: 31.2 },
  { sku: "20579", sale_price: 31.2 },
  { sku: "20578", sale_price: 31.2 },
  { sku: "20577", sale_price: 23.2 },
  { sku: "20576", sale_price: 24 },
  { sku: "20575", sale_price: 26.4 },
  { sku: "20574", sale_price: 26.4 },
  { sku: "20573", sale_price: 26.4 },
  { sku: "20572", sale_price: 24 },
  { sku: "20571", sale_price: 31.2 },
  { sku: "20570", sale_price: 31.2 },
  { sku: "20569", sale_price: 31.2 },
  { sku: "20568", sale_price: 26.4 },
  { sku: "20567", sale_price: 24 },
  { sku: "20566", sale_price: 24 },
  { sku: "20565", sale_price: 24 },
  { sku: "20564", sale_price: 31.2 },
  { sku: "20563", sale_price: 23.2 },
  { sku: "20562", sale_price: 23.2 },
  { sku: "20561", sale_price: 23.2 },
  { sku: "20560", sale_price: 23.2 },
  { sku: "20559", sale_price: 24 },
  { sku: "20558", sale_price: 31.2 },
  { sku: "20557", sale_price: 26.4 },
  { sku: "20556", sale_price: 26.4 },
  { sku: "20555", sale_price: 31.2 },
  { sku: "20554", sale_price: 23.2 },
  { sku: "20553", sale_price: 24 },
  { sku: "20552", sale_price: 24 },
  { sku: "20551", sale_price: 31.2 },
  { sku: "20550", sale_price: 31.2 },
  { sku: "20548", sale_price: 23.2 },
  { sku: "20547", sale_price: 23.2 },
  { sku: "20546", sale_price: 23.2 },
  { sku: "20545", sale_price: 23.2 },
  { sku: "20544", sale_price: 26.4 },
  { sku: "20543", sale_price: 31.2 },
  { sku: "20542", sale_price: 13.6 },
  { sku: "20541", sale_price: 24 },
  { sku: "20540", sale_price: 23.2 },
  { sku: "20539", sale_price: 23.2 },
  { sku: "20538", sale_price: 24 },
  { sku: "20537", sale_price: 23.2 },
  { sku: "20536", sale_price: 31.2 },
  { sku: "20535", sale_price: 31.2 },
  { sku: "20605A", sale_price: 23.2 },
  { sku: "20606", sale_price: 52.8 },
  { sku: "20607", sale_price: 60 },
  { sku: "20608", sale_price: 46.4 },
  { sku: "20609", sale_price: 48 },
  { sku: "20649", sale_price: 38.7 },
  { sku: "20646", sale_price: 35.7 },
  { sku: "20647", sale_price: 35.7 },
  { sku: "20648", sale_price: 35.7 },
];

enum ExcludeFromDiscountAction {
  Add = "ADD",
  Remove = "REMOVE",
  None = "NONE",
}

const addToNoDiscountCat: ExcludeFromDiscountAction =
  ExcludeFromDiscountAction.Add;

async function main() {
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    console.log(`${i + 1} / ${data.length} Updating prices for sku ${row.sku}`);
    try {
      /**
       *priceupdate fields
       */
      let updates = {
        sale_price: row.sale_price,
      };

      const vars = await getAllProductVariants({ sku: row.sku });
      const expect = 1;
      if (vars.length !== expect) {
        throw `Incorrect number of variants for sku ${row.sku}. Expected ${expect}, received ${vars.length}.`;
      }

      const variantToUpdate = vars[0];
      await updateProductVariant(
        variantToUpdate.product_id,
        variantToUpdate.id,
        updates
      );
      if (addToNoDiscountCat !== ExcludeFromDiscountAction.None) {
        const product = await getProductBySku(row.sku);

        if (product) {
          let catID: number | undefined;

          console.log(product?.id, product.name);

          if (store === "bf") {
            catID = 640;
          }

          if (store === "ih") {
            catID = 1493;
          }

          if (!catID) {
            throw "No catId for nodiscountcat of current store " + store;
          }

          let updatedCategories = [...product.categories];
          if (addToNoDiscountCat == ExcludeFromDiscountAction.Add) {
            updatedCategories = [...product.categories, catID];
          } else if (addToNoDiscountCat == ExcludeFromDiscountAction.Remove) {
            updatedCategories = updatedCategories.filter((id) => id !== catID);
          }

          await updateProduct(product.id, {
            categories: updatedCategories,
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
