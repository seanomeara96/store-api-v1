import { getAllBrands } from "../../functions/brands/getAllBrands";
(async () => {
  require("../../config/config").config("ds");
  try {
    const brands = await getAllBrands();
    console.log(
      brands.map((b) => b.custom_url.url).filter((i) => i !== "/dogspace/")
    );
  } catch (err) {
    console.log(err);
  }
})();
