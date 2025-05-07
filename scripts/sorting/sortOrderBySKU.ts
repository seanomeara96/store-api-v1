import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";
import { getAllProducts } from "../../functions/products/getAllProducts";

async function sortOrderBySKU() {
  try {
    const data = [
      { sku: "8757", sale_price: 37.0, sort_order: 110 },
      { sku: "9907", sale_price: 34.0, sort_order: 120 },
      { sku: "13253", sale_price: 30.0, sort_order: 60 },
      { sku: "8758", sale_price: 35.0, sort_order: 130 },
      { sku: "20649", sale_price: 35.0, sort_order: 40 },
      { sku: "8759", sale_price: 32.0, sort_order: 100 },
      { sku: "20230", sale_price: 32.0, sort_order: 80 },
      { sku: "20646", sale_price: 33.65, sort_order: 10 },
      { sku: "8760", sale_price: 32.0, sort_order: 90 },
      { sku: "20231", sale_price: 32.0, sort_order: 70 },
      { sku: "20647", sale_price: 33.65, sort_order: 20 },
      { sku: "13248", sale_price: 32.0, sort_order: 50 },
      { sku: "14137", sale_price: 50.0, sort_order: 140 },
      { sku: "20648", sale_price: 33.65, sort_order: 30 },
      { sku: "8756", sale_price: 35.0, sort_order: 150 },
    ];

    require("../../config/config").config("bf");
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
    console.log(err.response.data ?? err.response ?? err);
  }
}
sortOrderBySKU();
