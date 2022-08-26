require("../../config/config").config("bf");

const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const {
  removeCategoryFromProductsInCategory,
} = require("../../functions/products/removeCategoryFromProductsInCategory");

(async () => {
  const newInCatId = 679;

  await removeCategoryFromProductsInCategory(newInCatId).catch((err) => {
    throw new Error("could not remove products");
  });

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 60);

  const formattedMinDate = `${minDate.getFullYear()}-${
    minDate.getMonth() + 1
  }-${minDate.getDate()}`;

  const products = await getAllProducts({
    "date_last_imported:min": formattedMinDate,
  }).catch((err) => {
    throw new Error("could not fetch products", err);
  });

  const productIds = products.map(({ id }) => ({ id }));

  await addCategoryToSpecificProducts(productIds, newInCatId).catch((err) => {
    throw new Error("could not add category to products");
  });

  console.log("New In category Updated")
})();