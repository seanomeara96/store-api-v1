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
exports.getFilters = void 0;
/**
 * gets filters of a product by id
 * @param {number} productId
 * @returns
 */
const getFilters = (productId) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield require("../../config/config").store.get(`/catalog/products/${productId}/custom-fields`);
        resolve({ product_id: productId, filters: response.data.data });
    }
    catch (err) {
        reject(err);
    }
}));
exports.getFilters = getFilters;
