import sqlite from "sqlite3";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { createReview } from "../../functions/reviews/createReview";
import { ReviewCreateParams } from "../../functions/reviews/Review";

const db = new sqlite.Database("./main.db");

interface StoredReview {
  date_reviewed: string;
  status: string;
  rating: string;
  title: string;
  text: string;
  name: string;
  sku: string;
  updated?: number; // Optional property with a default value
}

function getNextReview(): Promise<StoredReview> {
  return new Promise((resolve, reject) =>
    db.get(`SELECT * FROM reviews WHERE updated = 0 LIMIT 1`, (err, row) =>
      err ? reject(err) : resolve(row as StoredReview)
    )
  );
}

async function main() {
  while (true) {
    const review: StoredReview = await getNextReview();

    const product = await getProductBySku(review.sku);

    createReview(product.id, {
      name: review.name,
      title: review.title,
      text: review.text,
      status: "approved",
      rating: parseInt(review.rating) as 0 | 1 | 2 | 3 | 4 | 5,
      date_reviewed: review.date_reviewed,
    });
  }
}
main();
