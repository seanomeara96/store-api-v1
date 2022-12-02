require("../../config/config").config("bf");
const { removeCategoryFromProductsInCategory } = require("../../functions/products/removeCategoryFromProductsInCategory");

function main() {
  removeCategoryFromProductsInCategory(640)
    .then((res) => {
      const fulfilled = res.filter(
        ({ status }) => status === "fulfilled"
      ).length;

      const total = res.length;

      console.log(`${fulfilled}/${total} successful`);
    })
    .catch(console.log);
}
main();
