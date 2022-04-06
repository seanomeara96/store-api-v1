"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryIdByName = void 0;
const getCategoryByName_1 = require("./getCategoryByName");
const getCategoryIdByName = (name) => new Promise((resolve, reject) => (0, getCategoryByName_1.getCategoryByName)(name)
    .then((i) => resolve(i.id))
    .catch((err) => reject(err)));
exports.getCategoryIdByName = getCategoryIdByName;
