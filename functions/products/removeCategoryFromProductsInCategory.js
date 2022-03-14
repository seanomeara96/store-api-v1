const { getAllProducts } = require("./getAllProducts");
const {
  removeCatFromProduct,
} = require("./removeCatFromProduct");

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