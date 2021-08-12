const store = "bf";
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
const {
  replaceUrlVarsWithSiteUrl,
} = require("./utils/replaceUrlVarsWithSiteUrl");
const { getLinksArray } = require("./utils/getLinksArray");
const { checkAllCatDescriptions } = require("./utils/checkAllCatDescriptions");
const exportCats = async () => {
  try {
    /**
     * all site base domain url
     */
    const siteUrl = await getSiteUrl();
    /**
     * all store products
     */
    const products = await getAllProducts();
    /**
     * all store categories
     */
    const categories = await getAllCategories();
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
    /**
     * all store banners
     */
    const banners = await getAllBanners();
    // create inital document shape
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
        "#Des. 404s":0, // default value
        "Is Visible": booleanString(cat.is_visible),
        "Has Banner": null, // default value
        "Banner(s) Live": null, // default value
        "Banner 301s": null, // default value
        "Banner 404s": null, // default value
        Products: null, // default value
        "Products In Stock": null, // default value
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

    // add additional content information
    outputDoc.forEach((cat) => {
      cat["Has Banner"] = booleanString(
        getAssociatedCategoryBanners(banners, cat.ID).length
      );
      cat["Banner(s) Live"] = getLiveAssociatedCategoryBanners(
        banners,
        cat.ID
      ).length;
    });

    outputDoc = await checkAllCatDescriptions(
      outputDoc,
      redirectPaths,
      siteUrl
    );
    /**
     * outputDoc = await checkAllBannerContent(
      outputDoc,
      banners,
      redirects,
      siteUrl
    );
     */

    console.log(outputDoc[0]);
    //output("category", outputDoc);
  } catch (err) {
    console.log(err);
  }
};
exportCats();
