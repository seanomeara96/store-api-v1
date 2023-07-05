import { updateProduct } from "../../functions/products/updateProduct";
import { getProductBySku } from "../../functions/products/getProductBySKU";
require("../../config/config").config("bf");

const prices = [
  { retail_price: 44.5, sale_price: 40.5, sku: "11778" },
  { retail_price: 53.0, sale_price: 46.0, sku: "6800" },
  { retail_price: 45.5, sale_price: 41.0, sku: "9696" },
  { retail_price: 45.5, sale_price: 41.0, sku: "6488" },
  { retail_price: 38.0, sale_price: 35.0, sku: "6487" },
  { retail_price: 53.0, sale_price: 48.0, sku: "6801" },
  { retail_price: 44.5, sale_price: 41.0, sku: "8979" },
  { retail_price: 37.0, sale_price: 34.0, sku: "8980" },
  { retail_price: 49.0, sale_price: 45.0, sku: "8983" },
  { retail_price: 63.0, sale_price: 57.0, sku: "8978" },
  { retail_price: 62.5, sale_price: 57.5, sku: "8981" },
  { retail_price: 83.0, sale_price: 75.0, sku: "7547" },
  { retail_price: 80.5, sale_price: 76.5, sku: "7549" },
  { retail_price: 80.5, sale_price: 73.5, sku: "10920" },
  { retail_price: 58.0, sale_price: 53.0, sku: "7550" },
  { retail_price: 53.0, sale_price: 46.0, sku: "8030" },
  { retail_price: 53.0, sale_price: 46.0, sku: "12343" },
  { retail_price: 69.0, sale_price: 53.0, sku: "7548" },
  { retail_price: 80.5, sale_price: 73.5, sku: "100031" },
  { retail_price: 78.0, sale_price: 72.0, sku: "100049" },
  { retail_price: 78.0, sale_price: 72.0, sku: "100048" },
  { retail_price: 78.0, sale_price: 72.0, sku: "100743" },
  { retail_price: 56.5, sale_price: 51.0, sku: "11781" },
  { retail_price: 54.0, sale_price: 47.0, sku: "11782" },
  { retail_price: 71.5, sale_price: 65.0, sku: "100705" },
  { retail_price: 83.0, sale_price: 75.0, sku: "42976" },
  { retail_price: 79.0, sale_price: 73.0, sku: "100034" },
  { retail_price: 71.5, sale_price: 64.5, sku: "DEC_DL237" },
  { retail_price: 95.5, sale_price: 85.5, sku: "100027" },
  { retail_price: 112.0, sale_price: 102.0, sku: "6149" },
  { retail_price: 112.0, sale_price: 102.0, sku: "11390" },
  { retail_price: 71.5, sale_price: 64.5, sku: "6151" },
  { retail_price: 77.5, sale_price: 69.5, sku: "43037" },
  { retail_price: 107.0, sale_price: 97.0, sku: "100025" },
  { retail_price: 133.0, sale_price: 117.0, sku: "13072" },
  { retail_price: 131.0, sale_price: 116.0, sku: "9431" },
  { retail_price: 95.0, sale_price: 85.0, sku: "5335" },
  { retail_price: 91.0, sale_price: 81.0, sku: "11777" },
  { retail_price: 95.0, sale_price: 85.0, sku: "100024" },
  { retail_price: 54.0, sale_price: 49.0, sku: "10187" },
  { retail_price: 51.5, sale_price: 47.5, sku: "7233" },
  { retail_price: 55.0, sale_price: 51.0, sku: "12346" },
  { retail_price: 32.5, sale_price: 26.5, sku: "9016" },
  { retail_price: 30.5, sale_price: 27.5, sku: "9017" },
  { retail_price: 40.5, sale_price: 36.5, sku: "8984" },
  { retail_price: 27.5, sale_price: 25.5, sku: "12348" },
  { retail_price: 54.0, sale_price: 49.0, sku: "11780" },
  { retail_price: 50.5, sale_price: 46.5, sku: "11783" },
  { retail_price: 38.5, sale_price: 34.5, sku: "13074" },
  { retail_price: 76.0, sale_price: 71.0, sku: "12349" },
  { retail_price: 60.0, sale_price: 56.0, sku: "12350" },
  { retail_price: 59.0, sale_price: 54.0, sku: "11356" },
  { retail_price: 59.0, sale_price: 54.0, sku: "11355" },
];

(async () => {
  for (const { sku, retail_price, sale_price } of prices) {
    try {
      const res = await getProductBySku(sku);
      await updateProduct(res.id, {
        price: retail_price,
        retail_price: retail_price,
        sale_price: sale_price,
      });
      console.log(`updated product`, res.name);
    } catch (err) {
      console.log(err);
    }
  }
})();
