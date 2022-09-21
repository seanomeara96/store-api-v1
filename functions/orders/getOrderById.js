"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = void 0;
/**
 * @param {number} order_id
 * @returns order json
 */
const getOrderById = (order_id) => new Promise((resolve, reject) => require("../../config/config")
    .store.get(`/orders/${order_id}`)
    .then((response) => resolve(response.data))
    .catch((ex) => reject(ex.response)));
exports.getOrderById = getOrderById;
