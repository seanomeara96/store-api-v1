const {
  getAllProductVariants,
} = require("../product-variants/getAllProductVariants");
const {
  updateProductVariantBarcode,
} = require("../product-variants/updateProductVariantBarcode");

const colors = require("colors");
const updateProductVariantBarcodes = (configId, bpProductDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      let productVariants = await getAllProductVariants(configId);
      let promises = [];
      productVariants.forEach((variant) => {
        
        let variantDetails = bpProductDetails.find(
          (bpProductDoc) => bpProductDoc.SKU === variant.sku
        );
        if (variant.upc !== variantDetails.Barcode) {
          console.log(`product variant barcode mismatch`.red)
          promises.push(
            updateProductVariantBarcode(
              configId,
              variant.id,
              variantDetails.Barcode
            )
          );
        }
      });
      const responses = await Promise.allSettled(promises);
      resolve(responses.filter(i => i.status === "fulfilled" ).length);
    } catch (err) {
      reject(err);
    }
  });
};

exports.updateProductVariantBarcodes = updateProductVariantBarcodes;
