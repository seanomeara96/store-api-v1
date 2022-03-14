const { setVisibilityOfMany } = require("./functions/products/setVisibilityOfMany");

const store = "ih";
require("./config/config").config(store);
const products = [{"Product ID":4141},
{"Product ID":4142},
{"Product ID":4143},
{"Product ID":4144},
{"Product ID":4145},
{"Product ID":4146},
{"Product ID":4147},
{"Product ID":4148},
{"Product ID":4149},
{"Product ID":4150},
{"Product ID":4151},
{"Product ID":4152},
{"Product ID":4153},
{"Product ID":4154},
{"Product ID":4155},
{"Product ID":4156},
{"Product ID":4157},
{"Product ID":4158},
{"Product ID":4159},
{"Product ID":4160},
{"Product ID":4161},
{"Product ID":4162}]
function main (){
  setVisibilityOfMany(products, true).then(console.log).catch(console.log)
}

main();