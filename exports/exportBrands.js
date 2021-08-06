const api = require("../config/config");
const initials = "bf";
api.config(initials);
const { getAllBrands } = require("../brands/getAllBrands");
const { getAllProducts } = require("../products/getAllProducts");
const { getAllRedirects } = require("../redirects/getAllRedirects");
const output = require("./utils/output");
const { getSiteUrl } = require("../utils/getSiteUrl");
const { booleanString } = require("./utils/booleanString");
const {
  getAssociatedBrandBanners,
  getLiveAssociatedBrandBanners,
} = require("./utils/getAssociatedBanners");
const { getLinksArray } = require("./utils/getLinksArray");
const {
  replaceUrlVarsWithSiteUrl,
} = require("./utils/replaceUrlVarsWithSiteUrl");
const { testBanners } = require("./utils/testBanners");
/**
 * @param {any} x
 * @returns true / false as string
 */
const exportBrands = async () => {
  try {
    /**
     * all site base domain url
     */
    const siteUrl = await getSiteUrl();
    /**
     * all store brands
     */
    const brands = await getAllBrands();
    /**
     * all store products
     */
    const products = await getAllProducts();
    /**
     * all store redirects
     */
    const redirects = await getAllRedirects();
    /**
     * just the slugs
     */
    const redirectPaths = redirects.map(({ from_path }) => from_path);
    // require get all banners
    api.config(initials, 2);
    const { getAllBanners } = require("../banners/getAllBanners"); // marketing -> banners is still in v2

    /**
     * all store banners
     */
    const banners = await getAllBanners();
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
    outputDoc.forEach((brand) => {
      let brandProducts = products.filter(
        (product) => product.brand_id === brand.ID
      );
      let brandProductsInStock = brandProducts.filter(
        (product) => product.inventory_level > 0
      );
      brand["Products"] = brandProducts.length.toString();
      brand["Products In Stock"] = brandProductsInStock.length.toString();
    });

    // add brand banner details
    outputDoc.forEach((brand) => {
      // gets banners associated with brand
      let brandBanners = getAssociatedBrandBanners(banners, brand.ID);
      brand["Has Content"] = booleanString(brandBanners.length);
      let liveBrandBanners = getLiveAssociatedBrandBanners(banners, brand.ID);
      if (liveBrandBanners.length)
        brand["No. of live banners"] = liveBrandBanners.length;
    });

    function checkAllBrandContent(brandsDoc) {
      return new Promise((resolve, reject) => {
        let promises = [];
        brandsDoc.forEach((brandItem) => {
          promises.push(checkBrandContent(brandItem));
        });
        Promise.allSettled(promises)
          .then((responses) => {
            responses
              .filter(({ status }) => status === "fulfilled")
              .forEach((response) => {
                let { value } = response;
                let { linkData } = value;
                let redirs = [];
                linkData.forEach((banner) =>
                  redirs.push({
                    "Banner Id": banner["Banner Id"],
                    "301 URLs": banner["301 URLs"],
                  })
                );
                let broken = [];
                linkData.forEach((banner) =>
                  broken.push({
                    "Banner Id": banner["Banner Id"],
                    "404 URLs": banner["404 URLs"],
                  })
                );

                const noOfRedirs =
                  redirs.length > 1
                    ? redirs.reduce(
                        (a, b) => a["301 URLs"].length + b["301 URLs"].length
                      )
                    : redirs[0]["301 URLs"].length;

                const noOfBrokeUrls =
                  broken.length > 1
                    ? broken.reduce(
                        (a, b) => a["404 URLs"].length + b["404 URLs"].length
                      )
                    : broken[0]["404 URLs"].length;

                let brandToUpdate = outputDoc.find(
                  (brand) => brand.ID === response.value.brandId
                );
                brandToUpdate["301 URLs"] = redirs;
                brandToUpdate["404 URLs"] = broken;
                brandToUpdate["No. of Redirected URLs"] = noOfRedirs;
                brandToUpdate["No. of Broken URLs"] = noOfBrokeUrls;
                brandToUpdate["Contains Redirects"] = booleanString(noOfRedirs);
                brandToUpdate["Contains Broken Links"] =
                  booleanString(noOfBrokeUrls);
              });
            resolve();
          })
          .catch(reject);
      });
    }

    // recursive async funtions I think are the solution here

    function checkBrandContent(brand) {
      return new Promise(async (resolve, reject) => {
        const currentBrand = brand;
        const liveBanners = getLiveAssociatedBrandBanners(
          banners,
          currentBrand.ID
        );

        if (!liveBanners.length) {
          reject("No Associated Live Banners");
        }

        // replace store url var with siteUrl
        liveBanners.forEach(
          (liveBanner) =>
            (liveBanner.content = replaceUrlVarsWithSiteUrl(
              liveBanner.content,
              siteUrl
            ))
        );

        // create an array of links on each banner doc
        liveBanners.forEach(
          (liveBanner) =>
            (liveBanner.links = getLinksArray(liveBanner.content, siteUrl))
        );

        let linkData = null;

        if (liveBanners.length) {
          try {
            linkData = await testBanners(liveBanners, redirectPaths, siteUrl);
            if (linkData.length) {
              resolve({ brandId: currentBrand.ID, linkData });
            } else {
              reject();
            }
          } catch (err) {
            console.log(err);
            reject();
          }
        }
      });
    }

    await checkAllBrandContent(outputDoc);
    output("brand", outputDoc);
  } catch (err) {
    console.log(err);
  }
};
exportBrands();
module.exports = exportBrands;
