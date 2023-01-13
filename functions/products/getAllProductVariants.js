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
function getAllProductVariants(batchSize = 50) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let count = 0;
                const products = (yield (0, getAllProducts_1.getAllProducts)());
                const batches = [];
                const allVariants = [];
                for (let x = 0; x < products.length; x += batchSize) {
                    batches.push(products.slice(x, x + batchSize));
                }
                for (const productBatch of batches) {
                    const promises = [];
                    for (const product of productBatch) {
                        console.clear();
                        console.log(`fetching product variants ${count}/${products.length}`);
                        promises.push((0, getProductVariants_1.getProductVariants)(product.id));
                        count++;
                    }
                    const batchVars = yield Promise.all(promises);
                    allVariants.push(...batchVars.flat());
                }
                resolve(allVariants);
            }
            catch (err) {
                console.log(err);
                reject(err);
            }
        });
    });
}
exports.getAllProductVariants = getAllProductVariants;
/**
 * const product = products[x];
        const variants = (await getProductVariants(product.id)) as any[];
        allVariants.push(...variants);
        console.clear();
        
 */
