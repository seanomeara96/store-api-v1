import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

async function alignSO() {
  try {
    require("./config/config").config("bf");
    console.log("getting variants");
    const src_variants = await getAllProductVariants();
    console.log("getting products");
    // 12 is beautyfeatures hair category id
    const src_products = await getAllProducts({ "categories:in": 12 });

    const src_data: { sku: string; sort_order: number }[] = [];
    for (const v of src_variants) {
      for (const product of src_products) {
        if (!product.categories.includes(12)) continue;
        if (product.id == v.product_id) {
          src_data.push({ sku: v.sku, sort_order: product.sort_order });
        }
      }
    }

    require("./config/config").config("ah");
    for (let i = 0; i < src_data.length; i++) {
      const d = src_data[i];
      console.log(`updating ${i + 1} of ${src_data.length}`);
      const product = await getProductBySku(d.sku);
      if (!product) continue;
      if (product!.sort_order !== d.sort_order) {
        await updateProduct(product!.id, { sort_order: d.sort_order });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

alignSO();
