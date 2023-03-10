import { getAllProducts } from "./getAllProducts";
import { removeCatFromProduct } from "./removeCatFromProduct";

function filterProductsInCat(products: any[], categoryId: number) {
  return products.filter((product) => product.categories.includes(categoryId));
}

function mapProductIds(products: any[]) {
  return products.map((product) => product.id);
}

export function removeCategoryFromProductsInCategory(
  categoryId: number,
  suppliedProducts: any[] | undefined
) {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof categoryId !== "number") {
        return reject("id must be number");
      }
      const queryParam = {
        "categories:in": categoryId,
      };

      const products = suppliedProducts
        ? suppliedProducts.filter((p) => p.categories.includes(categoryId))
        : await getAllProducts(queryParam);

      if (!products) return reject("somehting went wrong");
      if (!products.length) return resolve(products.length); // category is already empty

      const producsInCat = filterProductsInCat(products, categoryId);
      const productIds = mapProductIds(producsInCat);
      console.log(`${productIds.length} to remove`);
      for (let x = 0; x < productIds.length; x += 25) {
        console.log(`removing ${x} - ${x + 25}...`);
        await Promise.all(
          productIds
            .slice(x, x + 25)
            .map((id) => removeCatFromProduct(id, categoryId))
        );
        console.log(`removed ${x} - ${x + 25}`);
      }

      const productsInCatAfterClean = await getAllProducts(queryParam);

      const productCount = productsInCatAfterClean.length;
      if (productCount) {
        reject("failed to remove all products");
        return;
      }
      resolve(productCount);
    } catch (err) {
      reject(err);
    }
  });
}
