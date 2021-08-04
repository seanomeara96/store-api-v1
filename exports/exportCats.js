const store = "bf";
require("../config/config").config(store);
const { getAllCategories } = require("../categories/getAllCategories");
const { getAllProducts } = require("../products/getAllProducts");
const { booleanString } = require("./utils/booleanString");
const output = require("./utils/output");
const exportCats = async () => {
  try {
    const products = await getAllProducts();
    const categories = await getAllCategories();
    require("../config/config").config(store, 2);
    const { getAllBanners } = require("../banners/getAllBanners");
    const banners = await getAllBanners();
    // create inital document shape
    const outputDoc = categories.map((cat) => {
      return {
        ID: cat.id,
        "Parent Id": cat.parent_id,
        Name: cat.name,
        "Has Page Title": booleanString(cat.page_title),
        "Has Meta Description": booleanString(cat.meta_description),
        "Has Content": booleanString(cat.description),
        "Is Visible": booleanString(cat.is_visible),
        "Has Banner": null,
        "Banner(s) Live": null,
        Products: null,
        "Products In Stock": null,
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

    // add additional content information
    outputDoc.forEach((cat) => {
      let associatedBanners = banners.filter(
        (banner) => parseInt(banner.item_id) === cat.id
      );
      cat["Has Banner"] = associatedBanners.length;
      let associatedBannersLive = associatedBanners.filter(
        (banner) => parseInt(banner.visible) === 1
      );
      cat["Banner(s) Live"] = associatedBannersLive.length;
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

    // check links in category description
    let categoryDescriptionLinks;
    outputDoc.forEach(cat => {

    })

    console.log(outputDoc[0]);
    //output("category", outputDoc);
  } catch (err) {
    console.log(err);
  }
};
exportCats();
