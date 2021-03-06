/**
 * updates product barcodes, cant do options yet but products yes
 */
function updateProductBarcodes(store) {
  return new Promise(async (resolve, reject) => {
    require("../config/config").config(store);
    const { getAllProducts } = require("../products/getAllProducts");
    const { updateProductBarcode } = require("./updateProductBarcode");
    const csv = require("csvtojson");
    const colors = require("colors");
    const {
      updateProductVariantBarcodes,
    } = require("./updateProductVariantBarcodes");
    try {
      const products = await getAllProducts();
      const upToDateBarcodes = await csv().fromFile("./bp.csv");
      let promises = [];
      let configs = [];
      products.forEach(async (bcProduct) => {
        let bpProductDetails = upToDateBarcodes.find(
          (bpDoc) => bpDoc.SKU === bcProduct.sku
        );
        
        if (!bcProduct.option_set_id && !bpProductDetails) {
          // console.log(`This is an old SKU `);
          console.log("Is a product but has no matching record on brightpearl")
          return;
        }
        if (bcProduct.option_set_id) {
          console.log(bcProduct.name, "product is a config".yellow);
          configs.push(
            updateProductVariantBarcodes(bcProduct.id, upToDateBarcodes)
          );
          return;
        }
        if (bcProduct.upc !== bpProductDetails.Barcode) {
          console.log(`${bcProduct.name} barcode mismatch`.red);
          promises.push(
            updateProductBarcode(bcProduct.id, bpProductDetails.Barcode)
          );
          return;
        }
      });
      const responses = await Promise.allSettled(promises);
      const configsResponses = await Promise.allSettled(configs);
      console.log(`${responses.length} product barcodes updated`);
      console.log(configsResponses);
      resolve();
    } catch (err) {
      console.log(err);
      reject();
    }
  });
}
let stores = ["bf", "ah", "bsk", "pb", "bs", "huk"];

const storePromises = stores.map((store) => () => updateProductBarcodes(store));

const promiseReducer = (acc, cur) => acc.then(cur)

storePromises.reduce(promiseReducer, Promise.resolve());
