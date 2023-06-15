import sqlite from "sqlite3";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { createReview } from "../../functions/reviews/createReview";
import { ReviewCreateParams } from "../../functions/reviews/Review";
import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";

require("../../config/config").config("px");

const db = new sqlite.Database("./main.db");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

interface StoredReview {
  id: number;
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
    db.get(
      `SELECT * FROM reviews WHERE updated = 0 AND error = 0 LIMIT 1`,
      (err, row) => (err ? reject(err) : resolve(row as StoredReview))
    )
  );
}

function getReviewCount(): Promise<number> {
  return new Promise((resolve, reject) =>
    db.get(
      `SELECT count(id) AS count FROM reviews WHERE updated = 0 AND error = 0`,
      (err, row) =>
        err ? reject(err) : resolve((row as { count: number }).count)
    )
  );
}

function setReviewUpdated(review: StoredReview) {
  return new Promise((resolve, reject) =>
    db.run(`UPDATE reviews SET updated = 1 WHERE id = ?`, [review.id], (err) =>
      err ? reject(err) : resolve(true)
    )
  );
}

function setReviewErrored(review: StoredReview) {
  return new Promise((resolve, reject) =>
    db.run(`UPDATE reviews SET error = 1 WHERE id = ?`, [review.id], (err) =>
      err ? reject(err) : resolve(true)
    )
  );
}

function responseText(response: CreateCompletionResponse) {
  return response.choices[0].text;
}

async function main() {
  let count = 1;
  const total = await getReviewCount();
  console.log(`transferring ${total} reviews`);
  while (true) {
    console.log(`transerring ${count} of ${total}`);
    let review;
    try {
      review = await getNextReview();
      console.log(`fetched original review`, review);
    } catch (err) {
      console.log(err);
      break;
    }

    let product;
    try {
      product = await getProductBySku(review.sku);
      console.log(
        `fetched product https://pixieloves.ie${product.custom_url.url}`
      );
    } catch (err) {
      await setReviewErrored(review);
      continue;
    }

    let contentRewriteResponse;
    try {
      contentRewriteResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Rewrite this product review. Fix grammar and add enthusiasm and positive sentiment. """${review.text}"""`,
        max_tokens: 2000,
        temperature: 0,
      });
    } catch (err: any) {
      console.log(err.response?.data || err);
      continue;
    }

    const newContent = responseText(contentRewriteResponse.data)?.trim();

    let titleRewriteResponse;
    try {
      titleRewriteResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Write a short title for this review """${newContent}"""`,
        max_tokens: 2000,
        temperature: 0,
      });
    } catch (err: any) {
      console.log(err.response?.data || err);
      continue;
    }

    const newTitle = responseText(titleRewriteResponse.data)?.trim();

    try {
      const dateString = review.date_reviewed
      const [day, month, year, hours, minutes] = dateString.split(/\/|\s|:/);

      // Note: Months in JavaScript's Date object are zero-based, so we need to subtract 1 from the month value
      const dateObject = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
      

      const newReview: ReviewCreateParams = {
        name: review.name,
        title: newTitle || review.title,
        text: newContent,
        status: "approved",
        rating: parseInt(review.rating) as 0 | 1 | 2 | 3 | 4 | 5,
        date_reviewed: dateObject,
      };

      console.log(`fetched new review`, newReview);
      await createReview(product.id, newReview);
      await setReviewUpdated(review);
      console.log("review created");
      count++;
    } catch (err: any) {
      console.log(err.response?.data || err);
    }
  }
}
main();
