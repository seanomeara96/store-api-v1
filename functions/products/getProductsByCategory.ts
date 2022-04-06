import { getAllProducts } from "./getAllProducts";

export const getProductsByCategory = (category_id: number) =>
  new Promise((resolve, reject) => {
    const filterCategoryProducts = (products: any) =>
      products.filter((product: any) =>
        product.categories.includes(category_id)
      );
    getAllProducts().then(filterCategoryProducts).catch(reject).then(resolve);
  });
