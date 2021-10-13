const site = "ah";
require("../../config/config").config(site);
const { getAllBrands } = require("../../functions/brands/getAllBrands");
const { getAllPages } = require("../../functions/pages/getAllPages");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");
const {
  getAllCategories,
} = require("../../functions/categories/getAllCategories");
const { output } = require("../utils/output");
/**
 * Exports urls for brands, categories,
 */
async function exportUrls() {
  const url = getSiteUrl(site);
  let brands = await getAllBrands();
  brands = brands.map((brand) => {
    return { brand: url + brand.custom_url.url };
  });
  let cats = await getAllCategories();
  cats = cats.filter(cat => cat.is_visible)
  cats = cats.map((cat) => {
    return { category: url + cat.custom_url.url };
  });
  let pages = await getAllPages();
  pages = pages.map((page) => {
    return { page: url + page.url };
  });
  const resources = [brands, cats, pages];
  resources.sort((a, b) => b.length - a.length);
  let secondColumnName = Object.keys(resources[1][0])[0];
  let thirdColumnName = Object.keys(resources[2][0])[0];
  for (let i = 0; i < resources[0].length; i++) {
    let correspondingObj1 = resources[1][i] || {};
    let correspondingObj2 = resources[2][i] || {};
    resources[0][i][secondColumnName] =
      correspondingObj1[secondColumnName] || "";
    resources[0][i][thirdColumnName] = correspondingObj2[thirdColumnName] || "";
  }
  const data = resources[0];
 await output(`${site}-urls`, data);
}

exportUrls();
