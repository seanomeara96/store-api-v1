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
exports.deleteManyCategories = void 0;
const deleteCategory_1 = require("./deleteCategory");
function deleteManyCategories(category_ids) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ids = category_ids.map((obj) => Object.values(obj)[0]);
                const promises = ids.map((id) => (0, deleteCategory_1.deleteCategory)(id));
                const res = yield Promise.allSettled(promises);
                resolve(res);
            }
            catch (err) {
                reject("error occured at deleteManyCategories");
            }
        });
    });
}
exports.deleteManyCategories = deleteManyCategories;
