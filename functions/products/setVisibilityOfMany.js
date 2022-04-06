"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setVisibilityOfMany = void 0;
const productIsVisible_1 = require("./productIsVisible");
/**
 * set visibility of many products to either true (visible) or false (not visible)
 * @param {object[]} productIds
 * @param {boolean} is_visible
 * @returns promise
 */
const setVisibilityOfMany = (productIds, is_visible) => new Promise((resolve, reject) => Promise.allSettled(productIds.map((i) => (0, productIsVisible_1.productIsVisible)(Object.values(i)[0], is_visible)))
    .then(resolve)
    .catch(reject));
exports.setVisibilityOfMany = setVisibilityOfMany;
