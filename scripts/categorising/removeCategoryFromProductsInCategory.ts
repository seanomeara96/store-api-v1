import { removeCategoryFromProductsInCategory } from "../../functions/products/removeCategoryFromProductsInCategory";

require("../../config/config").config("bsk");

async function main() {
  try {
    const res = await removeCategoryFromProductsInCategory(108);
    if (!Array.isArray(res)) {
      console.log(res);
      return;
    }

    const fulfilled = res.filter(({ status }) => status === "fulfilled").length;

    const total = res.length;

    console.log(`${fulfilled}/${total} successful`);
  } catch (err) {
    console.log(err);
  }
}
main();
