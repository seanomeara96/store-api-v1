const {getAll} = require("../utils/getAll")
const getAllRedirects = getAll("/storefront/redirects")
    
exports.getAllRedirects = getAllRedirects