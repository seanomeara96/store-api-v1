require("./config/config").config("hie");
const { getAllProducts } = require("./functions/products/getAllProducts");
const { updateProduct } = require("./functions/products/updateProduct");
const { log } = console;
const productPrices = ({ id, price, retail_price, sale_price }) => {
  return { id, price, retail_price, sale_price };
};
const nonZeroRetailPrice = ({ retail_price }) => retail_price;

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

async function removeRetailPrices() {
  const nonZeroRetailPrices = await fetchNonZeroRetailPrices().catch(log);
  const promises = nonZeroRetailPrices.map(({ id }) =>
    updateProduct(id, { retail_price: "0" })
  );
  const result = await Promise.allSettled(promises).catch(log);
  log(result.map(({ status }) => status));
  const secondCheck = await fetchNonZeroRetailPrices().catch(log);
  log("secondCheck", secondCheck);
}

removeRetailPrices();
