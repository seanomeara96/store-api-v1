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
exports.removeCategoryFromProductsInCategory = void 0;
const getAllProducts_1 = require("./getAllProducts");
const removeCatFromProduct_1 = require("./removeCatFromProduct");
function filterProductsInCat(products, categoryId) {
    return products.filter((product) => product.categories.includes(categoryId));
}
function mapProductIds(products) {
    return products.map((product) => product.id);
}
function removeCategoryFromProductsInCategory(categoryId, suppliedProducts) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (typeof categoryId !== "number") {
                return reject("id must be number");
            }
            const queryParam = {
                "categories:in": categoryId,
            };
            const products = suppliedProducts
                ? suppliedProducts.filter((p) => p.categories.includes(categoryId))
                : yield (0, getAllProducts_1.getAllProducts)(queryParam);
            if (!products)
                return reject("somehting went wrong");
            if (!products.length)
                return resolve(products.length); // category is already empty
            const producsInCat = filterProductsInCat(products, categoryId);
            const productIds = mapProductIds(producsInCat);
            console.log(`${productIds.length} to remove`);
            for (let x = 0; x < productIds.length; x += 25) {
                console.log(`removing ${x} - ${x + 25}...`);
                yield Promise.all(productIds
                    .slice(x, x + 25)
                    .map((id) => (0, removeCatFromProduct_1.removeCatFromProduct)(id, categoryId)));
                console.log(`removed ${x} - ${x + 25}`);
            }
            const productsInCatAfterClean = yield (0, getAllProducts_1.getAllProducts)(queryParam);
            const productCount = productsInCatAfterClean.length;
            if (productCount) {
                reject("failed to remove all products");
                return;
            }
            resolve(productCount);
        }
        catch (err) {
            reject(err);
        }
    }));
}
exports.removeCategoryFromProductsInCategory = removeCategoryFromProductsInCategory;
