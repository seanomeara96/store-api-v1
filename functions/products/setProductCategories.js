"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProductCategories = void 0;
const updateProduct_1 = require("./updateProduct");
function setProductCategories(product_id, product_cats) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof product_id !== "number") {
                    throw `id must be a number`;
                }
                if (!product_cats.length) {
                    throw `must supply at least one category`;
                }
                if (!Array.isArray(product_cats)) {
                    throw `must supply an arrayof ids`;
                }
                for (const cat_id of product_cats) {
                    if (typeof cat_id !== "number") {
                        throw `category ids must all be numbers`;
                    }
                }
                const res = yield (0, updateProduct_1.updateProduct)(product_id, {
                    categories: product_cats
                });
                resolve(res);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.setProductCategories = setProductCategories;
