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
exports.deleteCategory = void 0;
const getCategory_1 = require("./getCategory");
const createRedirect_1 = require("../redirects/createRedirect");
function deleteCategory(category_id) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield (0, getCategory_1.getCategory)(category_id);
                if (!category)
                    return reject("no matching category");
                yield (0, createRedirect_1.createRedirect)(category.custom_url.url, "/");
                yield require("../../config/config").store.delete(`/catalog/categories/${category_id}`);
                resolve(`successfully deleted ${category.name}`);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.deleteCategory = deleteCategory;
