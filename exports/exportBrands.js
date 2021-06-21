const api = require("../config/config");
const initials = "bs";
api.config(initials);
const { getAllBrands } = require("../brands/getAllBrands");
const { getAllProducts } = require("../products/getAllProducts");
const output = require("./utils/output");

getAllProducts()
  .then((products) => {
    console.log(products);
    getAllBrands()
      .then((brand_res) => {
        api.config(initials, 2);
        const { getAllBanners } = require("../banners/getAllBanners");
        getAllBanners()
          .then((banner_res) => {
            let brands = brand_res.map((brand) => {
              let brand_content = banner_res.filter(
                (element) => parseInt(element.item_id) === brand.id
              );
              if (brand_content.length < 1) {
                brand_content = "FALSE";
              } else if (brand_content.length > 1) {
                brand_content = "Multiple Banners";
              } else if (brand_content.length === 1) {
                brand_content = "TRUE";
              } else {
                brand_content = "Something went wrong";
              }
              return {
                ID: brand.id,
                "Brand Name": brand.name,
                "Has Page Title": brand.page_title ? "TRUE" : "FALSE",
                "Has Meta Description": brand.meta_description
                  ? "TRUE"
                  : "FALSE",
                "Has Content": brand_content,
                "No. Of Products": products.filter(product => product.brand_id === brand.id).length,
                "Page Title": brand.page_title,
                "Page Title Length": brand.page_title
                  ? brand.page_title.length
                  : 0,
                "Meta Description": brand.meta_description,
                "Meta Description Length": brand.meta_description
                  ? brand.meta_description.length
                  : 0,
                URL: brand.custom_url.url,
                "Brand Logo": brand.image_url,
                "Meta Keywords": brand.meta_keywords.join(" "),
                "Search Keywords": brand.search_keywords,
              };
            });
            output("brand", brands);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
