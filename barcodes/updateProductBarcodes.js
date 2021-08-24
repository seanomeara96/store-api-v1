require("../config/config").config("bf");
const { getAllProducts } = require("../products/getAllProducts");
const { updateProductBarcode } = require("./updateProductBarcode");
const csv = require("csvtojson");
/**
 *
 */
async function updateProductBarcodes() {
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
  } catch (err) {
    console.log(err);
  }
}

updateProductBarcodes();
