import { output } from "../scripts/utils/output";
import { bpClient } from "./bp-client";
import { parseProduct } from "./getBpProductDetails";
import path from "path";
(async () => {
  let sumThis = [];

  let count = 0;

  for (let i = 0; i < 10000; i += 500) {
    try {
      const e = await bpClient.get(`/product-service/product-search`, {
        params: {
          productId: `${i}-${i + 500}`,
        },
      });

      console.log(e.data.response.results.length);

      const product = e.data.response.results;
      count += e.data.response.results.length;

      sumThis.push(product);
    } catch (err: any) {
      console.log(err.response ? err.response : err);
      continue;
    }
  }

  sumThis = sumThis.flat();

  const products = sumThis.map(parseProduct);

  const emptyBarcodes = products.filter((p) => p.barcode === "");

  console.log(emptyBarcodes.length);
  console.log(emptyBarcodes[emptyBarcodes.length - 3]);

  output(path.resolve(__dirname, "empty-barcodes.csv"), emptyBarcodes, true);
})();
