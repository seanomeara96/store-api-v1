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

const productIds = [{"Product ID":5630},
{"Product ID":5631},
{"Product ID":5632},
{"Product ID":5633},
{"Product ID":5634},
{"Product ID":5635}];

applySortOrderToMany(productIds, 618);
