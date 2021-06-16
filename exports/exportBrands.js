const api = require("../config/config");
api.config("bf");
const { getAllBrands } = require("../brands/getAllBrands");
const output = require("./utils/output");
getAllBrands()
  .then((brand_res) => {
    api.config("bf", 2);
    const { getAllBanners } = require("../banners/getAllBanners");
    getAllBanners()
      .then((banner_res) => {
        let brands = brand_res.map((brand) => {
          let brand_content = banner_res.filter(
            (element) => element.id === brand.id
          );
          if (brand_content.length < 1) {
            brand_content = "No Content";
          } else if (brand_content.length > 1) {
            brand_content = "Multiple Banners";
          } else if (brand_content.length === 1) {
            brand_content = brand_content[0].content;
          } else {
            brand_content = "Something went wrong";
          }
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
            content: brand_content,
            image_url: brand.image_url,
            meta_keywords: brand.meta_keywords.join(" "),
            search_keywords: brand.search_keywords,
          };
        });
        output("brand", brands);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
