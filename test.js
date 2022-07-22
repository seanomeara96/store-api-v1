require("./config/config").config("bf");

const { getAllProducts } = require("./functions/products/getAllProducts");

getAllProducts({"categories:in": 702}).then(res => console.log(res.map(p => p.id)))
