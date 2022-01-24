const site = "bf";
require("../../config/config").config(site);
const { getAllBrands } = require("../../functions/brands/getAllBrands");
const { getAllPages } = require("../../functions/pages/getAllPages");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");
const {
  getAllCategories,
} = require("../../functions/categories/getAllCategories");
const { output } = require("../utils/output");
const { getAllBlogs } = require("../../functions/blogs/getAllBlogs");
const { getAllProducts } = require("../../functions/products/getAllProducts");
/**
 * Exports urls for brands, categories,
 */
async function exportUrls() {
  const url = getSiteUrl(site);
  /**
   * get all brands
   */
  const brands = await getAllBrands().catch(() => console.log("brands failed"));
  const brandUrls = brands.map((brand) => ({
    type: "brand",
    url: url + brand.custom_url.url,
  }));
  /**
   * get all categories
   */
  const cats = await getAllCategories().catch(() => console.log("cats failed"));
  /**
   * filter only visible categories
   */
  const visibleCats = cats.filter((cat) => cat.is_visible);
  const catUrls = visibleCats.map((cat) => ({
    type: "category",
    url: url + cat.custom_url.url,
  }));
  /**
   * get all pages
   */
  const pages = await getAllPages().catch(() => console.log("pages failed"));
  const pageUrls = pages.map((page) => ({ type: "page", url: url + page.url }));
  /**
   * get al priooduct urls
   */
  const products = await getAllProducts();
  const productUrls = products.map((product) => ({
    type: "product",
    url: url + product.custom_url.url,
  }));
  require("../../config/config").config(site, 2);
  /**
   * get all blogs
   */
  const blogs = await getAllBlogs().catch(() => console.log("blogs failed"));
  const blogUrls = blogs.map((blog) => ({
    type: "blog",
    url: blog.url,
  }));
  const data = [
    ...brandUrls,
    ...catUrls,
    ...pageUrls,
    ...blogUrls,
    ...productUrls,
  ];
  await output(`${site}-urls`, data);
}

exportUrls();
