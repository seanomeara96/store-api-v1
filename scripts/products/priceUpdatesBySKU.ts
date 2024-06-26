import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const store: string = "bf";
require("../../config/config").config(store);
//const no_discount_category_ID = 1493;
const data = [
  {
    sku: "12999",
    name: "True Beauty Aideen Kate True Essentials Face Palette",
    retail_price: 39.99,
    discount: 8.0,
    sale_price: 31.99,
  },
  {
    sku: "13000",
    name: "True Beauty Aideen Kate Lip Trio Set Self Love Royal Blush",
    retail_price: 34.99,
    discount: 7.0,
    sale_price: 27.99,
  },
  {
    sku: "13001",
    name: "True Beauty Aideen Kate Ambition Lip Liner",
    retail_price: 14.99,
    discount: 3.0,
    sale_price: 11.99,
  },
  {
    sku: "13002",
    name: "True Beauty Aideen Kate Do You Lip Liner",
    retail_price: 14.99,
    discount: 3.0,
    sale_price: 11.99,
  },
  {
    sku: "13003",
    name: "True Beauty Duo Kohl Pencil Black and Brown",
    retail_price: 19.99,
    discount: 4.0,
    sale_price: 15.99,
  },
  {
    sku: "13559",
    name: "True Beauty Aideen Kate Manifest Lipgloss",
    retail_price: 19.99,
    discount: 4.0,
    sale_price: 15.99,
  },
  {
    sku: "13558",
    name: "True Beauty Eye Essentials Volume 1",
    retail_price: 24.99,
    discount: 5.0,
    sale_price: 19.99,
  },
  {
    sku: "13562",
    name: "True Beauty Aideen Kate Energy Lip Liner",
    retail_price: 14.99,
    discount: 3.0,
    sale_price: 11.99,
  },
  {
    sku: "13191",
    name: "BYSK Eyeliner - Nude",
    retail_price: 15.0,
    discount: 3.0,
    sale_price: 12.0,
  },
  {
    sku: "13192",
    name: "BYSK Eyeliner - Brown",
    retail_price: 15.0,
    discount: 3.0,
    sale_price: 12.0,
  },
  {
    sku: "13193",
    name: "BYSK Lipstick - Going to the Chapel",
    retail_price: 18.5,
    discount: 3.7,
    sale_price: 14.8,
  },
  {
    sku: "13194",
    name: "BYSK Lipstick - Hallelujah Anyway",
    retail_price: 18.5,
    discount: 3.7,
    sale_price: 14.8,
  },
  {
    sku: "13195",
    name: "BYSK Lipstick - Love Story",
    retail_price: 18.5,
    discount: 3.7,
    sale_price: 14.8,
  },
  {
    sku: "13196",
    name: "BYSK Lipliner - Crave You",
    retail_price: 18.5,
    discount: 3.7,
    sale_price: 14.8,
  },
  {
    sku: "13197",
    name: "BYSK Lipliner - Need My Girl",
    retail_price: 18.5,
    discount: 3.7,
    sale_price: 14.8,
  },
  {
    sku: "13198",
    name: "BYSK Highlighter - Higher Love",
    retail_price: 28.0,
    discount: 5.6,
    sale_price: 22.4,
  },
  {
    sku: "13199",
    name: "BYSK Lip Oil - 01",
    retail_price: 16.0,
    discount: 3.2,
    sale_price: 12.8,
  },
  {
    sku: "13200",
    name: "BYSK Primer - 01",
    retail_price: 23.0,
    discount: 4.6,
    sale_price: 18.4,
  },
  {
    sku: "13201",
    name: "BYSK Liq Blush - Peaches",
    retail_price: 15.5,
    discount: 3.1,
    sale_price: 12.4,
  },
  {
    sku: "13202",
    name: "BYSK Liq Blush - Pink Moon",
    retail_price: 15.5,
    discount: 3.1,
    sale_price: 12.4,
  },
  {
    sku: "13355",
    name: "BYSK Lipstick Moulin Rouge",
    retail_price: 18.5,
    discount: 3.7,
    sale_price: 14.8,
  },
  {
    sku: "13367",
    name: "BYSK Lipliner I'm On Fire",
    retail_price: 14.5,
    discount: 2.9,
    sale_price: 11.6,
  },
  {
    sku: "13622",
    name: "BYSK Brow Pencil Soft Brown",
    retail_price: 17.0,
    discount: 3.4,
    sale_price: 13.6,
  },
  {
    sku: "13623",
    name: "BYSK Brow Pencil Medium Brown",
    retail_price: 17.0,
    discount: 3.4,
    sale_price: 13.6,
  },
  {
    sku: "13624",
    name: "BYSK Brow Pencil Dark Brown",
    retail_price: 17.0,
    discount: 3.4,
    sale_price: 13.6,
  },
  {
    sku: "13625",
    name: "BYSK Brow Pencil Blonde",
    retail_price: 17.0,
    discount: 3.4,
    sale_price: 13.6,
  },
  {
    sku: "13626",
    name: "BYSK Brow Pencil Auburn",
    retail_price: 17.0,
    discount: 3.4,
    sale_price: 13.6,
  },
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
            categories: product.categories.filter((i) => i !== catID),
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
