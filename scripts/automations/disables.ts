import { deleteProductVariant } from "../../functions/product-variants/deleteVariant";
import { deleteProduct } from "../../functions/products/deleteProduct";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const skus = [
  "11504",
  "7598",
  "110545",
  "TWE_1217-CR",
  "TWE_1217-CR",
  "TWE_1217-CR",
  "6725",
  "100908",
  "6203",
  "1000300",
  "1000300",
  "5213",
  "5246",
  "5246",
  "5247",
  "7432",
  "7416",
  "7408",
  "7377",
  "41041",
  "41041",
  "5976",
  "5658",
  "5012",
  "5013",
  "5040",
  "5040",
  "5020",
  "5068",
  "6757",
  "6755",
  "6764",
  "6765",
  "6767",
  "6762",
  "6763",
  "7553",
  "100774",
  "45091",
  "4920",
  "4920",
  "100125",
  "100125",
  "5835",
  "5826",
  "5818",
  "5836",
  "5820",
  "5834",
  "5832",
  "5833",
  "5831",
  "5823",
  "5821",
  "5829",
  "5839",
  "5827",
  "9094",
  "9896",
  "MOR_MO0031",
  "MOR_P018805",
];

type Store = {
  id: string;
  disable_cat: number;
};

type Stores = Store[];

const stores: Stores = [
  { id: "bf", disable_cat: 561 },
  { id: "ih", disable_cat: 1473 },
  { id: "ah", disable_cat: 205 },
  { id: "bsk", disable_cat: 86 },
  { id: "pb", disable_cat: 167 },
  { id: "bs", disable_cat: 82 },
  { id: "hie", disable_cat: 29 },
  { id: "stie", disable_cat: 29 },
  { id: "px", disable_cat: 396 },
  { id: "ds", disable_cat: 35 },
];

async function disables() {
  try {
    for (const store of stores) {
      console.log("Sorting delisted products for", store.id);
      require("./config/config").config(store.id);
      let deleteCount = 0;
      let updateCount = 0;
      let deleteVariantCount = 0;
      for (const sku of skus) {
        const product = await getProductBySku(sku);

        // skip if product does not exist on store
        if (!product) {
          continue;
        }

        const variants = await getProductVariants(product.id);

        // check if product is a config
        if (variants.length > 1) {
          // delete variant
          for (const variant of variants) {
            if (variant.sku === "sku" && !variant.inventory_level) {
              await deleteProductVariant(product.id, variant.id);
              deleteVariantCount++;
            }
          }

          continue;
        }

        // if no inventory just delete it
        if (!product.inventory_level) {
          // delete product
          await deleteProduct(product.id);
          deleteCount++;
          continue;
        }

        // if has stock but not in disable cat, add it
        if (!product.categories.includes(store.disable_cat)) {
          product.categories.push(store.disable_cat);
          await updateProduct(product.id, {
            categories: product.categories,
          });
          updateCount++;
        }
      }
      console.log(`updated ${updateCount} for ${store.id}`);
      console.log(`deleted ${deleteCount} for ${store.id}`);
      console.log(`deleted ${deleteCount} variants for ${store.id}`);
    }
  } catch (err) {
    console.log(err);
  }
}

disables();
