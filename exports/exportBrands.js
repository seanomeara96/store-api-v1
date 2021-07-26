const api = require("../config/config");
const initials = "bf";
api.config(initials);
const { getAllBrands } = require("../brands/getAllBrands");
const { getAllProducts } = require("../products/getAllProducts");
const {getAllRedirects} = require("../redirects/getAllRedirects");
const output = require("./utils/output");
const {getSiteUrl} = require("../utils/getSiteUrl")
const axios = require("axios")
getAllRedirects().then(redirects => {
  getSiteUrl().then(siteUrl => {
    getAllProducts()
    .then((products) => {
      getAllBrands()
        .then((brand_res) => {
          api.config(initials, 2);
          const { getAllBanners } = require("../banners/getAllBanners");
          getAllBanners()
            .then((banner_res) => {
              let brands = brand_res.map((brand) => {
                // brands doc gets modified here and outputted
  
                /**
                 * array of banners associated with this brand
                 */
                let brand_content = banner_res.filter(
                  (element) => parseInt(element.item_id) === brand.id
                );
  
                let containsRedirects = false;
                let containsBrokenUrls = false;
                let redirectedUrls = [];
                let brokenUrls = [];
  
                // if there is banner(s)
                if(brand_content.length > 0){
                  // forEach banner replace var with siteURL
                  brand_content.map(banner => {
                    banner.content = banner.content.replace(/%%GLOBAL_ShopPathSSL%%/gi, siteUrl)
                    return banner
                  });
  
                  // foreach banner // find all urls // create array
                  let bannerUrls = []
                  brand_content.forEach(banner => {
                    let urls = banner.content.match(/"(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"/gi) || [];
                    //console.log("urls", urls)
                    urls = urls.map(url => url.slice(1,-1))
                    bannerUrls.push({bannerId: banner.id, bannerName: banner.name, urls})
                  })
  
                  
                  // test all urls
                  bannerUrls.forEach(bannerUrl => {
                    let redirUrls = [];
                    let brokeUrls = [];
                    bannerUrl.urls.forEach(url => {
                      // make sure url is a store url
                      // if yes then just get the slug
                      // first check if urls are contained in the redirect document
                      if(url.startsWith(siteUrl) && redirects.filter(red => red.from_path === url.replace(siteUrl,"")).length){
                        // if true then contains redirects == true
                        containsRedirects = true;
                      // badurls.push url
                      redirUrls.push(url)
                      } else {
                         // else test with axios
                      axios.get(url).then(response => {
                        console.log("axios request "+url)
                        // if 301s > 0 "contains redirects" == true && foreach redirectedUrls push url
                        //console.log(response.request._redirectable._redirectCount)
                        if(response.request._redirectable._redirectCount > 0){
                          containsRedirects = true;
                          redirUrls.push(url)
                        }
                      }).catch(err => {if(err.response.status === 404){
                        console.log(404)
                        containsBrokenUrls = true;
                        brokeUrls.push(url)
                      }})
                      }
                    })
                    redirectedUrls.push({...bannerUrl, redirUrls, brokeUrls})
                  })
                  
                }
                if (brand_content.length < 1) {
                  brand_content = "FALSE";
                } else if (brand_content.length > 1) {
                  brand_content = `${brand_content.length} banners`;
                } else if (brand_content.length === 1) {
                  brand_content = "TRUE";
                } else {
                  brand_content = "Something went wrong";
                }
                let brandProducts = products.filter(
                  (product) => product.brand_id === brand.id
                );
                let brandProductsInStock = brandProducts.filter(
                  (product) => product.inventory_level > 0
                );
                return {
                  ID: brand.id,
                  "Brand Name": brand.name,
                  "Has Page Title": brand.page_title ? "TRUE" : "FALSE",
                  "Has Meta Description": brand.meta_description
                    ? "TRUE"
                    : "FALSE",
                  "Has Content": brand_content,
                  "Contains Redirects": containsRedirects ? "TRUE" : "FALSE",
                  "Contains Broken Links": containsBrokenUrls ? "TRUE" : "FALSE",
                  "No. of Redirected URLs":redirectedUrls.redirUrls.length,
                  "No. of Broken URLs": brokenUrls.brokeUrls.length,
                  "301 URLS": redirectedUrls,
                  "404 URLs": brokenUrls,
                  Products: brandProducts.length,
                  "Products In Stock": brandProductsInStock.length,
                  "Page Title": brand.page_title,
                  "Page Title Length": brand.page_title
                    ? brand.page_title.length
                    : 0,
                  "Meta Description": brand.meta_description,
                  "Meta Description Length": brand.meta_description
                    ? brand.meta_description.length
                    : 0,
                  URL: brand.custom_url.url,
                  "Brand Logo": brand.image_url,
                  "Meta Keywords": brand.meta_keywords.join(" "),
                  "Search Keywords": brand.search_keywords,
                };
              });
              output("brand", brands);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  
  }).catch(err => {
    console.log(err)
  })
  
}).catch(err => console.log(err))