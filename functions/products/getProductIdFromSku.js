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
exports.getProductIdFromSku = void 0;
function getProductIdFromSku(sku) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield require("../../config/config").store.get("/catalog/variants", {
                    params: { sku },
                });
                if (!res.data.data.length) {
                    throw "no matching variants";
                }
                resolve(res.data.data[0].product_id);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.getProductIdFromSku = getProductIdFromSku;
