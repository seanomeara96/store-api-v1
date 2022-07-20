"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductIdByName = void 0;
const getProductByName_1 = require("./getProductByName");
const getProductIdByName = (name) => {
    return new Promise((resolve, reject) => {
        if (typeof name !== "string")
            return reject("type of name must be a string");
        (0, getProductByName_1.getProductByName)(name)
            .then((res) => resolve((res.id || res)))
            .catch(reject);
    });
};
exports.getProductIdByName = getProductIdByName;
