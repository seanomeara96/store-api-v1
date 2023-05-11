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
exports.createManyCategories = void 0;
const createCategory_1 = require("./createCategory");
function createManyCategories(categoriesToCreate) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promises = [];
                for (let i = 0; i < categoriesToCreate.length; i++) {
                    const newCategory = categoriesToCreate[i];
                    promises.push((0, createCategory_1.createCategory)(newCategory));
                }
                const res = yield Promise.allSettled(promises);
                resolve(res);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.createManyCategories = createManyCategories;
