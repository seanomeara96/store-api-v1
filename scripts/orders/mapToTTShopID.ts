import { getAllOrders } from "../../functions/orders/getAllOrders";
import fs from "fs";
import path from "path";
const ids_to_map: string[] = [];

function getDate7DaysAgo(format = "ISO") {
  const date = new Date();
  date.setDate(date.getDate() - 7);

  if (format.toUpperCase() === "RFC") {
    // RFC-2822 format
    return date.toUTCString();
  } else {
    // ISO-8601 format
    return date.toISOString();
  }
}

const mapping: {
  tt_shop_id: string;
  bc_order_id: string;
}[] = [];

async function main() {
  try {
    require("../../config/config").config("bf", 2);
    const orders = await getAllOrders({
      min_date_created: getDate7DaysAgo("RFC"),
    });

    for (const id of ids_to_map) {
      let order;
      for (const o of orders) {
        if (o.external_order_id === id) {
          order = o;
          break;
        }
      }
      if (order) {
        fs.appendFileSync(
          path.resolve(__dirname, "ttIDMapping.csv"),
          `${id}\t${order.id}\n`,
          { encoding: "utf-8" },
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
}
main();
