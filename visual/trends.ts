import express from "express";
import { getAllOrders } from "../functions/orders/getAllOrders";
import path from "path";
import { Database } from "sqlite3";
import { getOrderProducts } from "../functions/orders/getOrderProducts";
import { Order } from "../functions/orders/Order";
require("../config/config").config("bf", 2);

const db = new Database(path.resolve(__dirname, "main.db"));

class Client {
  db: Database;
  constructor(db: Database) {
    this.db = db;
  }

  init() {
    const q = /*SQL*/ `CREATE TABLE order_qtys(
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        sku TEXT DEFAULT "",
        product_qty INTEGER NOT NULL,
        order_date DATETIME NOT NULL
    )`;
    return new Promise((resolve, reject) => {
      this.db.run(q, (err) => (err ? reject(err) : resolve(undefined)));
    });
  }

  markOrderAsFullyRecorded(orderID: number) {
    const q = /*SQL*/ `UPDATE orders SET fully_recorded = true WHERE id = ?`;
    return new Promise((resolve, reject) =>
      this.db.run(q, [orderID], (err) =>
        err ? reject(err) : resolve(undefined)
      )
    );
  }

  async update() {
    try {
      const lastRecordedOrder = await this.getMaxOrderID();
      const params = {
        min_id: lastRecordedOrder,
      };
      const orders = await getAllOrders(params);
      console.log(`${orders.length} new orders found`);
      return this.saveOrderComponents(orders);
    } catch (err) {
      throw err;
    }
  }

  async populate() {
    try {
      const oldestOrderID = await this.getMinOrderID();
      const params = {
        min_date_created: new Date("01/01/2022").toISOString(),
        max_id: oldestOrderID,
      };
      const orders = await getAllOrders(params);
      console.log(`${orders.length} new orders found`);
      return this.saveOrderComponents(orders);
    } catch (err) {
      throw err;
    }
  }

  saveOrderComponents(orders: Order[]) {
    console.log("updating database");
    return new Promise(async (resolve, reject) => {
      try {
        for (let i = 0; i < orders.length; i++) {
          const order = orders[i];
          console.log(`saving order ${i + 1} of ${orders.length}`);

          const products = await getOrderProducts(order);
          console.log(`order #${order.id} has ${products.length} products`);

          for (let ii = 0; ii < products.length; ii++) {
            const product = products[ii];
            console.log(`saving product ${ii + 1} of ${products.length}`);

            await this.saveOrderProducts(
              order.id,
              product.product_id,
              product.sku,
              product.quantity,
              order.date_created
            );
          }
        }
        resolve(undefined);
      } catch (err) {
        reject(err);
      }
    });
  }

  getMaxOrderID(): Promise<number> {
    const q = /*SQL*/ `SELECT MAX(order_id) as max_id FROM order_qtys`;
    return new Promise((resolve, reject) => {
      this.db.get(q, (err, row: any) =>
        err ? reject(err) : resolve(row.max_id)
      );
    });
  }

  getMinOrderID(): Promise<number> {
    const q = /*SQL*/ `SELECT MIN(order_id) as max_id FROM order_qtys`;
    return new Promise((resolve, reject) => {
      this.db.get(q, (err, row: any) =>
        err ? reject(err) : resolve(row.max_id)
      );
    });
  }

  saveOrderProducts(
    orderID: number,
    productID: number,
    productSKU: string,
    productQTY: number,
    orderDateCreatedString: string
  ) {
    return new Promise((resolve, reject) =>
      this.db.run(
        /*SQL*/ `INSERT INTO order_qtys(order_id, product_id, sku, product_qty, order_date) VALUES (?, ?, ?, ?, ?)`,
        [
          orderID,
          productID,
          productSKU,
          productQTY,
          new Date(orderDateCreatedString),
        ],
        (err) => (err ? reject(err) : resolve(undefined))
      )
    );
  }

  getDailySales(sku: string): Promise<DailySales> {
    const q = /*SQL*/ `SELECT count(product_qty) as qty, strftime('%Y-%m-%d', order_date / 1000, 'unixepoch') AS day FROM order_qtys WHERE sku = ? GROUP BY day`;
    return new Promise((resolve, reject) => {
      this.db.all(q, [sku], (err, rows) =>
        err ? reject(err) : resolve(rows as DailySales)
      );
    });
  }

  getMonthlySales(sku: string): Promise<MonthlySales> {
    const q = /*SQL*/ `SELECT count(product_qty) as qty, strftime('%Y-%m', order_date / 1000, 'unixepoch') AS month FROM order_qtys WHERE sku = ? GROUP BY month`;
    return new Promise((resolve, reject) => {
      this.db.all(q, [sku], (err, rows) =>
        err ? reject(err) : resolve(rows as MonthlySales)
      );
    });
  }

  getProductSKUs(): Promise<{ sku: string }[]> {
    const q = /*SQL*/ `SELECT DISTINCT sku FROM order_qtys LIMIT 100`;
    return new Promise((resolve, reject) => {
      this.db.all(q, (err, rows: any) => (err ? reject(err) : resolve(rows)));
    });
  }
}

type DailySales = {
  day: string;
  qty: number;
}[];

type MonthlySales = {
  day: string;
  qty: number;
}[];

const client = new Client(db);

const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./templates/index.html"));
});

app.get("/trends", async function (req, res) {
  try {
    const data = (await client.getProductSKUs()) as any[];
    for (const d of data) {
      d.monthly_sales = await client.getMonthlySales(d.sku);
    }
    res.json(data);
  } catch {
    res.sendStatus(500);
  }
});

app.get("/trends/:sku", async function (req, res) {
  try {
    const sales =
      req.query.period === "month"
        ? await client.getMonthlySales(req.params.sku)
        : await client.getDailySales(req.params.sku);

    res.json(sales);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

client.update().then(() => app.listen(3000, () => console.log(`listening`)));
