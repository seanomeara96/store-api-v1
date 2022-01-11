const { deleteManyProducts } = require("../../functions/products/deleteManyProducts");


require("../../config/config").config("ih");


const products = [{"Product ID":4082},
{"Product ID":4083},
{"Product ID":4084},
{"Product ID":4085},
{"Product ID":4086},
{"Product ID":4087},
{"Product ID":4088},
{"Product ID":4089},
{"Product ID":4090},
{"Product ID":4091},
{"Product ID":4092},
{"Product ID":4093},
{"Product ID":4094},
{"Product ID":4095},
{"Product ID":4096}]


deleteManyProducts(products).then(console.log).catch(console.log)