import { removeCategoryFromProductsInCategory } from "../../functions/products/removeCategoryFromProductsInCategory";

require("../../config/config").config("bf");

async function main() {
  try {
    const res = await removeCategoryFromProductsInCategory(515);
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
