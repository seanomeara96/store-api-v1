const allSKUs = [];

const stores = ["bsk", "bf", "ah", "ih", "pb", "bs", "fs", "hie", "stie", "ds"];

const { getAllProducts } = require("../../functions/products/getAllProducts");

const {
  getProductVariants,
} = require("../../functions/products/getProductVariants");

function getStoreSKUs(store, interval) {
  return new Promise(async (resolve, reject) => {
    require("../../config/config").config(store);

    const products = await getAllProducts();
    const variants = [];
    const batches = [];

    for (let i = 0; i < products.length; i += interval) {
      batches.push(products.slice(i, i + interval));
    }

    for (const batch of batches) {
      const promises = batch.map((product) => getProductVariants(product.id));
      const responses = await Promise.allSettled(promises);

      if (responses.filter((response) => response.status === "rejected").length)
        return reject("requests for variants was rejected");

      const productVariants = responses
        .filter((response) => response.status === "fulfilled")
        .map((response) => response.value);

      variants.push(...productVariants);
    }

    const variantSKUs = variants.flat().map((variant) => variant.sku);
    resolve(variantSKUs);
  });
}

async function main() {
  const skus = [];
  for (const store of stores) {
    const storeSKUs = await getStoreSKUs(store, 250).catch(console.log);
    skus.push(...storeSKUs);
  }
  const uniqueSkus = new Set(skus);
  console.log(uniqueSkus);
}
main();
