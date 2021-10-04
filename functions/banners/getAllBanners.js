const { getAll } = require("../utils/getAll");
/**
 * requires v2
 */
exports.getAllBanners = getAll("/banners");
//getAllBanners().then((res) => res.filter());
