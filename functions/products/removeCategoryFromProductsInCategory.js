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
const getAllProducts_1 = require("./getAllProducts");
const removeCatFromProduct_1 = require("./removeCatFromProduct");
const filterProductsInCat = (products, categoryId) => products.filter((product) => product.categories.includes(categoryId));
const mapProductIds = (products) => products.map(({ id }) => id);
const mapPromiseToId = (ids, categoryId) => ids.map((id) => (0, removeCatFromProduct_1.removeCatFromProduct)(id, categoryId));
const removeCategoryFromProductsInCategory = (categoryId) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, getAllProducts_1.getAllProducts)().catch(reject);
    const producsInCat = filterProductsInCat(products, categoryId);
    const productIds = mapProductIds(producsInCat);
    const promises = mapPromiseToId(productIds, categoryId);
    Promise.allSettled(promises).then(resolve).catch(reject);
}));
exports.removeCategoryFromProductsInCategory =
    removeCategoryFromProductsInCategory;
