import { deleteProductVariant } from "../../functions/product-variants/deleteVariant";
import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { deleteProduct } from "../../functions/products/deleteProduct";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";
import { getProductVariants } from "../../functions/products/getProductVariants";

type Store = {
  id: string;
  disable_cat: number;
  clearance_cat?: number;
};

type Stores = Store[];

const deleteOOS = false;
const stores: Stores = [
  //{ id: "bf", disable_cat: 561, clearance_cat: 515 },
  //{ id: "ih", disable_cat: 1473, clearance_cat: 1485 },
  // { id: "ah", disable_cat: 205 },
  // { id: "bsk", disable_cat: 86 },
  // { id: "pb", disable_cat: 167 },
  // { id: "bs", disable_cat: 82 },
  // { id: "hie", disable_cat: 29 },
  // { id: "stie", disable_cat: 29 },
  // { id: "px", disable_cat: 396 },
  // { id: "ds", disable_cat: 35 },

  { id: "ch", disable_cat: 486 },
  { id: "ha", disable_cat: 265 },
];

const rows: {
  sku: string;
  cost_price?: number;
  sale_price?: number;
  inventory?: number;
}[] = [
  { sku: "D012" },
  { sku: "D001" },
  { sku: "D005" },
  { sku: "1000761" },
  { sku: "1000763" },
  { sku: "CG004" },
  { sku: "CG007" },
  { sku: "D030" },
  { sku: "D027" },
  { sku: "D026" },
  { sku: "D029" },
  { sku: "D031" },
  { sku: "D034" },
  { sku: "D032" },
  { sku: "D028" },
  { sku: "D033" },
  { sku: "3050" },
];

async function disables() {
  try {
    for (const store of stores) {
      console.log("Sorting delisted products for", store.id);
      require("../../config/config").config(store.id);
      let deleteCount = 0;
      let updateCount = 0;
      let deleteVariantCount = 0;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        console.log(store.id, i, rows.length);
        const product = await getProductBySku(row.sku);

        // skip if product does not exist on store
        if (!product) {
          continue;
        }

        const variants = await getProductVariants(product.id);
        const productHasMultipleVariants = variants.length > 1;
        // check if product is a config
        if (productHasMultipleVariants) {
          // delete variant
          for (const variant of variants) {
            if (variant.sku === row.sku) {
              if (variant.inventory_level == 0 && deleteOOS) {
                await deleteProductVariant(product.id, variant.id);
                deleteVariantCount++;
              } else if (row.sale_price && row.sale_price > 0) {
                await updateProductVariant(product.id, variant.id, {
                  sale_price: row.sale_price,
                });
                updateCount++;
              }
              break;
            }
          }
        } else {
          // if no inventory just delete it
          if (!product.inventory_level && deleteOOS) {
            // delete product
            await deleteProduct(product.id);
            deleteCount++;
            continue;
          }

          const originalSalePrice = product.sale_price;
          const originalProductCategories = [...product.categories];

          if (
            store.clearance_cat &&
            store.clearance_cat > 0 &&
            !product.categories.includes(store.clearance_cat)
          ) {
            product.categories.push(store.clearance_cat);
          }

          // if has stock but not in disable cat, add it
          if (
            store.disable_cat &&
            store.disable_cat > 0 &&
            !product.categories.includes(store.disable_cat)
          ) {
            product.categories.push(store.disable_cat);
          }

          if (row.sale_price && row.sale_price > 0) {
            product.price = row.sale_price;
          }

          if (
            product.price !== originalSalePrice ||
            originalProductCategories.length !== product.categories.length
          ) {
            await updateProduct(product.id, {
              sale_price: product.sale_price,
              categories: product.categories,
            });
            updateCount++;
          }
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
