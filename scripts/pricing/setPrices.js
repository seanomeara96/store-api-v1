const { updateProduct } = require("../../functions/products/updateProduct");

require("../../config/config").config("bf");

const prices = [{"Product ID":3404,"Sale Price":22},
{"Product ID":5332,"Sale Price":32.5},
{"Product ID":5253,"Sale Price":20.3},
{"Product ID":1772,"Sale Price":42.99},
{"Product ID":3156,"Sale Price":27.5},
{"Product ID":3455,"Sale Price":54},
{"Product ID":3451,"Sale Price":44},
{"Product ID":222,"Sale Price":40.1},
{"Product ID":5920,"Sale Price":34.95},
{"Product ID":6334,"Sale Price":139},
{"Product ID":5795,"Sale Price":93.8},
{"Product ID":4312,"Sale Price":24}];

(async () => {
  for (const i of prices) {
    await updateProduct(i["Product ID"], {
      sale_price: i["Sale Price"],
    }).catch((err) => {
      console.log(err);
      throw new Error(err);
    });
    console.log(`updated ${i["Product ID"]}...`);
  }
  console.log("done");
})();
