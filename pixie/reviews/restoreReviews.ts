import { Database } from "sqlite3";
import path from "path";
import { createReview } from "../../functions/reviews/createReview";
import { ReviewCreateParams } from "../../functions/reviews/Review";
const db = new Database(path.resolve(__dirname, "./main.db"));

require("../../config/config").config("px");

interface RevieweBackup {
  title: string;
  text: string;
  status: "approved" | "disapproved" | "pending";
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  email: string;
  name: string;
  date_reviewed: string;
  id: number;
  product_id: number;
  date_created: string;
  date_modified: string;
}

function getRandomDateLastThreeYears() {
  const currentDate = new Date();
  const threeYearsAgo = new Date(currentDate);
  threeYearsAgo.setFullYear(currentDate.getFullYear() - 3);

  const randomTime =
    Math.random() * (currentDate.getTime() - threeYearsAgo.getTime()) +
    threeYearsAgo.getTime();
  const randomDate = new Date(randomTime);

  return randomDate;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  while (true) {
    const count = (await new Promise(function (resolve, reject) {
      db.get(
       `SELECT count(id) as count 
        FROM review_backups 
        WHERE restored = FALSE`,
        (err, row: any) => (err ? reject(err) : resolve(row.count as number))
      );
    })) as number;

    console.log(`${count} reviews are left to restore`);

    const reviewBackup = (await new Promise((resolve, reject) => {
      db.get(
       `SELECT *
        FROM review_backups
        WHERE restored = FALSE
        LIMIT 1;`,
        (err, row: RevieweBackup) => (err ? reject(err) : resolve(row))
      );
    })) as RevieweBackup;

    if (!reviewBackup) {
      break;
    }

    const params: ReviewCreateParams = {
      title: reviewBackup.title,
      text: reviewBackup.text,
      status: reviewBackup.status,
      rating: reviewBackup.rating,
      name: reviewBackup.name,
      date_reviewed: getRandomDateLastThreeYears(),
    };

    try {
      await createReview(reviewBackup.product_id, params);
    } catch (err: any) {
      if (err.response.status === 429) {
        await wait(2000);
      } else {
        console.log(err);
      }
      continue;
    }

    await new Promise(function (resolve, reject) {
      db.run(
        `UPDATE review_backups SET restored = TRUE WHERE id = ?`,
        [reviewBackup.id],
        (err) => (err ? reject(err) : resolve(undefined))
      );
    });
  }

  await wait(500);
}

main();
