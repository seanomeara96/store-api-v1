const { getAll } = require("../utils/getAll");
/**
 * requires version 2
 */
const getAllOrders = getAll("/orders");
exports.getAllOrders = getAllOrders;
