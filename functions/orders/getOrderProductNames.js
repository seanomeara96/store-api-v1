"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderProductNames = void 0;
const getOrderProducts_1 = require("./getOrderProducts");
const getOrderProductNames = (order) => new Promise((resolve, reject) => {
    (0, getOrderProducts_1.getOrderProducts)(order)
        .then((e) => resolve(e.map((g) => g.name)))
        .catch(reject);
});
exports.getOrderProductNames = getOrderProductNames;
