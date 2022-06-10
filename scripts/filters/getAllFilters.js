const { getFilters } = require("../../functions/filters/getFilters");
const { getAllProducts } = require("../../functions/products/getAllProducts");

require("../../config/config").config("bf");

(async function(){

    const products = await getAllProducts();

    const promises = products.map((product)=>getFilters(product.id));

    const res = await Promise.allSettled(promises);

    console.log(res)


})()