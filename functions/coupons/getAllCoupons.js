"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCoupons = void 0;
const getAll_1 = require("../utils/getAll");
/**
 * must use version 2 api
 */
exports.getAllCoupons = (0, getAll_1.getAll)("/coupons");
