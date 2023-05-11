require("../../config/config").config("px");
const { removeCategoryFromProductsInCategory } = require("../../functions/products/removeCategoryFromProductsInCategory");

function main() {
  removeCategoryFromProductsInCategory(458)
    .then((res) => {
      if(!Array.isArray(res)){
        console.log(res)
        return
      }

      const fulfilled = res.filter(
        ({ status }) => status === "fulfilled"
      ).length;

      const total = res.length;

      console.log(`${fulfilled}/${total} successful`);
    })
    .catch(console.log);
}
main();
