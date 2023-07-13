require("../config/config").config("px", 2);
import { Configuration, OpenAIApi } from "openai";
import { Database } from "sqlite3";
import path from "path";
import { convert } from "html-to-text";
import { BlogPost } from "../functions/blogs/BlogPost";
import { getAllBlogs } from "../functions/blogs/getAllBlogs";
const db = new Database(path.join(__dirname, "main.db"));

function initDB() {
  return new Promise(function (resolve, reject) {
    db.exec(
      `CREATE TABLE IF NOT EXISTS blog_content_audit(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            blog_id INTEGER NOT NULL,
            misrepresentation_confidence_score INTEGER NOT NULL
        )`,
      (err) => (err ? reject(err) : resolve(undefined))
    );
  });
}

function getPreviouslyScoredBlogs(): Promise<number[]> {
  return new Promise(function (resolve, reject) {
    db.all(`SELECT blog_id FROM blog_content_audit`, function (err, rows) {
      if (err) return reject(err);
      resolve(rows.map((row: any) => row.blog_id) as number[]);
    });
  });
}

function storeResults(
  blog_id: number,
  misrepresentation_confidence_score: number
) {
  return new Promise(function (resolve, reject) {
    db.run(
      `INSERT INTO blog_content_audit(blog_id, misrepresentation_confidence_score) VALUES (?, ?)`,
      [blog_id, misrepresentation_confidence_score],
      (err) => (err ? reject(err) : resolve(undefined))
    );
  });
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function main() {
  try {
    await initDB();
    const scoredBlogIds: number[] = await getPreviouslyScoredBlogs();
    const previouslyScored = (p: BlogPost) => !scoredBlogIds.includes(p.id);
    const blogsToScore = (await getAllBlogs()).filter(previouslyScored);

    for (let i = 0; i < blogsToScore.length; i++) {
      console.log(`product ${i + 1} of ${blogsToScore.length}`);
      const blog = blogsToScore[i];
      const content = convert(blog.body);
      const questionContent = `Respond only with an integer. On a scale from 1 to 10 (10 being most confident) how confident are you that this blog content does not violate the google merchant center's misrepresentation policy?
        Blog content: """${content}"""`;
      let response;
      try {
        response = await openai.createChatCompletion({
          model: "gpt-4",
          messages: [{ role: "user", content: questionContent }],
        });
      } catch (err) {
        i--;
        await new Promise((resolve) => setTimeout(resolve, 3 * 1000));
        continue;
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const score = parseInt(response!.data!.choices![0].message!.content!);
      await storeResults(blog.id, score);
    }
  } catch (err) {
    console.log(err);
  }
}
main();
