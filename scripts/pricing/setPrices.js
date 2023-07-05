const { updateProduct } = require("../../functions/products/updateProduct");

require("../../config/config").config("bf");

const prices = [
  {
    id: 4197,
    name: "Health & Her Perimenopause Multi-Symptom Supplement (60 Capsules)",
    sku: 11445,
    price: 24.99,
    cost_price: 13.62,
    sale_price: 18.99,
    margin: 0.117819905,
  },
  {
    id: 4198,
    name: "Health & Her Menopause Supplement (60 Capsules)",
    sku: 11446,
    price: 25,
    cost_price: 10.9,
    sale_price: 14.99,
    margin: 0.105603736,
  },
  {
    id: 4199,
    name: "Health & Her Self Heat Face Mask (7 Pack)",
    sku: 11447,
    price: 15,
    cost_price: 6.54,
    sale_price: 8.99,
    margin: 0.105205784,
  },
  {
    id: 4200,
    name: "Health & Her Aromatherapy Sleep Balm 40g",
    sku: 11448,
    price: 12,
    cost_price: 5.22,
    sale_price: 7.99,
    margin: 0.196420526,
  },
  {
    id: 4201,
    name: "Health & Her PMS Multi-Symptom",
    sku: 11449,
    price: 25,
    cost_price: 13.62,
    sale_price: 18.99,
    margin: 0.117819905,
  },
  {
    id: 4202,
    name: "Health & Her Perimenopause Mind +",
    sku: 11450,
    price: 24.99,
    cost_price: 13.62,
    sale_price: 18.99,
    margin: 0.117819905,
  },
  {
    id: 4203,
    name: "Health & Her Sleep Supplement",
    sku: 11451,
    price: 25,
    cost_price: 10.9,
    sale_price: 14.99,
    margin: 0.105603736,
  },
];

(async () => {
  for (const i of prices) {
    await updateProduct(i.id, {
      sale_price: i.sale_price,
    }).catch((err) => {
      console.log(err);
      throw new Error(err);
    });
    console.log(`updated ${i["Product ID"]}...`);
  }
  console.log("done");
})();
