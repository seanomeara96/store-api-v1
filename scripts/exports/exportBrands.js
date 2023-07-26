const api = require("../../config/config");
const initials = "bf";
api.config(initials);
const { getAllBrands } = require("../../functions/brands/getAllBrands");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const {
  getAllRedirects,
} = require("../../functions/redirects/getAllRedirects");
const { output } = require("../utils/output");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");
const { booleanString } = require("./utils/booleanString");
const { log } = console;
/**
 * @param {any} x
 * @returns true / false as string
 */
const exportBrands = async () => {
  /**
   * all site base domain url
   */
  const siteUrl = getSiteUrl(initials);

  /**
   * all store brands
   */
  const brands = await getAllBrands().catch(log);
  if (!brands) {
    return;
  }

  /**
   * all store products
   */
  const products = await getAllProducts().catch(log);
  if (!products) {
    return;
  }
  /**
   * all store redirects
   */
  const redirects = await getAllRedirects().catch(log);
  if (!redirects) {
    return;
  }

  /**
   * just the slugs
   */
  const redirectPaths = redirects.map(({ from_path }) => from_path);

  // require get all banners
  api.config(initials, 2);
  const { getAllBanners } = require("../../functions/banners/getAllBanners"); // marketing -> banners is still in v2

  /**
   * all store banners
   */
  const banners = await getAllBanners().catch(log);
  if (banners) {
    return;
  }

  // create initial document
  let outputDoc = brands.map((brand) => {
    return {
      ID: brand.id,
      "Brand Name": brand.name,
      "Has Page Title": booleanString(brand.page_title),
      "Has Meta Description": booleanString(brand.meta_description),
      "Has Content": "FALSE", // default
      "No. of live banners": 0, // default
      "Contains Redirects": "FALSE", // default
      "Contains Broken Links": "FALSE", // default
      "No. of Redirected URLs": 0, // default value
      "No. of Broken URLs": 0, // default value
      Products: 0, // default value
      "Products In Stock": 0, // default value
      "301 URLs": [], // default value
      "404 URLs": [], // default value
      "Page Title": brand.page_title,
      "Page Title Length": brand.page_title ? brand.page_title.length : 0,
      "Meta Description": brand.meta_description,
      "Meta Description Length": brand.meta_description
        ? brand.meta_description.length
        : 0,
      URL: siteUrl + brand.custom_url.url,
      "Brand Logo": brand.image_url,
      "Meta Keywords": brand.meta_keywords.join(" "),
      "Search Keywords": brand.search_keywords,
    };
  });

  // add product details
  for (const brand of outputDoc) {
    let brandProducts = products.filter(
      (product) => product.brand_id === brand.ID
    );
    let brandProductsInStock = brandProducts.filter(
      (product) => product.inventory_level > 0
    );
    brand["Products"] = brandProducts.length.toString();
    brand["Products In Stock"] = brandProductsInStock.length.toString();
  }
  /*
    // add brand banner details
    outputDoc.forEach((brand) => {
      // gets banners associated with brand
      let brandBanners = getAssociatedBrandBanners(banners, brand.ID);
      brand["Has Content"] = booleanString(brandBanners.length);
      let liveBrandBanners = getLiveAssociatedBrandBanners(banners, brand.ID);
      if (liveBrandBanners.length)
        brand["No. of live banners"] = liveBrandBanners.length;
    });

    // check banners for dodgy links
    outputDoc = await checkAllBannerContent(
      outputDoc,
      banners,
      redirectPaths,
      siteUrl,
      getLiveAssociatedBrandBanners
    );
*/
  // write to csv file
  output("brand", outputDoc);
};
exportBrands();
