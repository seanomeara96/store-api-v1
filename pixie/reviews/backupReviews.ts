import { Database } from "sqlite3";
import path from "path";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getAllReviews } from "../../functions/reviews/getAllReviews";
const db = new Database(path.resolve(__dirname, "./main.db"));
require("../../config/config").config("px");
async function main() {
  const products = await getAllProducts();
  for (let i = 0; i < products.length; i++) {
    console.log(`product ${i + 1} of ${products.length}`);
    try {
      const product = products[i];

      const reviews = await getAllReviews(product.id);

      for (let ii = 0; ii < reviews.length; ii++) {
        const review = reviews[ii];

        function reviewIsBackedUp() {
          return new Promise(function (resolve, reject) {
            const query = /*SQL*/ `SELECT * FROM review_backups WHERE product_id = ? AND id = ?`;

            const vars = [product.id, review.id];

            db.all(query, vars, function (err, rows) {
              if (err) return reject(err);
              if (!rows.length) return resolve(false);
              return resolve(true);
            });
          });
        }

        if (await reviewIsBackedUp()) {
          continue;
        }

        function backupReview() {
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
          return new Promise(function (resolve, reject) {
            db.run(queryString, vars, function (err) {
              if (err) return reject(err);
              resolve(undefined);
            });
          });
        }

        try {
          await backupReview();
          console.log(`review ${ii + 1} of ${reviews.length}`);
        } catch (err) {
          console.log(err);
          console.log(
            `error saving review for product ${product.id}, review id: ${review.id}`
          );
          break;
        }
      }
    } catch (err) {
      console.log(err);
      continue;
    }
  }
}
main();
