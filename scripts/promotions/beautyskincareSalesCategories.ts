import { getAllProducts } from "../../functions/products/getAllProducts";
import { updateProduct } from "../../functions/products/updateProduct";
async function beautyskincareSalesCategories() {
  try {
    require("../../config/config").config("bsk");
    const TWENTY = 109;
    const TWENTY_FIVE = 110;
    const products = await getAllProducts();
    for (const product of products) {
      let initialCategories = [...product.categories].sort();

      product.categories = product.categories.filter(
        (c) => c !== TWENTY && c !== TWENTY_FIVE,
      );

      let effectivePrice = product.sale_price;
      if (!effectivePrice) {
        effectivePrice = product.price;
      }

      let discount = ((product.price - effectivePrice) / product.price) * 100;

      if (discount >= 20) product.categories.push(TWENTY);
      if (discount >= 25) product.categories.push(TWENTY_FIVE);

      product.categories.sort();

      let requiresUpdate =
        product.categories.length !== initialCategories.length;
      if (!requiresUpdate) {
        for (let i = 0; i < product.categories.length; i++) {
          if (product.categories[i] !== initialCategories[i]) {
            // requires update
            requiresUpdate = true;
            break;
          }
        }
      }

      if (requiresUpdate) {
        await updateProduct(product.id, { categories: product.categories });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
beautyskincareSalesCategories();
