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
const getAllProducts_1 = require("../../functions/products/getAllProducts");
const getProductVariants_1 = require("./getProductVariants");
function getStoreSKUs(interval) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const products = yield (0, getAllProducts_1.getAllProducts)();
        const variants = [];
        const batches = [];
        for (let i = 0; i < products.length; i += interval) {
            batches.push(products.slice(i, i + interval));
        }
        for (const batch of batches) {
            const promises = batch.map((product) => (0, getProductVariants_1.getProductVariants)(product.id));
            const responses = yield Promise.allSettled(promises);
            if (responses.filter((response) => response.status === "rejected").length)
                return reject("requests for variants was rejected");
            const productVariants = responses.filter((response) => response.status === "fulfilled").map((response) => response.value);
            variants.push(...productVariants);
        }
        const variantSKUs = variants.flat();
        resolve(variantSKUs);
    }));
}
exports.default = getStoreSKUs;
