const api = require("../config/config");
const initials = "bf";
api.config(initials);
const { getAllBrands } = require("../brands/getAllBrands");
const { getAllProducts } = require("../products/getAllProducts");
const { getAllRedirects } = require("../redirects/getAllRedirects");
const output = require("./utils/output");
const { getSiteUrl } = require("../utils/getSiteUrl");
const axios = require("axios");
/**
 * @param {any} x
 * @returns true / false as string
 */
function booleanString(x) {
  if (x) {
    return "TRUE";
  } else {
    return "FALSE";
  }
}
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
        "Has Content": null, // default
        "No. of live banners": null, // default
        "Contains Redirects": null,
        "Contains Broken Links": null,
        "No. of Redirected URLs": null,
        "No. of Broken URLs": null,
        Products: null,
        "Products In Stock": null,
        "301 URLs": null,
        "404 URLs": null,
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
      console.log(brandProductsInStock.length);
      brand["Products In Stock"] = brandProductsInStock.length.toString();
    });

    // returns an array of banners associated with a brand
    function getAssociatedBrandBanners(brandId) {
      return banners.filter((banner) => parseInt(banner.item_id) === brandId);
    }
    function getLiveAssociatedBrandBanners(brandId) {
      return getAssociatedBrandBanners(brandId).filter(
        (banner) => banner.visible === "1"
      );
    }

    // add brand banner details
    outputDoc.forEach((brand) => {
      // gets banners associated with brand
      let brandBanners = getAssociatedBrandBanners(brand.ID);
      brand["Has Content"] = booleanString(brandBanners.length);
      let liveBrandBanners = getLiveAssociatedBrandBanners(brand.ID);
      if (liveBrandBanners.length)
        brand["No. of live banners"] = liveBrandBanners.length;
    });

    /**
     *
     * @param {string} link
     * @returns status of link + link
     */
    function testBannerLink(link) {
      return new Promise((resolve, reject) => {
        if (typeof link !== "string") return reject("link must be a string");
        if (
          link.startsWith(siteUrl) &&
          redirects.filter((red) => red.from_path === link.replace(siteUrl, ""))
            .length
        ) {
          resolve({ status: 301, link: link });
        } else {
          axios
            .get(link)
            .then((response) => {
              if (response.request._redirectable._redirectCount > 0) {
                resolve({ status: 301, link: link });
              } else {
                resolve({ status: 200, link: link });
              }
            })
            .catch((err) => {
              if (err.response.status === 404) {
                resolve({ status: 404, link: link });
              } else {
                reject({
                  status: err.response.status,
                  errMessage: "something went wrong while testing a link",
                });
              }
            });
        }
      });
    }
    /**
     *
     * @param {string[]} linksArray
     * @param {*} bannerId
     * @returns
     */
    function testBannerLinks(linksArray, bannerId) {
      return new Promise((resolve, reject) => {
        if (!linksArray.length) return reject("no links");
        let requests = [];
        linksArray.forEach((link) => {
          requests.push(testBannerLink(link));
        });
        Promise.allSettled(requests)
          .then((responses) => {
            let testedBannerLinks = {
              "Banner Id": bannerId,
              "301 URLs": [],
              "404 URLs": [],
            };
            let rejectedLinks = [];
            responses.forEach((response) => {
              if (response.status === "fulfilled") {
                if (response.value.status === 301) {
                  testedBannerLinks["301 URLs"].push(response.value.link);
                } else if (response.value.status === 404) {
                  testedBannerLinks["404 URLs"].push(response.value.link);
                } else {
                  return;
                }
              } else {
                // response was rejected
                rejectedLinks.push(response.reason);
              }
            });
            console.log(`${rejectedLinks.length} links failed to be tested`);
            resolve(testedBannerLinks);
          })
          .catch((err) => {
            console.log("something went wrong in test banner links", err);
            reject("something went wrong in test banner links");
          });
      });
    }
    function testBanners(bannersArray) {
      return new Promise((resolve, reject) => {
        let promises = [];
        bannersArray.forEach((banner) => {
          promises.push(testBannerLinks(banner.links, banner.id));
        });
        Promise.allSettled(promises)
          .then((responses) => {
            let liveBrandLinks = [];
            responses.forEach((response) => {
              if (response.status === "fulfilled") {
                liveBrandLinks.push(response.value);
              }
            });
            resolve(liveBrandLinks);
          })
          .catch((err) => {
            console.log("error in test banners", err);
            reject(err);
          });
      });
    }

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

        const liveBanners = getLiveAssociatedBrandBanners(currentBrand.ID);
        if (!liveBanners.length) {
          reject();
        }

        // replace store url var with siteUrl
        liveBanners.forEach((liveBanner) => {
          liveBanner.content = liveBanner.content.replace(
            /%%GLOBAL_ShopPathSSL%%/gi,
            siteUrl
          );
        });

        // create an array of links on each banner doc
        liveBanners.forEach((liveBanner) => {
          let urls =
            liveBanner.content.match(
              /"(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"/gi
            ) || [];
          urls = urls.map((url) => url.slice(1, -1));
          liveBanner.links = urls;
        });

        let linkData = null;

        if (liveBanners.length) {
          try {
            linkData = await testBanners(liveBanners);
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
    console.log(outputDoc[0]);
    output("brand", outputDoc);
  } catch (err) {
    console.log(err);
  }
}
exportBrands();
module.exports = exportBrands;