import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";
import { getAllProducts } from "../../functions/products/getAllProducts";

async function sortOrderBySKU() {
  try {
    const data = [
      { sort_order: 1, sku: "Pack 05" },
      { sort_order: 2, sku: "Pack 02SS" },
      { sort_order: 3, sku: "PACK 04" },
      { sort_order: 4, sku: "PACK 01A" },
      { sort_order: 5, sku: "1000569" },
      { sort_order: 6, sku: "1000536" },
      { sort_order: 7, sku: "333A" },
      { sort_order: 8, sku: "1000546A" },
      { sort_order: 9, sku: "1000546" },
      { sort_order: 10, sku: "1000567" },
      { sort_order: 11, sku: "CRY01" },
      { sort_order: 12, sku: "1000564" },
      { sort_order: 13, sku: "1000565" },
      { sort_order: 14, sku: "BTWOOD" },
      { sort_order: 15, sku: "1000547" },
      { sort_order: 16, sku: "PADRED01" },
      { sort_order: 17, sku: "PADBLUE01" },
      { sort_order: 18, sku: "F025" },
      { sort_order: 19, sku: "F016" },
      { sort_order: 20, sku: "F017" },
      { sort_order: 21, sku: "F015" },
      { sort_order: 22, sku: "OH02" },
      { sort_order: 23, sku: "1000937" },
      { sort_order: 24, sku: "24A" },
      { sort_order: 25, sku: "24" },
      { sort_order: 26, sku: "23" },
      { sort_order: 27, sku: "26" },
      { sort_order: 28, sku: "27" },
      { sort_order: 29, sku: "22" },
      { sort_order: 30, sku: "29" },
      { sort_order: 31, sku: "24B" },
      { sort_order: 32, sku: "1031" },
      { sort_order: 33, sku: "1037" },
      { sort_order: 34, sku: "1036" },
      { sort_order: 35, sku: "1033" },
      { sort_order: 36, sku: "1034" },
      { sort_order: 37, sku: "1035" },
      { sort_order: 38, sku: "VA1016" },
      { sort_order: 39, sku: "VA1017" },
      { sort_order: 40, sku: "VA1018" },
      { sort_order: 41, sku: "VA1019" },
      { sort_order: 42, sku: "VA1015" },
      { sort_order: 43, sku: "JASP1" },
      { sort_order: 44, sku: "JASP2" },
      { sort_order: 45, sku: "JASP3" },
      { sort_order: 46, sku: "1000206" },
      { sort_order: 47, sku: "1000205" },
      { sort_order: 48, sku: "1000207" },
      { sort_order: 49, sku: "1000204" },
      { sort_order: 50, sku: "1000208" },
      { sort_order: 51, sku: "1000203" },
      { sort_order: 52, sku: "1000202" },
      { sort_order: 53, sku: "1000201" },
      { sort_order: 54, sku: "1000209" },
      { sort_order: 55, sku: "1000200" },
      { sort_order: 56, sku: "WB01" },
      { sort_order: 57, sku: "VB02" },
      { sort_order: 58, sku: "VB" },
      { sort_order: 59, sku: "VB03" },
      { sort_order: 60, sku: "L022" },
      { sort_order: 61, sku: "1053" },
      { sort_order: 62, sku: "1050" },
      { sort_order: 63, sku: "1052" },
      { sort_order: 64, sku: "1051" },
      { sort_order: 65, sku: "L021" },
    ];
    require("../../config/config").config("ha");
    for (const { sku, sort_order } of data) {
      let product = await getProductBySku(sku);
      if (!product) {
        let products = await getAllProducts({ sku });
        if (products.length < 1) {
          console.log("not product", sku);
          continue;
        }
        if (products.length > 1) {
          throw `to many products for sku ${sku}`;
        }
        product = products[0];
      }
      await updateProduct(product.id, { sort_order });
      await new Promise(function (resolve) {
        setTimeout(resolve, 1000);
      });
    }
  } catch (err: any) {
    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err);
    }
  }
}
sortOrderBySKU();
