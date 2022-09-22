"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductVariantOptions = void 0;
const getAllProductVariantOptions = (product_id) => new Promise((resolve, reject) => require("../../config/config").store.get(`/catalog/products/${product_id}/options`).then((res) => resolve(res.data.data)).catch(reject));
exports.getAllProductVariantOptions = getAllProductVariantOptions;
