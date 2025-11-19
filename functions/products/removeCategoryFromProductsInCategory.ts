import { Product } from "./Product";
import { getAllProducts } from "./getAllProducts";
import { removeCatFromProduct } from "./removeCatFromProduct";

export function removeCategoryFromProductsInCategory(
  categoryId: number,
  suppliedProducts?: any[] | undefined,
) {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof categoryId !== "number") {
        return reject("id must be number");
      }
      const queryParam = {
        "categories:in": [categoryId].join(","),
      };

      let products;
      if (suppliedProducts) {
        products = suppliedProducts.filter(function (p) {
          return p.categories.includes(categoryId);
        });
      } else {
        products = await getAllProducts(queryParam);
      }

      if (!products) return reject("somehting went wrong");
      if (!products.length) return resolve(products.length); // category is already empty

      const producsInCat = products.filter(function (product) {
        return product.categories.includes(categoryId);
      });

      const productIds = producsInCat.map(function (product: Product) {
        return product.id;
      });

      console.log(`${productIds.length} to remove`);
      for (let x = 0; x < productIds.length; x += 25) {
        console.log(`removing ${x} - ${x + 25}...`);
        const batch = productIds.slice(x, x + 25);
        const promises = [];
        for (let i = 0; i < batch.length; i++) {
          const id = batch[i];
          promises.push(removeCatFromProduct(id, categoryId));
        }
        await Promise.all(promises);
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
