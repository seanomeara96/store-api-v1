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
exports.removeFilter = void 0;
const removeFilter = (productId, name, value) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    if (name == "" || value == "")
        return reject("please provide a key & a value");
    try {
        const filters = yield require("./getFilters")(productId);
        const filterToDelete = filters.find((filter) => filter.name === name && filter.value === value);
        require("../config/config").store
            .delete(`/catalog/products/${productId}/custom-fields/${filterToDelete.id}`)
            .then(resolve)
            .catch((err) => {
            console.log(err);
            return reject("something went wrong while deleting this filter");
        });
    }
    catch (err) {
        console.log(err);
        return reject("error fetching this products filters");
    }
}));
exports.removeFilter = removeFilter;
