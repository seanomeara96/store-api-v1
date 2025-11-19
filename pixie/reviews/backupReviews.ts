import { Database, OPEN_READWRITE } from "sqlite3";
import path from "path";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getAllReviews } from "../../functions/reviews/getAllReviews";
const db = new Database(
  path.resolve(__dirname, "./main.db"),
  OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Failed to connect to the database:", err.message);
    }
  },
);
require("../../config/config").config("px");
async function main() {
  try {
    const products = await getAllProducts();
    for (let i = 0; i < products.length; i++) {
      console.log(`product ${i + 1} of ${products.length}`);
      try {
        const product = products[i];

        const reviews = await getAllReviews(product.id);

        for (let ii = 0; ii < reviews.length; ii++) {
          const review = reviews[ii];

          const reviewIsBackedUp = async (): Promise<boolean> => {
            const query = /*SQL*/ `SELECT * FROM review_backups WHERE product_id = ? AND id = ?`;
            const vars = [product.id, review.id];

            return new Promise<boolean>((resolve, reject) => {
              db.all(query, vars, function (err, rows) {
                if (err) return reject(err);
                resolve(rows.length > 0);
              });
            });
          };

          if (await reviewIsBackedUp()) {
            continue;
          }

          const backupReview = async () => {
            const queryString = /*SQL*/ `
            INSERT INTO review_backups (
                product_id,
                id,
                title,
                text,
                status,
                rating,
                email,
                name,
                date_reviewed,
                date_created,
                date_modified
            ) VALUES
            (?,?,?,?,?,?,?,?,?,?,?)`;

            const vars = [
              product.id,
              review.id,
              review.title,
              review.text,
              review.status,
              review.rating,
              review.email,
              review.name,
              review.date_reviewed,
              review.date_created,
              review.date_modified,
            ];
            return new Promise<void>((resolve, reject) => {
              db.run(queryString, vars, function (err) {
                if (err) return reject(err);
                resolve();
              });
            });
          };

          try {
            await backupReview();
            console.log(`review ${ii + 1} of ${reviews.length}`);
          } catch (err) {
            console.error(
              `Error saving review for product ${product.id}, review id: ${review.id}`,
              err,
            );
            break;
          }
        }
      } catch (err) {
        console.error("Error processing product:", err);
        continue;
      }
    }
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}
main();
