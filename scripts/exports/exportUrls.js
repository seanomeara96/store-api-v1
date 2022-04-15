const site = "beuk";
require("../../config/config").config(site);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { getAllBrands } = require("../../functions/brands/getAllBrands");
const { getAllPages } = require("../../functions/pages/getAllPages");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");
const {
  getAllCategories,
} = require("../../functions/categories/getAllCategories");
const { getAllBlogs } = require("../../functions/blogs/getAllBlogs");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const {
  getAllRedirects,
} = require("../../functions/redirects/getAllRedirects");
const { stringify } = require("csv-stringify");
/**
 * Exports urls for brands, categories,
 */
async function exportUrls() {
  const redirects = await getAllRedirects().catch("redirects failed");
  function fromPath(el) {
    return el.from_path;
  }
  const discontinuedUrls = redirects.map(fromPath);
  // console.log(discontinuedUrls);
  const url = getSiteUrl(site);
  /**
   * get all brands
   */
  const brands = await getAllBrands().catch("brands failed");
  const brandUrls = brands.map((brand) => ({
    type: "brand",
    url: url + brand.custom_url.url,
    slug: brand.custom_url.url,
    sku: "",
  }));
  /**
   * get all categories
   */
  const cats = await getAllCategories().catch("cats failed");
  /**
   * filter only visible categories
   */
  const visibleCats = cats.filter((cat) => cat.is_visible);
  const catUrls = visibleCats.map((cat) => ({
    type: "category",
    url: url + cat.custom_url.url,
    slug: cat.custom_url.url,
    sku: "",
  }));
  /**
   * get all pages
   */
  const pages = await getAllPages().catch("pages failed");
  const pageUrls = pages.map((page) => ({
    type: "page",
    url: url + (page.url || ""),
    slug: page.url || "",
    sku: "",
  }));
  /**
   * get al priooduct urls
   */
  const products = await getAllProducts().catch("products failed");
  const productUrls = products.map((product) => ({
    type: "product",
    url: url + product.custom_url.url,
    slug: product.custom_url.url,
    sku: product.sku,
  }));
  require("../../config/config").config(site, 2);
  /**
   * get all blogs
   */
  const blogs = await getAllBlogs().catch(() => console.log("blogs failed"));
  const blogUrls = blogs.map((blog) => ({
    type: "blog",
    url: url + blog.url,
    slug: blog.url,
    sku: "",
  }));

  const data = [
    ...brandUrls,
    ...catUrls,
    ...pageUrls,
    ...blogUrls,
    ...productUrls,
  ];

  const removeDiscontinuedUrls = (data, discontinuedUrls) =>
    data.filter(({ slug }) => !discontinuedUrls.includes(slug));

  function removeSlug(item) {
    delete item.slug;
    return item;
  }

  const removeSlugs = (data) => data.map(removeSlug);

  const cleanseData = (data, discontinuedUrls) =>
    removeSlugs(removeDiscontinuedUrls(data, discontinuedUrls));

  const cleansedData = cleanseData(data, discontinuedUrls);
  stringify(cleansedData, (err, csvFile) => {
    if (err) throw "Something went wrong";
    const attachment = Buffer.from(csvFile).toString("base64");
    const subj = `All Urls for ${site.toUpperCase()}`;
    const msg = {
      to: "sean@beautyfeatures.ie",
      from: "sean@beautyfeatures.ie",
      subject: subj,
      text: subj,
      attachments: [
        {
          content: attachment,
          filename: `${site.toUpperCase()}-URLS.csv`,
          type: "text/csv",
          disposition: "attachment",
        },
      ],
    };
    function logErrResponseBody(err) {
      return console.log(err.response.body);
    }
    sgMail.send(msg).catch(logErrResponseBody);
  });
}

exportUrls();
