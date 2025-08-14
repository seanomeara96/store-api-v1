import { Database } from "sqlite3";
import { marked } from "marked";
import { getProductById } from "./functions/products/getProductById";
import { updateProduct } from "./functions/products/updateProduct";
const db = new Database("ih-faq.db");

interface ProductFAQRow {
  product_id: number;
  faq_json: FAQEntry[];
  colum: number;
}

interface FAQEntry {
  question: string;
  answer: string;
  sources: string[];
  relatedTopics: string[];
}

function generateFaqHtml(faqs: FAQEntry[]): string {
  const faqItemsHtml = faqs
    .map((faq, index) => {
      const questionHtml = marked.parseInline(faq.question);
      const answerHtml = marked.parse(faq.answer);
      const answerId = `faq-answer-${index}`;

      return `
  <div class="faq-item" style="border-top: 1px solid #eeeeee;">
    <div class="faq-question" data-faq-toggle="${answerId}" style="padding: 1em 0; cursor: pointer;">
      <h3 style="display: inline; margin: 0; font-size: 1.1em; color: #333333; font-weight: 500;">${questionHtml}</h3>
    </div>
    <div id="${answerId}" class="faq-answer" style="display: none; padding: 0.5em 0 1em 0; line-height: 1.6; color: #555555;">
      ${answerHtml}
    </div>
  </div>`;
    })
    .join("\n");

  const faqHtml = `
<div class="faq-container" style="font-family: Arial, sans-serif; border: 1px solid #dddddd; border-radius: 5px; margin: 2em 0; padding: 1em;">
  <h2 style="margin: 0 0 1em 0; font-size: 1.5em; color: #0057b8;">Frequently Asked Questions</h2>
  <div class="faq-items">
    ${faqItemsHtml}
  </div>
</div>
`;

  // Wrap output with special comment markers (outside visible HTML)
  return `<!-- FAQ_START -->\n${faqHtml}\n<!-- FAQ_END -->`;
}

// Utility to remove Markdown formatting from schema "name" field
function stripMarkdown(md: string): string {
  return md.replace(/\*\*|__|\*|_/g, "").trim();
}

// Utility to remove most HTML tags from structured answer text
function stripTags(html: string): string {
  return html.replace(/<\/?[^>]+(>|$)/g, "").trim();
}

async function main() {
  try {
    require("./config/config").config("ih");
    const rows = (await new Promise(function (resolve, reject) {
      db.all(
        "SELECT product_id, faq_json, colum FROM faqs WHERE colum = false",
        function (err, rows: any[]) {
          if (err) reject(err);
          else
            resolve(
              rows.map((r) => ({
                ...r,
                faq_json: JSON.parse(r.faq_json),
              })) as ProductFAQRow[]
            );
        }
      );
    })) as ProductFAQRow[];

    for (let i = 0; i < rows.length; i++) {
      console.log(i, rows.length);
      console.log(rows[i].product_id);
      const product = await getProductById(rows[i].product_id);
      if (!product.description.includes(`FAQ_START`)) {
        const faqSection = generateFaqHtml(
          rows[i].faq_json
        );
        await updateProduct(product.id, {
          description: (product.description += faqSection),
        });
      }
      await new Promise(function (resolve, reject) {
        db.run(
          `UPDATE faqs SET colum = true WHERE product_id = ?`,
          [product.id],
          function (err) {
            if (err) reject(err);
            else resolve(undefined);
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
  }
}

main();
