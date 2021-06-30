const { getAllCategories } = require("../categories/getAllCategories");
const { getAllProducts } = require("../products/getAllProducts");
const { getAllBanners } = require("../banners/getAllBanners");
const output = require("./utils/output");
const store = "ah";
require("../config/config").config(store);
getAllProducts().then((products) => {
  require("../config/config").config(store, 2);
  getAllBanners()
    .then((banners) => {
      require("../config/config").config(store, 3);
      getAllCategories().then((res) => {
        const cats = res.map((cat) => {
          let associatedBanners = banners.filter(
            (banner) => parseInt(banner.item_id) === cat.id
          );
          let associatedBannersLive = associatedBanners.filter(
            (banner) => parseInt(banner.visible) === 1
          );
          let hasBanner;
          if (associatedBanners.length === 1) {
            hasBanner = "TRUE";
          } else if (associatedBanners.length > 1) {
            hasBanner = "Multiple Banners";
          } else {
            hasBanner = "FALSE";
          }
          let productsInCat = products.filter(
            (product) => product.categories.includes(cat.id) === true
          );
          let productsInCatInStock = productsInCat.filter(
            (product) => product.inventory_level > 0
          );
          return {
            ID: cat.id,
            "Parent Id": cat.parent_id,
            Name: cat.name,
            "Has Page Title": cat.page_title ? "TRUE" : "FALSE",
            "Has Meta Description": cat.meta_description ? "TRUE" : "FALSE",
            "Has Content": cat.description ? "TRUE" : "FALSE",
            "Is Visible": cat.is_visible ? "TRUE" : "FALSE",
            "Has Banner": hasBanner,
            "Banner(s) Live": associatedBannersLive.length ? "TRUE" : "FALSE",
            Products: productsInCat.length,
            "Products In Stock": productsInCatInStock.length,
            "Page Title": cat.page_title,
            "Page Title Length": cat.page_title ? cat.page_title.length : 0,
            "Meta Description": cat.meta_description,
            "Meta Description Length": cat.meta_description
              ? cat.meta_description.length
              : 0,
            URL: cat.custom_url.url,
            "Meta Keywords": cat.meta_keywords.join(" "),
            "Search Keywords": cat.search_keywords,
          };
        });
        output("category", cats);
      });
    })
    .catch((err) => console.log(err));
});
