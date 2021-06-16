const output = require("./utils/output");
const { getAllPages } = require("../pages/getAllPages");
require("../config/config").config("bf");

getAllPages().then((res) => {
  const pages = res.map((page) => {
    return {
      ID: page.id,
      Name: page.name,
      "Has Page Title": page.meta_title ? "TRUE" : "FALSE",
      "Has Meta Description": page.meta_description ? "TRUE" : "FALSE",
      "Has Content": page.description ? "TRUE" : "FALSE",
      "Is Visible": page.is_visible ? "TRUE" : "FALSE",
      "Page Title": page.meta_title,
      "Page Title Length": page.meta_title.length,
      "Meta Description": page.meta_description,
      "Meta Description Length": page.meta_description.length,
      URL: page.url,
      "Meta Keywords": page.meta_keywords,
      "Search Keywords": page.search_keywords,
    };
  });
  output("pages", pages);
});
