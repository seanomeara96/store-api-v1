import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";
interface Product {
  sku: string;
  name: string;
  category: string;
  category_id: number;
}
const data: Product[] = [];
async function bundles() {
  require("./config/config").config("bf");
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    console.log(i, data.length);
    const product = await getProductBySku(d.sku);
    if (!product) continue;

    if (!product.categories.includes(663)) {
      product.categories.push(663);
    }

    if (!product.categories.includes(d.category_id)) {
      product.categories.push(d.category_id);
    }

    await updateProduct(product.id, { categories: product.categories });
  }
}

bundles();
