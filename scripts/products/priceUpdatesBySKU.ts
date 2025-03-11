import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const stores: string[] = ["bf"];

//const no_discount_category_ID = 1493;
const data = [
  { sku: "21142", sale_price: 7.95, price: 9.95 },
  { sku: "21143", sale_price: 7.95, price: 9.95 },
  { sku: "21144", sale_price: 7.95, price: 9.95 },
  { sku: "21145", sale_price: 7.95, price: 9.95 },
  { sku: "21146", sale_price: 7.95, price: 9.95 },
  { sku: "21148", sale_price: 7.95, price: 9.95 },
  { sku: "21149", sale_price: 7.95, price: 9.95 },
  { sku: "21147", sale_price: 7.95, price: 9.95 },
  { sku: "21150", sale_price: 8.4, price: 10.5 },
  { sku: "21151", sale_price: 8.4, price: 10.5 },
  { sku: "21152", sale_price: 8.4, price: 10.5 },
  { sku: "21153", sale_price: 8.4, price: 10.5 },
  { sku: "21154", sale_price: 8.4, price: 10.5 },
  { sku: "21155", sale_price: 8.4, price: 10.5 },
  { sku: "21156", sale_price: 8.4, price: 10.5 },
  { sku: "21157", sale_price: 8.4, price: 10.5 },
  { sku: "21158", sale_price: 8.4, price: 10.5 },
  { sku: "21159", sale_price: 8.4, price: 10.5 },
  { sku: "21160", sale_price: 12.75, price: 15.95 },
  { sku: "21161", sale_price: 12.75, price: 15.95 },
  { sku: "21162", sale_price: 12.75, price: 15.95 },
  { sku: "21163", sale_price: 12.75, price: 15.95 },
  { sku: "21164", sale_price: 12.75, price: 15.95 },
  { sku: "21165", sale_price: 12.75, price: 15.95 },
  { sku: "21166", sale_price: 12.75, price: 15.95 },
  { sku: "21167", sale_price: 12.75, price: 15.95 },
  { sku: "21168", sale_price: 12.75, price: 15.95 },
  { sku: "21169", sale_price: 12.75, price: 15.95 },
  { sku: "21170", sale_price: 12.75, price: 15.95 },
  { sku: "21171", sale_price: 12.75, price: 15.95 },
  { sku: "21172", sale_price: 12.75, price: 15.95 },
  { sku: "21173", sale_price: 12.75, price: 15.95 },
  { sku: "21174", sale_price: 12.75, price: 15.95 },
  { sku: "21175", sale_price: 12.75, price: 15.95 },
  { sku: "21176", sale_price: 7.95, price: 9.95 },
  { sku: "21177", sale_price: 7.95, price: 9.95 },
  { sku: "21178", sale_price: 7.95, price: 9.95 },
  { sku: "21179", sale_price: 7.95, price: 9.95 },
  { sku: "21180", sale_price: 7.95, price: 9.95 },
  { sku: "21181", sale_price: 7.95, price: 9.95 },
  { sku: "21182", sale_price: 7.95, price: 9.95 },
  { sku: "21183", sale_price: 7.95, price: 9.95 },
  { sku: "21184", sale_price: 7.95, price: 9.95 },
  { sku: "21185", sale_price: 7.95, price: 9.95 },
  { sku: "21186", sale_price: 7.95, price: 9.95 },
  { sku: "21193", sale_price: 7.95, price: 9.95 },
  { sku: "21194", sale_price: 7.95, price: 9.95 },
  { sku: "21195", sale_price: 7.95, price: 9.95 },
  { sku: "21196", sale_price: 7.95, price: 9.95 },
  { sku: "21197", sale_price: 7.95, price: 9.95 },
  { sku: "21198", sale_price: 7.95, price: 9.95 },
  { sku: "21199", sale_price: 7.95, price: 9.95 },
  { sku: "21200", sale_price: 7.95, price: 9.95 },
  { sku: "21201", sale_price: 7.95, price: 9.95 },
  { sku: "21202", sale_price: 7.95, price: 9.95 },
  { sku: "21203", sale_price: 7.95, price: 9.95 },
  { sku: "21204", sale_price: 7.95, price: 9.95 },
  { sku: "21205", sale_price: 7.95, price: 9.95 },
  { sku: "21206", sale_price: 7.95, price: 9.95 },
  { sku: "21207", sale_price: 7.95, price: 9.95 },
  { sku: "21208", sale_price: 7.95, price: 9.95 },
  { sku: "21209", sale_price: 7.95, price: 9.95 },
  { sku: "21210", sale_price: 7.95, price: 9.95 },
  { sku: "21211", sale_price: 7.95, price: 9.95 },
  { sku: "21213", sale_price: 7.95, price: 9.95 },
  { sku: "21214", sale_price: 7.95, price: 9.95 },
  { sku: "21215", sale_price: 7.95, price: 9.95 },
  { sku: "21216", sale_price: 7.95, price: 9.95 },
  { sku: "21217", sale_price: 7.95, price: 9.95 },
  { sku: "21189", sale_price: 7.95, price: 9.95 },
  { sku: "21190", sale_price: 7.95, price: 9.95 },
  { sku: "21191", sale_price: 7.95, price: 9.95 },
  { sku: "21192", sale_price: 7.95, price: 9.95 },
  { sku: "21218", sale_price: 7.95, price: 9.95 },
  { sku: "21187", sale_price: 7.95, price: 9.95 },
  { sku: "21188", sale_price: 7.95, price: 9.95 },
  { sku: "21219", sale_price: 15.95, price: 19.95 },
  { sku: "21220", sale_price: 9.55, price: 11.95 },
  { sku: "21221", sale_price: 12.75, price: 15.95 },
  { sku: "21222", sale_price: 12.75, price: 15.95 },
  { sku: "21223", sale_price: 12.75, price: 15.95 },
  { sku: "21224", sale_price: 11.6, price: 14.5 },
  { sku: "21225", sale_price: 11.6, price: 14.5 },
  { sku: "21226", sale_price: 15.95, price: 19.95 },
  { sku: "21227", sale_price: 10.0, price: 12.5 },
  { sku: "21228", sale_price: 11.6, price: 14.5 },
  { sku: "21229", sale_price: 10.0, price: 12.5 },
  { sku: "21230", sale_price: 8.4, price: 10.5 },
  { sku: "21231", sale_price: 8.4, price: 10.5 },
  { sku: "21232", sale_price: 8.4, price: 10.5 },
  { sku: "21233", sale_price: 8.4, price: 10.5 },
  { sku: "21234", sale_price: 8.4, price: 10.5 },
  { sku: "21235", sale_price: 8.4, price: 10.5 },
  { sku: "21236", sale_price: 6.35, price: 7.95 },
  { sku: "21237", sale_price: 6.35, price: 7.95 },
  { sku: "21238", sale_price: 6.35, price: 7.95 },
  { sku: "21239", sale_price: 6.35, price: 7.95 },
  { sku: "21240", sale_price: 15.95, price: 19.95 },
  { sku: "21241", sale_price: 6.35, price: 7.95 },
  { sku: "21242", sale_price: 6.35, price: 7.95 },
  { sku: "21243", sale_price: 6.35, price: 7.95 },
  { sku: "21244", sale_price: 6.35, price: 7.95 },
  { sku: "21245", sale_price: 6.35, price: 7.95 },
  { sku: "21246", sale_price: 6.35, price: 7.95 },
  { sku: "21247", sale_price: 6.35, price: 7.95 },
  { sku: "21248", sale_price: 6.35, price: 7.95 },
  { sku: "21258", sale_price: 6.35, price: 7.95 },
  { sku: "21259", sale_price: 6.35, price: 7.95 },
  { sku: "21260", sale_price: 6.35, price: 7.95 },
  { sku: "21261", sale_price: 6.35, price: 7.95 },
  { sku: "21262", sale_price: 6.35, price: 7.95 },
  { sku: "21263", sale_price: 6.35, price: 7.95 },
  { sku: "21264", sale_price: 6.35, price: 7.95 },
  { sku: "21265", sale_price: 6.35, price: 7.95 },
  { sku: "21266", sale_price: 8.75, price: 10.95 },
  { sku: "21267", sale_price: 8.75, price: 10.95 },
  { sku: "21268", sale_price: 8.75, price: 10.95 },
  { sku: "21269", sale_price: 7.15, price: 8.95 },
  { sku: "21270", sale_price: 7.15, price: 8.95 },
  { sku: "21271", sale_price: 7.15, price: 8.95 },
  { sku: "21272", sale_price: 7.15, price: 8.95 },
  { sku: "21274", sale_price: 12.75, price: 15.95 },
  { sku: "21275", sale_price: 12.75, price: 15.95 },
  { sku: "21276", sale_price: 12.75, price: 15.95 },
  { sku: "21277", sale_price: 12.75, price: 15.95 },
  { sku: "21278", sale_price: 12.75, price: 15.95 },
  { sku: "21279", sale_price: 12.75, price: 15.95 },
  { sku: "21280", sale_price: 8.75, price: 10.95 },
  { sku: "21281", sale_price: 8.75, price: 10.95 },
  { sku: "21282", sale_price: 8.75, price: 10.95 },
  { sku: "21283", sale_price: 8.75, price: 10.95 },
  { sku: "21284", sale_price: 8.75, price: 10.95 },
  { sku: "21285", sale_price: 8.75, price: 10.95 },
  { sku: "21286", sale_price: 8.75, price: 10.95 },
  { sku: "21287", sale_price: 8.75, price: 10.95 },
  { sku: "21288", sale_price: 8.75, price: 10.95 },
  { sku: "21289", sale_price: 8.75, price: 10.95 },
  { sku: "21290", sale_price: 7.95, price: 9.95 },
  { sku: "21291", sale_price: 7.95, price: 9.95 },
  { sku: "21292", sale_price: 7.95, price: 9.95 },
  { sku: "21293", sale_price: 7.95, price: 9.95 },
  { sku: "21294", sale_price: 7.95, price: 9.95 },
  { sku: "21295", sale_price: 7.95, price: 9.95 },
  { sku: "21296", sale_price: 7.95, price: 9.95 },
  { sku: "21297", sale_price: 7.95, price: 9.95 },
  { sku: "21298", sale_price: 7.95, price: 9.95 },
  { sku: "21299", sale_price: 7.95, price: 9.95 },
  { sku: "21300", sale_price: 8.75, price: 10.95 },
  { sku: "21301", sale_price: 8.75, price: 10.95 },
  { sku: "21302", sale_price: 8.75, price: 10.95 },
  { sku: "21303", sale_price: 8.75, price: 10.95 },
  { sku: "21304", sale_price: 8.75, price: 10.95 },
  { sku: "21305", sale_price: 8.75, price: 10.95 },
  { sku: "21306", sale_price: 10.0, price: 12.5 },
  { sku: "21307", sale_price: 10.0, price: 12.5 },
  { sku: "21308", sale_price: 10.0, price: 12.5 },
  { sku: "21309", sale_price: 10.0, price: 12.5 },
  { sku: "21310", sale_price: 10.0, price: 12.5 },
  { sku: "21311", sale_price: 10.0, price: 12.5 },
  { sku: "21313", sale_price: 10.0, price: 12.5 },
  { sku: "21314", sale_price: 10.0, price: 12.5 },
  { sku: "21315", sale_price: 10.0, price: 12.5 },
  { sku: "21316", sale_price: 10.0, price: 12.5 },
  { sku: "21317", sale_price: 10.0, price: 12.5 },
  { sku: "21318", sale_price: 11.6, price: 14.5 },
  { sku: "21319", sale_price: 11.6, price: 14.5 },
  { sku: "21320", sale_price: 11.6, price: 14.5 },
  { sku: "21321", sale_price: 11.6, price: 14.5 },
  { sku: "21322", sale_price: 11.6, price: 14.5 },
  { sku: "21323", sale_price: 11.6, price: 14.5 },
  { sku: "21324", sale_price: 11.6, price: 14.5 },
  { sku: "21325", sale_price: 11.6, price: 14.5 },
  { sku: "21249", sale_price: 6.35, price: 7.95 },
  { sku: "21250", sale_price: 6.35, price: 7.95 },
  { sku: "21251", sale_price: 6.35, price: 7.95 },
  { sku: "21252", sale_price: 6.35, price: 7.95 },
  { sku: "21253", sale_price: 6.35, price: 7.95 },
  { sku: "21254", sale_price: 6.35, price: 7.95 },
  { sku: "21255", sale_price: 6.35, price: 7.95 },
];

