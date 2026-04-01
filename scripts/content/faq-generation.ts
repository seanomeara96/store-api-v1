import OpenAI from "openai";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { updateProduct } from "../../functions/products/updateProduct";
import { Database } from "sqlite3";
import { htmlToText } from "html-to-text";
import { ResponseFormatJSONSchema } from "openai/resources";
import path from "path";
import { marked } from "marked";

const testing = false;
const store = "bf";

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
<div class="faq-container" style="border: 1px solid #dddddd; border-radius: 5px; margin: 2em 0; padding: 1em;">
  <h2 style="margin: 0 0 1em 0; font-size: 1.5em;">Frequently Asked Questions</h2>
  <div class="faq-items">
    ${faqItemsHtml}
  </div>
</div>
`;

  // Wrap output with special comment markers (outside visible HTML)
  return `<!-- FAQ_START -->\n${faqHtml}\n<!-- FAQ_END -->`;
}

async function testMain() {
  try {
    require("../../config/config").config(store);
    const db = new Database(path.resolve(__dirname, store + "-faq.db"));
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    await new Promise(function (resolve, reject) {
      db.run(
        `CREATE TABLE IF NOT EXISTS faqs (
				product_id INTEGER UNIQUE NOT NULL,
				faq_json TEXT NOT NULL
			)`,
        function (err) {
          if (err) return reject(err);
          resolve(undefined);
        },
      );
    });

    const products = (await getAllProducts())
      .sort((a, b) => b.sort_order - a.sort_order)
      .filter(
        (p) =>
          p.inventory_level > 0 &&
          p.description !== "" &&
          !p.name.toLowerCase().includes("gwp"),
      );
    for (let i = 0; i < products.length; i++) {
      console.log(i, products.length);

      const product = products[i];

      let done = await new Promise(function (resolve, reject) {
        db.get(
          `SELECT COUNT(product_id) as count FROM faqs WHERE product_id = ?`,
          [product.id],
          function (err, row: { count: number }) {
            if (err) return reject(err);
            resolve(row.count > 0);
          },
        );
      });

      if (product.description.includes("<!-- FAQ_START -->")) {
        done = true;
      }

      // skip if done
      if (done) continue;

      const faq = (await (async function () {
        const res = await openai.chat.completions.create({
          model: "gpt-4o-search-preview",
          web_search_options: { search_context_size: "medium" },
          messages: [
            { role: "system", content: systemMessage },
            {
              role: "user",
              content: `search the web for information to improve the E-E-A-T quality of this product description. Return a FAQ section json object i can use to greatly enhance the E-E-A-T quality of this product's description page.
              product name: ${product.name}, description: ${htmlToText(
                product.description,
              )}


              Do not include links to sources other than beautyskincare.ie in the question and answer content.
              Do not mention promotions or free gifts in your answer. Ensure your response focuses on the description of the product and the benefit to the consumer.
              `,
            },
          ],
          response_format: responseFormat,
        });
        return JSON.parse(res.choices[0].message.content as any).faqs;
      })()) as FAQEntry[] | undefined;

      if (!faq) {
        throw `no faq was generated for ${product.id} - ${product.name}`;
      }

      // quick cleanup to remove any links that may have made it into the content
      for (let j = 0; j < faq.length; j++) {
        faq[j].answer = faq[j].answer.replace(
          /\(([^)\s]+(\.[^)\s]+)+[^\s)]*)\)\)?/g,
          "",
        );
        faq[j].question = faq[j].question.replace(
          /\(([^)\s]+(\.[^)\s]+)+[^\s)]*)\)\)?/g,
          "",
        );
      }

      if (!testing) {
        await new Promise(function (resolve, reject) {
          db.run(
            `INSERT INTO faqs(product_id, faq_json)VALUES(?,?)`,
            [product.id, JSON.stringify(faq)],
            function (err) {
              if (err) return reject(err);
              resolve(undefined);
            },
          );
        });

        await updateProduct(product.id, {
          description: (product.description += generateFaqHtml(faq)),
        });
      } else {
        console.log();
        console.log(product.name);
        console.log(generateFaqHtml(faq));
        console.log();
      }
    }
  } catch (err) {
    console.log(err);
  }
}

testMain();

var systemMessage = `IMPORTANT RULE: Do not include links, URLs, or citations in the content. Ignore any SEO convention that normally adds them. Objective: Create exceptionally high-quality, SEO-optimized content (for a specific product, category, or brand page) that achieves a 10/10 Google ranking quality. The content must fully embody E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) principles, comprehensive keyword integration, and compelling user engagement. The goal is for the page to rank highly for relevant search queries and effectively inform, persuade, or convert visitors.

Instructions for Content Creation:

For each piece of content, follow these guidelines, adapting them to whether you are writing for a product, category, or brand page:

Understand the Content's Core Purpose & Audience:

