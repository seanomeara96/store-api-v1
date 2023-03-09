import { getAllProducts } from "./getAllProducts";
import { removeCatFromProduct } from "./removeCatFromProduct";

const filterProductsInCat = (products: any[], categoryId: number) =>
  products.filter((product) => product.categories.includes(categoryId));

const mapProductIds = (products: any[]) => products.map(({ id }) => id);

const mapPromiseToId = (ids: number[], categoryId: number) =>
  ids.map((id) => removeCatFromProduct(id, categoryId));

export function removeCategoryFromProductsInCategory(
  categoryId: number,
  suppliedProducts: any[] | undefined
): Promise<unknown> {
  return new Promise(async (resolve, reject) => {
    if (typeof categoryId !== "number") {
      return reject("id must be number");
    }

    let products: any[];
    if (suppliedProducts) {
      products = suppliedProducts.filter((p) =>
        p.categories.includes(categoryId)
      );
    } else {
      try {
        products = await getAllProducts({ "categories:in": categoryId });
      } catch (err) {
        console.log(err);
      }
    }

    if (!products!) {
      reject("somehting went wrong");
      return;
    }
    if (!products.length) {
      resolve(0);
      return;
    }
    const producsInCat = filterProductsInCat(products!, categoryId);
    const productIds = mapProductIds(producsInCat);
    //const promises = mapPromiseToId(productIds, categoryId);
    //Promise.allSettled(promises).then(resolve).catch(reject);
    for (const id of productIds) {
      await removeCatFromProduct(id, categoryId);
    }
    let productsInCatAfterClean;
    try {
      productsInCatAfterClean = await getAllProducts({
        "categories:in": categoryId,
      });
    } catch (err) {
      console.log(err);
      reject(err);
      return;
    }
    if (productsInCatAfterClean) {
      const productCount = productsInCatAfterClean.length;
      if (productCount) {
        reject("failed to remove all products");
        return;
      }
      resolve(productCount);
      return;
    }
    reject("something went wrong");
  });
}
