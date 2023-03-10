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
exports.getProductBySku = void 0;
const getProductById_1 = require("./getProductById");
const getProductIdFromSku_1 = require("./getProductIdFromSku");
function getProductBySku(sku) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (yield (0, getProductIdFromSku_1.getProductIdFromSku)(sku));
                const product = yield (0, getProductById_1.getProductById)(id);
                resolve(product);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.getProductBySku = getProductBySku;