enum ExcludeFromDiscountAction {
  Add = "ADD",
  Remove = "REMOVE",
  None = "NONE",
}

const addToNoDiscountCat: ExcludeFromDiscountAction =
  ExcludeFromDiscountAction.Add;

let retries = 0;
async function main() {
  for (let j = 0; j < stores.length; j++) {
    const store = stores[j];
    require("../../config/config").config(store);
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      console.log(
        `${store} ${i + 1} / ${data.length} Updating prices for sku ${row.sku}`
      );
      try {
        /**
         *priceupdate fields
         */
        let updates = {
          price: row.price,
          retail_price: row.price,
          sale_price: row.sale_price,
        };

        const vars = await getAllProductVariants({ sku: row.sku });
        const expect = 1;
        if (vars.length !== expect) {
          console.log(
            `Incorrect number of variants for sku ${row.sku}. Expected ${expect}, received ${vars.length}.`
          );
          continue;
        }

        const variantToUpdate = vars[0];
        await updateProductVariant(
          variantToUpdate.product_id,
          variantToUpdate.id,
          updates
        );
        if (
          addToNoDiscountCat == ExcludeFromDiscountAction.Add ||
          addToNoDiscountCat == ExcludeFromDiscountAction.Remove
        ) {
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

            if (store === "bsk") {
              catID = 108;
            }

            if (store === "ah") {
              catID = 233;
            }

            if (store === "pb") {
              catID = 187;
            }

            if (store === "hie") {
              catID = 41;
            }

            if (store === "px") {
              catID = 484;
            }

            if (!catID) {
              throw "No catId for nodiscountcat of current store";
            }

            let updatedCategories = [...product.categories];
            if (addToNoDiscountCat == ExcludeFromDiscountAction.Add) {
              updatedCategories = [...product.categories, catID];
            } else if (addToNoDiscountCat == ExcludeFromDiscountAction.Remove) {
              updatedCategories = updatedCategories.filter(
                (id) => id !== catID
              );
            }

            await updateProduct(product.id, {
              categories: updatedCategories,
            });
          }
        }
      } catch (err) {
        console.log(err);

        if (JSON.stringify(err).includes("nodiscountcat")) {
          console.log("fatal err");
          return;
        }

        if (retries < 3) {
          i--;
          retries++;
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        continue;
      }
      /**
       * wait 1.5s
       */
      await new Promise((resolve) => setTimeout(resolve, 500));
      retries = 0;
    }
  }
  console.log("done");
}
main();
