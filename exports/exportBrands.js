require("../config/config").config("bf");
const { getAllBrands } = require("../brands/getAllBrands");
const output = require("./utils/output");
getAllBrands().then((res) => {
  let brands = res.map((brand) => {
    return {
      id: brand.id,
      name: brand.name,
      page_title: brand.page_title,
      page_title_length: brand.page_title ? brand.page_title.length : 0,
      meta_description: brand.meta_description,
      meta_description_length: brand.meta_description
        ? brand.meta_description.length
        : 0,
      url: brand.custom_url.url,
      image_url: brand.image_url,
      meta_keywords: brand.meta_keywords.join(","),
      search_keywords: brand.search_keywords,
    };
  });
  output("brand", brands);
});
