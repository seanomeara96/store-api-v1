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
exports.applyFilter = void 0;
/**
 * applies a field (name) and value to a product by id
 * @param {number} productId
 * @param {string} name
 * @param {string} value
 * @returns
 */
const applyFilter = (productId, name, value) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        name,
        value,
    };
    try {
        const { status } = yield require("../../config/config").store.post(`/catalog/products/${productId}/custom-fields`, data);
        resolve(status);
    }
    catch (err) {
        reject(err);
    }
}));
exports.applyFilter = applyFilter;
