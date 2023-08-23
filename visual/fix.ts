import { Database } from "sqlite3";
import path from "path";

require("../config/config").config("bf", 2);

const db = new Database(path.resolve(__dirname, "main_test.db"));

db.all(`SELECT order_date FROM order_qtys`, async function(err, rows) {
  if (err) return console.log(err);
  for (const row of rows) {
    await new Promise((resolve, reject){
        db.run(`UPDATE`)
    });
  }
});
