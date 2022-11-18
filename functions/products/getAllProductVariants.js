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
exports.getAllProductVariants = void 0;
const getProductVariants_1 = require("./getProductVariants");
const getAllProducts_1 = require("./getAllProducts");
function getAllProductVariants() {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            const allVariants = [];
            const products = (yield (0, getAllProducts_1.getAllProducts)().catch(reject));
            for (let x = 0; x < products.length; x++) {
                const product = products[x];
                const variants = (yield (0, getProductVariants_1.getProductVariants)(product.id).catch(reject));
                allVariants.push(...variants);
                console.clear();
                console.log(`${x}/${products.length}`);
            }
            resolve(allVariants);
        });
    });
}
exports.getAllProductVariants = getAllProductVariants;
