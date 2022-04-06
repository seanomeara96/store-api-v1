"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = void 0;
const getAll_1 = require("../utils/getAll");
/**
 * requires version 2
 */
exports.getAllOrders = (0, getAll_1.getAll)("/orders");
