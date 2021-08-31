const store = "ih";
require("../config/config").config(store);
const { getAllCategories } = require("../categories/getAllCategories");
const { getAllProducts } = require("../products/getAllProducts");
const { getAllRedirects } = require("../redirects/getAllRedirects");
const { booleanString } = require("./utils/booleanString");
const { getSiteUrl } = require("../utils/getSiteUrl");
const {
  getAssociatedCategoryBanners,
  getLiveAssociatedCategoryBanners,
} = require("./utils/getAssociatedBanners");
const output = require("./utils/output");
const { checkAllCatDescriptions } = require("./utils/checkAllCatDescriptions");
const { checkAllBannerContent } = require("./utils/checkAllBannerContent");

const exportCats = async () => {
  try {
    console.log("fetching site url...");
    /**
     * all site base domain url
     */
    const siteUrl = getSiteUrl(store);
    console.log("Advice: store url = ", siteUrl)
    console.log("fetching products...");
    /**
     * all store products
     */
    const products = await getAllProducts();
    console.log("fetching categories...");
    /**
     * all store categories
     */
    const categories = await getAllCategories();
    console.log("fetching redirects...");
    /**
     * all store redirects
     */
    const redirects = await getAllRedirects();
    /**
     * just the slugs
     */
    const redirectPaths = redirects.map(({ from_path }) => from_path);
    // require get all banners
    require("../config/config").config(store, 2);
    const { getAllBanners } = require("../banners/getAllBanners");
    console.log("fetching banners...");
    /**
     * all store banners
     */
    const banners = await getAllBanners();

    // create inital document shape
    console.log("init output doc");
    let outputDoc = categories.map((cat) => {
      return {
        ID: cat.id,
        "Parent Id": cat.parent_id,
        Name: cat.name,
        Description: cat.description,
        "Has Page Title": booleanString(cat.page_title),
        "Has Meta Description": booleanString(cat.meta_description),
        "Has Content": booleanString(cat.description),
        "Description 301s": null, // default value
        "#Desc. 301s": 0, // default value
        "Description 404s": null, // default value
        "#Des. 404s": 0, // default value
        "Is Visible": booleanString(cat.is_visible),
        "Has Banner": null, // default value
        "No. of live banners": null, // default value
        "Contains Redirects": "FALSE",
        "Contains Broken Links": "FALSE",
        "No. of Redirected URLs": 0, // default value
        "No. of Broken URLs": 0, // default value
        Products: null, // default value
        "Products In Stock": null, // default value
        "301 URLs": [],
        "404 URLs": [], // default value
        "Page Title": cat.page_title,
        "Page Title Length": cat.page_title ? cat.page_title.length : 0,
        "Meta Description": cat.meta_description,
        "Meta Description Length": cat.meta_description
          ? cat.meta_description.length
          : 0,
        URL: siteUrl + cat.custom_url.url,
        "Meta Keywords": cat.meta_keywords.join(" "),
        "Search Keywords": cat.search_keywords,
      };
    });
    console.log("adding product info...");
    // add product information
    outputDoc.forEach((cat) => {
      let productsInCat = products.filter((product) =>
        product.categories.includes(cat.ID)
      );
      cat["Products"] = productsInCat.length;
      let productsInCatInStock = productsInCat.filter(
        (product) => product.inventory_level > 0
      );
      cat["Products In Stock"] = productsInCatInStock.length;
    });
    console.log("adding banner info...");
    // add additional content information
    outputDoc.forEach((cat) => {
      cat["Has Banner"] = booleanString(
        getAssociatedCategoryBanners(banners, cat.ID).length
      );
      cat["No. of live banners"] = getLiveAssociatedCategoryBanners(
        banners,
        cat.ID
      ).length;
    });
    // check category descripitons
    console.log("checking category descriptions...");
    outputDoc = await checkAllCatDescriptions(
      outputDoc,
      redirectPaths,
      siteUrl
    );
    // check the banner content
    console.log("checking banner content...");
    outputDoc = await checkAllBannerContent(
      outputDoc,
      banners,
      redirectPaths,
      siteUrl,
      getLiveAssociatedCategoryBanners
    );
    output("category", outputDoc);
  } catch (err) {
    console.log(err);
  }
};
exportCats();
