const store = "bs";
require("./config/config").config(store);
const { output } = require("./scripts/utils/output");
const {
  getAllProductVariants,
} = require("./functions/products/getAllProductVariants");

(async () => {
  try {
    const pvars = await getAllProductVariants();
    console.log(pvars)
  } catch (err) {
    console.log(err);
  }
})();
