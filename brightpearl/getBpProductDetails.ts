import { BpProductInfo } from "./BpProductInfo";
import { bpClient } from "./bp-client";

export function getBpProductDetails(productSKU: string): Promise<BpProductInfo> {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await bpClient.get(`/product-service/product-search`, {
        params: {
          SKU: productSKU,
        },
      });

      if (res.data.response.results.length > 1) {
        throw "Too many results";
      }
      if (!res.data.response.results.length) {
        throw "No results";
      }
      const [
        productId,
        productName,
        SKU,
        barcode,
        EAN,
        UPC,
        ISBN,
        MPN,
        stockTracked,
        salesChannelName,
        createdOn,
        updatedOn,
        brightpearlCategoryCode,
        productGroupId,
        brandId,
        productTypeId,
        productStatus,
        primarySupplierId,
      ] = res.data.response.results[0];

      const bpProduct: BpProductInfo = {
        productId,
        productName,
        SKU,
        barcode,
        EAN,
        UPC,
        ISBN,
        MPN,
        stockTracked,
        salesChannelName,
        createdOn,
        updatedOn,
        brightpearlCategoryCode,
        productGroupId,
        brandId,
        productTypeId,
        productStatus,
        primarySupplierId,
      };

      resolve(bpProduct);
    } catch (err) {
      reject(err);
    }
  });
}
