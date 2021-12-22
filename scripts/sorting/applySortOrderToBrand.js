require("../../config/config").config("bf");
const {
  getProductsByBrand,
} = require("../../functions/products/getProductsByBrand");
const { updateSortOrder } = require("../../functions/products/updateSortOrder");

async function applySortOrderToBrand(brand, sortOrderNumber) {
  const products = await getProductsByBrand(brand).catch((err) => {
    console.log(err);
    throw new Error(err);
  });
  const productIds = products.map(({ id }) => {
    return { id };
  });
  const promises = productIds.map(({ id }) =>
    updateSortOrder(id, sortOrderNumber)
  );
  const res = await Promise.allSettled(promises).catch((err) => {
    console.log(err);
    throw new Error(err);
  });
  const total = res.length
  const fulfilled = res.filter(({status}) => status === "fulfilled").length
  console.log(`${fulfilled}/${total} sorted without issues`);
}
applySortOrderToBrand("Rebeluna", 1126);
