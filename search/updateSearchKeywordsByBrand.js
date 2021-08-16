require("../config/config").config("bf")
const { getProductsByBrand } = require("../products/getProductsByBrand");
const { updateSearchKeywords } = require("./updateSearchKeywords");
const updateSearchKeywordsByBrand = (brandName, searchKeywordsToAdd) => {
  return new Promise((resolve, reject) => {
    getProductsByBrand(brandName)
      .then((products) => {
        let promises = [];
        products.forEach((product) => {
          promises.push(updateSearchKeywords(product.id, searchKeywordsToAdd));
        });
        Promise.allSettled(promises).then(resolve).catch(reject);
      })
      .catch(reject);
  });
};

exports.updateSearchKeywordsByBrand = updateSearchKeywordsByBrand;
let brand = "Kerastase";
let keywords = ["Ketastase"]
updateSearchKeywordsByBrand(brand, keywords).then(console.log).catch(console.log)