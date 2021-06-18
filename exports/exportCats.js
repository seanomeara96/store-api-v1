const { getAllCategories } = require("../categories/getAllCategories");
const output = require("./utils/output");
require("../config/config").config("bf");

getAllCategories().then((res) => {
  console.log(res)
  const cats = res.map((cat) => {
    return {
      ID: cat.id,
      "Parent Id": cat.parent_id,
      Name: cat.name,
      "Has Page Title": cat.page_title ? "TRUE" : "FALSE",
      "Has Meta Description": cat.meta_description ? "TRUE" : "FALSE",
      "Has Content": cat.description ? "TRUE" : "FALSE",
      "Is Visible": cat.is_visibele,
      "Page Title": cat.page_title,
      "Page Title Length": cat.page_title.length,
      "Meta Description": cat.meta_description,
      "Meta Description Length": cat.meta_description.length,
      URL: cat.custom_url.url,
      "Meta Keywords": cat.meta_keywords.join(" "),
      "Search Keywords": cat.search_keywords,
    };
  });
  output("category", cats);
});
