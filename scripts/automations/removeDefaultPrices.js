require("../../config/config").config("pb");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const { updateProduct } = require("../../functions/products/updateProduct");
const { log } = console;
const productPrices = ({ id, price, retail_price, sale_price }) => {
  return { id, price, retail_price, sale_price };
};
/**
 * returns retail price
 * @param {number} param0
 * @returns
 */
const _price = ({ price }) => price;


/**
 * returns a function that sets a retial price to 0
 * @param {number} param0 product id
 * @returns
 */
const setDefaultPriceToZero = ({ id }) => updateProduct(id, { price: 0 });

/**
 * throws an err
 * @param {err} err
 */
const throwErr = (err) => {
  throw new Error(err);
};

/**
 * resolves with an array of all products with a non-zero retail price
 * @returns
 */
function fetch_prices() {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await getAllProducts();
      // retail price must be zero
      const prices = products.map(productPrices);

      const _prices = prices.filter(_price);
      resolve(_prices);
    } catch (err) {
      reject(err);
    }
  });
}
function fulfillmentStatus (arr){
    return `${arr.reduce(function countIfFulfilled (a,c){
        if(c.status === "fulfilled"){
            return a + 1;
        }
        return a;
    }, 0)}/${arr.length}`
}
/**
 * removes retail prices
 */
async function removeDefaultPrices() {
  const _prices = await fetch_prices().catch(log);
  log("first check", _prices);
  const promises = _prices.map(setDefaultPriceToZero);
  const result = await Promise.allSettled(promises).catch(throwErr);
  log(fulfillmentStatus(result));
  const secondCheck = await fetch_prices().catch(throwErr);
  log("secondCheck", secondCheck);
}

removeDefaultPrices();
