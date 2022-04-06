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
exports.applySortOrderToMany = void 0;
const updateSortOrder_1 = require("./updateSortOrder");
const fulfilledStatus = (a) => a.status === "fulfilled";
const applySortOrderToMany = (productIds, sortOrderNumber) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = productIds.map((doc) => {
        const id = Object.values(doc)[0];
        if (typeof id !== "number")
            return;
        return (0, updateSortOrder_1.updateSortOrder)(id, sortOrderNumber);
    });
    const res = yield Promise.allSettled(promises).catch(reject);
    const total = res.length;
    const fulfilled = res.filter(fulfilledStatus).length;
    resolve(`${fulfilled}/${total} sorted without issues`);
}));
exports.applySortOrderToMany = applySortOrderToMany;
