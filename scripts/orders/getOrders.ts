import { getAllOrders } from "../../functions/orders/getAllOrders";
import { getOrderProducts } from "../../functions/orders/getOrderProducts";

import path from "path";
import fs from "fs/promises";

const store = "bsk";
require("../../config/config").config(store, 2);

async function getOrders() {
  try {
    const orders = await getAllOrders({
      min_date_created: "2025-01-01",
      max_date_created: "2025-12-31",
    });
    // Perf: If the upstream API supports pagination/streaming, prefer iterating pages instead of loading
    // all orders into memory at once (helps memory usage for large datasets).

    const outputPath = path.join(__dirname, store + "-order-products.jsonl");
    // Write output as `.jsonl` (JSON Lines): each line is a standalone JSON object.
    // This makes it easy to append incrementally and stream/process large datasets line-by-line.
    // Perf: Consider using a single writable stream (fs.createWriteStream) instead of calling appendFile
    // per order, which incurs repeated open/write/close overhead.
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      console.log(i, orders.length, order.id);
      // Perf: Logging every iteration can be a bottleneck; consider logging every N orders.

      const products = await getOrderProducts(order.id);
      // Perf: If the API allows it, consider fetching products with limited concurrency (e.g. p-limit)
      // to overlap I/O and reduce wall time, while still respecting rate limits/timeouts.
      // Perf: If there is a bulk endpoint (fetch products for many orders at once), it will likely be
      // significantly faster than N individual requests.

      await fs.appendFile(outputPath, JSON.stringify(products) + "\n", "utf8");
    }
  } catch (err) {
    console.log(err);
  }
}

getOrders();
