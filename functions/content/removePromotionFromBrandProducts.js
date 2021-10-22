"use strict";
const { getProductsByBrand } = require("../products/getProductsByBrand");
const { removePromotion } = require("./removePromotion");
/**
 * removes thos gwp promotions from product content
 * @param {string} brandName
 * @returns
 */
const removePromotionFromBrandProducts = (brandName) =>
  new Promise((resolve, reject) => {
    let promises = [];
    getProductsByBrand(brandName)
      .then((products) => {
        products.forEach(({ id }) => {
          promises.push(removePromotion(id));
        });
        Promise.allSettled(promises)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });

exports.removePromotionFromBrandProducts = removePromotionFromBrandProducts;
