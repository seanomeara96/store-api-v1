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
    try {
      const products = await getAllProducts();
      const upToDateBarcodes = await csv().fromFile("./bp.csv");
      let promises = [];
      products.forEach((bcProduct) => {
        let bpProductDetails = upToDateBarcodes.find(
          (bpDoc) => bpDoc.SKU === bcProduct.sku
        );
        if (!bpProductDetails) {
          console.log(`${bcProduct.name} is either an old SKU or a config`);
          return;
        }
        if (bcProduct.upc !== bpProductDetails.Barcode) {
          console.log(`${bcProduct.name} barcode mismatch`.red);
          promises.push(
            updateProductBarcode(bcProduct.id, bpProductDetails.Barcode)
          );
        }
      });
      const responses = await Promise.allSettled(promises);
      console.log(responses.length);
      resolve()
    } catch (err) {
      console.log(err);
      reject()
    }
  });
}
let stores = ["bf", "ah", "bsk", "pb", "bs", "huk"];

stores = stores.map(store => ()=>updateProductBarcodes(store))

stores.reduce((acc, cur) => acc.then(cur), Promise.resolve());
