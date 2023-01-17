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
exports.deleteProduct = void 0;
const getBrandById_1 = require("../brands/getBrandById");
const createRedirect_1 = require("../redirects/createRedirect");
const getProductById_1 = require("./getProductById");
const createRelevantRedirect = (product, custom_redirect) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!product) {
            throw "creating redirect requires product object";
        }
        if (custom_redirect) {
            const res = yield (0, createRedirect_1.createRedirect)(product.custom_url.url, custom_redirect);
            return resolve(res);
        }
        if (product.brand_id) {
            const brand = yield (0, getBrandById_1.getBrandById)(product.brand_id);
            const res = yield (0, createRedirect_1.createRedirect)(product.custom_url.url, brand.custom_url.url);
            return resolve(res);
        }
        const res = yield (0, createRedirect_1.createRedirect)(product.custom_url.url, "/");
        return resolve(res);
    }
    catch (err) {
        reject(err);
    }
}));
const deleteProduct = (id, url) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getProductById_1.getProductById)(id)
        .then((product) => {
        require("../../config/config")
            .store.delete(`/catalog/products/${id}`)
            .then(() => {
            createRelevantRedirect(product, url)
                .then(() => resolve(`Successfully deleted ${product.name}`))
                .catch(reject);
        })
            .catch(reject);
    })
        .catch(reject);
}));
exports.deleteProduct = deleteProduct;
