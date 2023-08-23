import { Database } from "sqlite3";
import { getAllOrders } from "../functions/orders/getAllOrders";
import { getOrderProducts } from "../functions/orders/getOrderProducts";
import path from "path";
import fs from "fs";
import { Order } from "../functions/orders/Order";

require("../config/config").config("bf", 2);

const db = new Database(path.resolve(__dirname, "main.db"));

db.run(
  /*SQL*/ `CREATE TABLE IF NOT EXISTS order_qtys(
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    sku TEXT DEFAULT "",
    product_qty INTEGER NOT NULL,
    order_date DATETIME NOT NULL
)`,
  (err) => (err ? console.log(err) : main())
);

async function main() {
  const begin = new Date("01/01/2023").toISOString();
  const end = new Date().toISOString();
  console.log(`starting`);
  const cachePath = path.resolve(__dirname, "cache.json");
  try {
    let orders: Order[]

    const cache: string = await new Promise((resolve) =>
      fs.readFile(cachePath, { encoding: "utf-8" }, (err, data) =>
        err ? resolve("") : resolve(data)
      )
    );

    if (!cache) {
      orders = await getAllOrders({
        min_date_created: begin,
        max_date_created: end,
      });
    } else {
        orders = JSON.parse(cache)
    }

    await new Promise((resolve, reject) =>
      fs.writeFile(
        cachePath,
        JSON.stringify(orders),
        {
          encoding: "utf-8",
        },
        (err) => (err ? reject(err) : resolve(undefined))
      )
    );
    
    for (let i = 21574; i < orders.length; i++) {
      const order = orders[i];
      console.log(`order ${i + 1} of ${orders.length}`);
      const orderProducts = await getOrderProducts(order);

      for (const product of orderProducts) {
        await new Promise((resolve, reject) =>
          db.run(
            /*SQL*/ `INSERT INTO order_qtys(order_id, product_id, sku, product_qty, order_date) VALUES (?, ?, ?, ?, ?)`,
            [
              product.order_id,
              product.product_id,
              product.sku,
              product.quantity,
              new Date(order.date_created),
            ],
            (err) => (err ? reject(err) : resolve(undefined))
          )
        );
        console.log(`saved record`);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
