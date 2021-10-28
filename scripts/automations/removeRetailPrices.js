require("./config/config").config("hie");
const { getAllProducts } = require("./functions/products/getAllProducts");
const { updateProduct } = require("./functions/products/updateProduct");
const { log } = console;
const productPrices = ({ id, price, retail_price, sale_price }) => {
  return { id, price, retail_price, sale_price };
};
/**
 * returns any non zero retail prices
 * @param {nuber} param0
 * @returns
 */
const nonZeroRetailPrice = ({ retail_price }) => retail_price;

/**
 * returns a function that sets a retial price to 0
 * @param {number} param0 product id
 * @returns
 */
const setRetailPriceToZero = ({ id }) => updateProduct(id, { retail_price: 0 });

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
function fetchNonZeroRetailPrices() {
  return new Promise(async (resolve, reject) => {
    try {
      const allHaakaaProducts = await getAllProducts();
      // retail price must be zero
      const prices = allHaakaaProducts.map(productPrices);

      const nonZeroRetailPrices = prices.filter(nonZeroRetailPrice);
      resolve(nonZeroRetailPrices);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * removes retail prices
 */
async function removeRetailPrices() {
  const nonZeroRetailPrices = await fetchNonZeroRetailPrices().catch(log);
  log("first check", nonZeroRetailPrices);
  const promises = nonZeroRetailPrices.map(setRetailPriceToZero);
  const result = await Promise.allSettled(promises).catch(throwErr);
  log(result.map(({ status }) => status));
  const secondCheck = await fetchNonZeroRetailPrices().catch(throwErr);
  log("secondCheck", secondCheck);
}

removeRetailPrices();