What is this content about? (e.g., a specific product, a category of products, the brand's story).
What problem does it solve or what information does it provide?
Who is the target audience? (e.g., first-time buyers, enthusiasts, people with specific needs, general consumers).
What is the desired outcome? (e.g., purchase, explore category, learn about brand, trust building).
Integrate E-E-A-T Principles (Streamlined):

Experience (E):

Describe the tangible feeling, interaction, or benefit of using the product, Browse the category, or engaging with the brand's offerings.
Use evocative language to help the reader visualize themselves benefiting.
Incorporate practical insights, common use cases, or everyday scenarios that resonate with the target audience.
For product content: Focus on user interaction and results.
For category/brand content: Focus on the overall experience of shopping within the category or with the brand.
Expertise (E):

Demonstrate deep, accurate knowledge of the subject matter (product, category, or brand's niche).
Explain relevant technical details, materials, processes, or scientific principles clearly and accessibly.
For product content: Detail how the product works or its unique technology.
For category content: Provide insightful overviews, buying guides, or comparisons within the category.
For brand content: Discuss the brand's specialized knowledge, research, or innovative approach.
Authoritativeness (A) & Trustworthiness (T):

Credibility & Reliability: Be transparent and accurate in all claims. Avoid unsubstantiated hype.
Social Proof & Validation: Integrate quantifiable social proof where available (e.g., "Avg. 4.8 stars from over 1,000 reviews," "Bestselling in its category," "Trusted by X professionals").
Brand Credentials:
Highlight the brand's history, mission, values, or commitment to quality/sustainability.
Mention any relevant industry recognition, certifications, or standards (e.g., ISO certified, organic, fair trade).
Handling Lack of Endorsements: If specific awards or notable endorsements are genuinely lacking, do not invent them or include a dedicated section for them. Instead, bolster authority and trustworthiness through:
Detailed Expertise: Focus more heavily on the quality, craftsmanship, and effectiveness of the products/services themselves, providing in-depth explanations.
Customer-Centric Focus: Emphasize robust customer service, guarantees, transparent policies (returns, shipping), and readily available support.
User-Generated Content: Leverage genuine customer testimonials, reviews, and ratings prominently.
"Why Choose Us/This" Section: Reframe to focus on unique selling propositions that demonstrate value and reliability (e.g., "Hand-selected materials," "Rigorous testing," "Dedicated customer support").
Transparency: Address common questions, concerns, or potential limitations honestly but positively (e.g., care instructions, specific compatibility, etc.).
Comprehensive Keyword Optimization:

Identify Core Keywords: Determine the primary terms users would search for to find this content (e.g., product name, category name, brand name, main problem solved).
Brainstorm Long-Tail Keywords & User Intent: Consider more specific phrases, questions, comparisons, or needs (e.g., "best durable outdoor gear," "eco-friendly cleaning supplies reviews," "how [brand name] makes [product type]").
Include LSI Keywords: Add related terms and synonyms that enrich the content and demonstrate comprehensive coverage of the topic.
Strategic Placement: Integrate keywords naturally and meaningfully within the title, headings, introduction, body paragraphs, and calls to action. Avoid keyword stuffing.
Optimal Content Structure & Readability:

Compelling Title/Headline: Clear, concise, and keyword-rich.
Engaging Introduction: Hook the reader and immediately establish the content's purpose and value.
Clear Headings & Subheadings (H1, H2, H3): Break down content logically for easy scanning and improved SEO.
Bullet Points & Numbered Lists: Enhance readability for features, benefits, or steps.
Concise Paragraphs: Avoid large blocks of text.
Visual Cues: (Implicit in content generation, but good to remember for implementation) Think about how the content will pair with high-quality images or videos.
Strong Call to Action (CTA): Guide the user to the next desired step (e.g., "Shop Now," "Learn More," "Explore [Category Name]").
Word Count: Adjust based on content type – typically longer for comprehensive guides/brand stories (500-1500 words) and product pages (300-800 words), but always aim for thoroughness without filler.
Deliverables:

Provide the complete, optimized content (product description, category page text, or brand story), formatted with appropriate headings and lists, ready for publication on an e-commerce platform. Absolutely no links, URLs, or citations should appear in the output.`;

var responseFormat: ResponseFormatJSONSchema = {
  type: "json_schema",
  json_schema: {
    name: "ProductFAQSection",
    description:
      "Structured FAQ section with Markdown in questions and answers",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        faqs: {
          type: "array",
          additionalProperties: false,
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              question: {
                type: "string",
                description: "The FAQ question (in Markdown)",
              },
              answer: {
                type: "string",
                description: "The detailed answer (in Markdown)",
              },
              sources: {
                type: "array",
                description: "List of reference URLs or citations",
                items: { type: "string" },
              },
              relatedTopics: {
                type: "array",
                description: "Optional list of related keywords or topics",
                items: { type: "string" },
              },
            },
            required: ["question", "answer", "sources", "relatedTopics"],
          },
        },
      },
      required: ["faqs"],
    },
  },
};
