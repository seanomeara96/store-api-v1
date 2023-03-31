require("../../config/config").config("ih");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const { updateProduct } = require("../../functions/products/updateProduct");
const { getPrices, percentageDiscount } = require("./utils");


(async () => {
  const brand_id = 174;

  const products = await getAllProducts({ brand_id }).catch(
    console.log
  );

  const prices = products.map((el) => getPrices(el, percentageDiscount, 0.15));

  // count products where price != promo price
  console.log(prices.reduce((a,c)=>(c.default_price !== c.promo_price ? a + 1 : a),0));

  for(const price of prices){
    console.log(price.id)
  }
  return
  const promises = prices.map((price) =>
    updateProduct(price.id, { sale_price: price.promo_price })
  );

  const responses = await Promise.allSettled(promises);

  console.log(responses);
})();