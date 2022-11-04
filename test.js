require("./config/config").config("bf");
const { getProductBySKU } = require("./functions/products/getProductBySKU");
const fs = require("fs");
function simplePrint(text, filename="out"){
    fs.writeFile(`${filename}.txt`, text, (err) => {
        if(err) console.log(err);
        console.log("printed")
    })
}


(async () => {
  const skus = [
    { SKU: "7657" },
    { SKU: "10492" },
    { SKU: "10358" },
    { SKU: "MOR_MOISTURE" },
    { SKU: "7180" },
    { SKU: "110631" },
    { SKU: "110700" },
    { SKU: "KER_E022410" },
    { SKU: "11393" },
    { SKU: "12000" },
    { SKU: "11256" },
    { SKU: "9209" },
  ];
  const out = []
  for (const {SKU} of skus) {
    const res = await getProductBySKU(SKU).catch(console.log);
    if(!res.length) {
        console.log(`no products`);
        break;
    }
    if (res.length !== 1) {
        console.log(`multiple products with that sku: ${SKU}`);
        break;
    };
    const product = res[0];
    out.push(product.custom_url.url);

  }
  simplePrint(out.join("\n"));
})();
