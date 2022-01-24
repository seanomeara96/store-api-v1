const { getAllProducts } = require("../../functions/products/getAllProducts");
const {
  removeCatFromProduct,
} = require("../../functions/products/removeCatFromProduct");

const filterProductsInCat = (products, categoryId) =>
  products.filter((product) => product.categories.includes(categoryId));

const mapProductIds = (products) => products.map(({ id }) => id);

const mapPromiseToId = (ids, categoryId) =>
  ids.map((id) => removeCatFromProduct(id, categoryId));

const removeCategoryFromProductsInCategory = (categoryId) =>
  new Promise(async (resolve, reject) => {
    const products = await getAllProducts().catch(reject);
    const producsInCat = filterProductsInCat(products, categoryId);
    const productIds = mapProductIds(producsInCat);
    const promises = mapPromiseToId(productIds, categoryId);
    Promise.allSettled(promises).then(resolve).catch(reject);
  });

exports.removeCategoryFromProductsInCategory =
  removeCategoryFromProductsInCategory;

function main() {
  removeCategoryFromProductsInCategory(658)
    .then((res) => {
      const fulfilled = res.filter(
        ({ status }) => status === "fulfilled"
      ).length;

      const total = res.length;

      console.log(`${fulfilled}/${total} successful`);
    })
    .catch(console.log);
}
