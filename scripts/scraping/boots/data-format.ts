import path from "path";
import { Database } from "sqlite3";
import { output } from "../../utils/output";

async function format() {
  try {
    const db = new Database(path.resolve(__dirname, "boots.db"));
    const data = await (new Promise(function (resolve, reject) {
      db.all(
        `SELECT "URL" as url, scrape_data FROM pages WHERE scrape_data NOT NULL`,
        function (err, rows: any) {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    }) as Promise<{ url: string; scrape_data: string }[]>);
    await output(
      path.resolve(__dirname, `boots-reviews.csv`),
      data.map(function (p: { url: string; scrape_data: string }) {
        let a = JSON.parse(p.scrape_data);
        let b = { name: a.name, url: p.url, value: 0.0, count: 0 };
        b.value = parseFloat(a.value);
        b.count = parseInt(a.count.replace(/[\(\)]/g, ""));
        return b;
      }),
      true
    );
  } catch (err) {
    console.log(err);
  }
}

format();
