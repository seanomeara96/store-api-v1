const { getAllCategories } = require("../categories/getAllCategories");
const { getAllProducts } = require("../products/getAllProducts");
const output = require("./utils/output");
require("../config/config").config("ih");

getAllProducts().then((products) => {
  console.log(products);
  getAllCategories().then((res) => {
    //console.log(res);
    const cats = res.map((cat) => {
      return {
        ID: cat.id,
        "Parent Id": cat.parent_id,
        Name: cat.name,
        "Has Page Title": cat.page_title ? "TRUE" : "FALSE",
        "Has Meta Description": cat.meta_description ? "TRUE" : "FALSE",
        "Has Content": cat.description ? "TRUE" : "FALSE",
        "Is Visible": cat.is_visible ? "TRUE" : "FALSE",
        "No. Of Products": products.filter(
          (product) => product.categories.includes(cat.id) === true
        ).length,
        "Page Title": cat.page_title,
        "Page Title Length": cat.page_title ? cat.page_title.length : 0,
        "Meta Description": cat.meta_description,
        "Meta Description Length": cat.meta_description ? cat.meta_description.length : 0,
        URL: cat.custom_url.url,
        "Meta Keywords": cat.meta_keywords.join(" "),
        "Search Keywords": cat.search_keywords,
      };
    });
    output("category", cats);
  });
});
