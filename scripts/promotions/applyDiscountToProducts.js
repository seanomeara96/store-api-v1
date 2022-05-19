require("../../config/config").config("bf");
const { getProductById } = require("../../functions/products/getProductById");
const { updateProduct } = require("../../functions/products/updateProduct");
const { getPrices, percentageDiscount } = require("./utils");
const products = [
  { "Product ID": 4542 },
  { "Product ID": 4543 },
  { "Product ID": 4544 },
  { "Product ID": 4545 },
  { "Product ID": 4546 },
];

function applyDiscount(id, discountFn, discount) {
  return new Promise(async function (resolve, reject) {
    const product = await getProductById(id).catch(reject);
    const prices = getPrices(product, discountFn, discount);
    // return 
    const updateReponse = await updateProduct(id, {
      sale_price: prices.promo_price,
    }).catch(reject);
    resolve(updateReponse);
  });
}

async function applyDiscountToMany(products, discountFn, discount) {
  const promises = products.map((id) =>
    applyDiscount(Object.values(id)[0], discountFn, discount)
  );

  const res = await Promise.allSettled(promises);

  console.log(res);
}

applyDiscountToMany(products, percentageDiscount, 0.15);
