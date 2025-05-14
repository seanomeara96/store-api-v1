import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";
import { getAllProducts } from "../../functions/products/getAllProducts";

async function sortOrderBySKU() {
  try {
    const data = [
      { sort_order: 1, sku: "3043" },
      { sort_order: 2, sku: "3045" },
      { sort_order: 3, sku: "3042" },
      { sort_order: 4, sku: "3044" },
      { sort_order: 5, sku: "3046" },
      { sort_order: 6, sku: "3047" },
      { sort_order: 7, sku: "3041" },
      { sort_order: 8, sku: "3024" },
      { sort_order: 9, sku: "3018" },
      { sort_order: 10, sku: "3023" },
      { sort_order: 11, sku: "3029" },
      { sort_order: 12, sku: "3027" },
      { sort_order: 13, sku: "3026" },
      { sort_order: 14, sku: "3022" },
      { sort_order: 15, sku: "3021" },
      { sort_order: 16, sku: "3020" },
      { sort_order: 17, sku: "3037" },
      { sort_order: 18, sku: "3039" },
      { sort_order: 19, sku: "3019" },
      { sort_order: 20, sku: "3028" },
      { sort_order: 21, sku: "3031" },
      { sort_order: 22, sku: "3035" },
      { sort_order: 23, sku: "3036" },
      { sort_order: 24, sku: "3034" },
      { sort_order: 25, sku: "3033" },
      { sort_order: 26, sku: "3025" },
      { sort_order: 27, sku: "3030" },
      { sort_order: 28, sku: "1054" },
    ];

    require("../../config/config").config("ha");
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const { sku, sort_order } = data[i];
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
    console.log(err.response.data ?? err.response ?? err);
  }
}
sortOrderBySKU();
