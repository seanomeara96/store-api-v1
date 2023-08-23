import express from "express";
import { getAllOrders } from "../functions/orders/getAllOrders";
import path from "path";
import { Database } from "sqlite3";
import { getOrderProducts } from "../functions/orders/getOrderProducts";
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

  update() {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = await getAllOrders({
          min_order_id: await this.getMaxOrderID(),
        });
        for (const order of orders) {
          const products = await getOrderProducts(order);
          for (const product of products) {
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

  getMaxOrderID() {
    const q = /*SQL*/ `SELECT MAX(order_id) FROM order_qtys`;
    return new Promise((resolve, reject) => {
      this.db.get(q, (err, row) => (err ? reject(err) : resolve(row)));
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

  getProductSKUs():Promise<{sku:string}[]> {
    const q = `SELECT DISTINCT sku FROM order_qtys LIMIT 100`;
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

app.get("/", async function (req, res) {
  try {
    const data = await client.getProductSKUs() as any[]
    for(const d of data){
        d.monthly_sales = await client.getMonthlySales(d.sku)
    }
    const canvases = data.map(d => `<a href="/trends/${d.sku}"><div><canvas id="${d.sku}"></canvas></div></a>`).join("")
    const functionCalls = data.map(d => `new Chart(document.getElementById('${d.sku}'), {
        type: 'line',
        data: {
          labels: ${JSON.stringify(d.monthly_sales.map((row:any) => row.month))},
          datasets: [{
            label: 'Sales of ${d.sku}',
            data: ${JSON.stringify(d.monthly_sales.map((row: any) => row.qty))},
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });`).join("")
      
      
      res.send(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(450px, 1fr))">
              ${canvases}
            </div>
            
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            
            <script>
              ${functionCalls}
            </script>
      </body>
      </html>`)
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

    res.send(/*HTML*/ `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div>
            <canvas id="myChart"></canvas>
          </div>
          
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          
          <script>
            const ctx = document.getElementById('myChart');
          
            new Chart(ctx, {
              type: 'line',
              data: {
                labels: ${JSON.stringify(sales.map((row) => row.day))},
                datasets: [{
                  label: '# of Sales',
                  data: ${JSON.stringify(sales.map((row) => row.qty))},
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
          </script>
    </body>
    </html>`);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/trends/:sku/json", async function (req, res) {
  try {
    const dailySales = (await client.getDailySales(req.params.sku)) as {
      day: string;
      qty: number;
    }[];

    res.json(dailySales);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log(`listening`));
