require("../../config/config").config("bf");

const { updateSortOrder } = require("../../functions/products/updateSortOrder");

async function applySortOrderToMany(productIds, sortOrderNumber) {
  const promises = productIds.map((doc) => {
    const id = Object.values(doc)[0];
    if(typeof id !== "number") return;
    return updateSortOrder(id, sortOrderNumber);
  });
  const res = await Promise.allSettled(promises).catch((err) => {
    console.log(err);
    throw new Error(err);
  });
  const total = res.length;
  const fulfilled = res.filter(({ status }) => status === "fulfilled").length;
  console.log(`${fulfilled}/${total} sorted without issues`);
}

const productIds = [
  { "Product ID": 5616 },
  { "Product ID": 5617 },
  { "Product ID": 5618 },
  { "Product ID": 5619 },
  { "Product ID": 5620 },
  { "Product ID": 5621 },
  { "Product ID": 5622 },
];

applySortOrderToMany(productIds, 26);
