"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteManyProducts = void 0;
const deleteProduct_1 = require("./deleteProduct");
const deleteManyProducts = (idObjects) => new Promise((resolve, reject) => {
    const ids = idObjects.map((id) => Object.values(id)[0]);
    const promises = ids.map((id) => (0, deleteProduct_1.deleteProduct)(id));
    Promise.allSettled(promises).then(resolve).catch(reject);
});
exports.deleteManyProducts = deleteManyProducts;
