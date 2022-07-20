import { getAllProducts } from "./getAllProducts";
import { removeCatFromProduct } from "./removeCatFromProduct";

const filterProductsInCat = (products: any[], categoryId: number) =>
  products.filter((product) => product.categories.includes(categoryId));

const mapProductIds = (products: any[]) => products.map(({ id }) => id);

const mapPromiseToId = (ids: number[], categoryId: number) =>
  ids.map((id) => removeCatFromProduct(id, categoryId));

export function removeCategoryFromProductsInCategory(categoryId: number) {
  return new Promise(async (resolve, reject) => {
    const products = await getAllProducts().catch(reject);
    const producsInCat = filterProductsInCat(products!, categoryId);
    const productIds = mapProductIds(producsInCat);
    const promises = mapPromiseToId(productIds, categoryId);
    Promise.allSettled(promises).then(resolve).catch(reject);
  });
}
