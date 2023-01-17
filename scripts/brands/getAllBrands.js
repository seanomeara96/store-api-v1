(async () => {
  require("../../config/config").config("ds");
  const { getAllBrands } = require("../../functions/brands/getAllBrands");
  try {
    const brands = await getAllBrands();
    console.log(brands.map(b => b.custom_url.url).filter(i => i !== "/dogspace/"))
  } catch (err) {
    console.log(err);
  }
})();
