const { getAll } = require("../utils/getAll");
/**
 * must use version 2 api
 */
const getAllCoupons = getAll("/coupons");
// export module
exports.getAllCoupons = getAllCoupons;
