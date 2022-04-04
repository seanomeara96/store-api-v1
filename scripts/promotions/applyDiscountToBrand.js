const { getAllProducts } = require("../../functions/products/getAllProducts");
const { updateProduct } = require("../../functions/products/updateProduct");

require("../../config/config").config("bf");

async function main(brand_id) {
  const products = await getAllProducts({ brand_id: brand_id }).catch(
    console.log
  );

  const prices = products.map((el) => ({
    id: el.id,
    retail_price: el.retail_price,
    sale_price: el.sale_price,
    promo_price: el.retail_price - 5,
  }));
  
  console.log(prices);

  const promises = prices.map((price) =>
    updateProduct(price.id, { sale_price: price.promo_price })
  );

  const responses = await Promise.allSettled(promises);

  console.log(responses);
}

main(141);
/*const { getAllProducts } = require("./functions/products/getAllProducts");
const { updateProduct } = require("./functions/products/updateProduct");

require("./config/config").config("bf");

async function main() {
  const fitFlops = await getAllProducts({ brand_id: 21 }).catch(console.log);

  const prices = fitFlops.map((el) => ({
    id: el.id,
    retail_price: el.retail_price,
    sale_price: el.sale_price,
    promo_price: Math.round(el.retail_price * 0.8 * 100) / 100,
  }));

  const promises = prices.map((price) =>
    updateProduct(price.id, { sale_price: price.promo_price })
  );

  const responses = await Promise.allSettled(promises);

  console.log(responses);
}

main();
*/