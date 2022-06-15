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
exports.deleteBrand = void 0;
const getBrandById_1 = require("../brands/getBrandById");
const createRedirect_1 = require("../redirects/createRedirect");
const createRelevantRedirect = (brand) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    if (!brand)
        return reject("creating redirect requires brand object");
    const res = yield (0, createRedirect_1.createRedirect)(brand.custom_url.url, "/brands/").catch(reject);
    return resolve(res);
}));
const deleteBrand = (id) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getBrandById_1.getBrandById)(id)
        .then((brand) => {
        require("../../config/config")
            .store.delete(`/catalog/products/${id}`)
            .then(() => {
            createRelevantRedirect(brand)
                .then(() => resolve(`Successfully deleted ${brand.name}`))
                .catch(reject);
        })
            .catch(reject);
    })
        .catch(reject);
}));
exports.deleteBrand = deleteBrand;
