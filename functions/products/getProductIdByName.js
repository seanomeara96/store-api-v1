"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductIdByName = void 0;
const getProductByName_1 = require("./getProductByName");
const getProductIdByName = (name) => {
    return new Promise((reject, resolve) => (0, getProductByName_1.getProductByName)(name)
        .then(({ id }) => resolve(id))
        .catch(reject));
};
exports.getProductIdByName = getProductIdByName;
