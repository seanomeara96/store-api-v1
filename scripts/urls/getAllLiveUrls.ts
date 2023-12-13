import { getAllRedirects } from "../../functions/redirects/getAllRedirects";
import { getSiteUrl } from "../../functions/utils/getSiteUrl";
import { getAllBrands } from "../../functions/brands/getAllBrands";
import { getAllCategories } from "../../functions/categories/getAllCategories";
import { getAllPages } from "../../functions/pages/getAllPages";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getAllBlogs } from "../../functions/blogs/getAllBlogs";
import fs from "fs"
import path from "path"
import { output } from "../utils/output";
async function getAllLiveUrls(site: string) {
  try {
    require("../../config/config").config(site);
    const redirects = await getAllRedirects();

    const discontinuedUrls = redirects.map(function (el) {
      return el.from_path;
    });

    const url = getSiteUrl(site);

    /**
     * get al priooduct urls
     */
    const products = await getAllProducts();
    const productUrls = products.map((product) => ({
      type: "product",
      url: url + product.custom_url.url,
      slug: product.custom_url.url,
      sku: product.sku,
      product_count: null,
    }));

    /**
     * get all brands
     */
    const brands = await getAllBrands();
    const brandUrls = brands.map((brand) => ({
      type: "brand",
      url: url + brand.custom_url.url,
      slug: brand.custom_url.url,
      sku: "",
      product_count: products.reduce((a, c) => {
        return brand.id === c.brand_id ? a + 1 : a;
      }, 0),
    }));
    /**
     * get all categories
     */
    const cats = await getAllCategories();
    /**
     * filter only visible categories
     */
    const visibleCats = cats.filter((cat) => cat.is_visible);
    const catUrls = visibleCats.map((cat) => ({
      type: "category",
      url: url + cat.custom_url.url,
      slug: cat.custom_url.url,
      sku: "",
      product_count: products.reduce((a, c) => {
        return c.categories.includes(cat.id) ? a + 1 : a;
      }, 0),
    }));
    /**
     * get all pages
     */
    const pages = await getAllPages();
    const pageUrls = pages.map((page) => ({
      type: "page",
      url: url + (page.url || ""),
      slug: page.url || "",
      sku: "",
      product_count: null,
    }));

    require("../../config/config").config(site, 2);
    /**
     * get all blogs
     */
    const blogs = await getAllBlogs();
    const blogUrls = blogs.map((blog) => ({
      type: "blog",
      url: url + blog.url,
      slug: blog.url,
      sku: "",
      product_count: null,
    }));

    if (!url) throw new Error("URL is undefined");

    const data = [
      {
        type: "homepage",
        url,
        slug: "/",
        sku: "",
        product_count: null,
      },
      ...brandUrls,
      ...catUrls,
      ...pageUrls,
      ...blogUrls,
      ...productUrls,
    ];


    const filteredData = data.filter(({ slug }) => !discontinuedUrls.includes(slug));

    const filteredDataWithSlugsRemoved = filteredData.map(function (item) {
      delete item.slug;
      return item;
    })


    output(path.resolve(__dirname, site+"-urls.csv"), filteredDataWithSlugsRemoved, true)

  } catch (err) {
    console.log(err);
  }
}


getAllLiveUrls("ch")