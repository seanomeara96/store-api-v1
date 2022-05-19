const { getAllProducts } = require("../../functions/products/getAllProducts");
const { updateProduct } = require("../../functions/products/updateProduct");
const { getPrices, percentageDiscount } = require("./utils");
require("../../config/config").config("bf");

async function main(brand_id) {
  const products = await getAllProducts({ brand_id: brand_id }).catch(
    console.log
  );

  const prices = products.map((el) => getPrices(el, percentageDiscount, 0.2));

  console.log(prices);
  
  const promises = prices.map((price) =>
    updateProduct(price.id, { sale_price: price.promo_price })
  );

  const responses = await Promise.allSettled(promises);

  console.log(responses);
}

main(139);