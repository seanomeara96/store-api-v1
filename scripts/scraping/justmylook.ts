import puppeteer, { Browser, Page } from "puppeteer";
import fs from "fs";
import path from "path";

// --- Configuration ---
const BASE_URL = "https://www.justmylook.com";
const DATA_FILE = path.resolve(__dirname, "just-my-look.json");
const CONCURRENCY = 8; // Number of products to scrape in parallel
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
const TARGET_BADGES = ["viral", "bestseller"]; // Badges to look for (lowercase)
const targetBadgeRequired = false;
const PAGE_TIMEOUT = 60000 * 2; // Increased timeout to 60 seconds
const RETRY_COUNT = 3; // Number of times to retry a failed page load
const RETRY_DELAY = 3000; // Delay in ms between retries

// --- Type Definitions ---

// Defines the structure for the JSON-LD Product data we expect to find
interface LdJsonProduct {
  "@context": string;
  "@type": "Product";
  name?: string;
  url?: string;
  offers?: {
    "@type": "Offer";
    price?: string;
    gtin13?: string;
  }[];
}

// Defines the structure for the data we save for each product
type ProductData = {
  name: string;
  price: string;
  barcode: string;
  url: string;
};

// Defines the main data structure for our JSON output file
type ScrapedData = {
  [pageUrl: string]: ProductData[];
};

// --- File I/O Functions ---

/**
 * Saves the scraped data to a JSON file.
 * @param {ScrapedData} data - The data object to save.
 */
function saveData(data: ScrapedData) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), {
    encoding: "utf-8",
  });
}

/**
 * Loads existing data from the JSON file.
 * @returns {ScrapedData} The existing data or an empty object.
 */
function getData(): ScrapedData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, { encoding: "utf-8" });
      return JSON.parse(fileContent) as ScrapedData;
    }
    return {};
  } catch (err) {
    console.log("No valid data file found, starting fresh.");
    return {};
  }
}

// --- Scraping Functions ---

/**
 * Scrapes a single product page with a retry mechanism.
 * @param {Page} page - The Puppeteer page instance to use.
 * @param {string} productUrl - The URL of the product page to scrape.
 * @returns {Promise<ProductData | null>} The extracted product data or null if failed.
 */
async function scrapeProduct(
  page: Page,
  productUrl: string,
): Promise<ProductData | null> {
  for (let attempt = 1; attempt <= RETRY_COUNT; attempt++) {
    try {
      await page.goto(productUrl, {
        waitUntil: "networkidle2",
        timeout: PAGE_TIMEOUT,
      });
      await page.waitForSelector('script[type="application/ld+json"]', {
        timeout: 15000,
      });

      const structuredData = await page.evaluate((): LdJsonProduct | null => {
        const scripts = document.querySelectorAll(
          'script[type="application/ld+json"]',
        );
        for (const script of scripts) {
          try {
            if (script.textContent) {
              const data = JSON.parse(script.textContent);
              if (data["@type"] === "Product" && Array.isArray(data.offers)) {
                return data;
              }
            }
          } catch (e) {
            // Ignore parsing errors for irrelevant scripts
          }
        }
        return null;
      });

      if (structuredData?.offers?.[0]) {
        return {
          name: structuredData.name || "Unknown Product",
          price: structuredData.offers[0].price || "0.00",
          barcode: structuredData.offers[0].gtin13 || "N/A",
          url: structuredData.url || productUrl,
        };
      }

      console.warn(`Could not find valid product schema at ${productUrl}`);
      return null; // Return null if schema not found, don't retry
    } catch (error) {
      console.error(
        `Attempt ${attempt} failed for ${productUrl}:`,
        error instanceof Error ? error.message : String(error),
      );
      if (attempt < RETRY_COUNT) {
        console.log(`Retrying in ${RETRY_DELAY / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else {
        console.error(`All ${RETRY_COUNT} attempts failed for ${productUrl}.`);
      }
    }
  }
  return null; // Return null after all retries have failed
}
/**
 * Scrapes a batch of product URLs concurrently.
 * @param {Browser} browser - The Puppeteer browser instance.
 * @param {string[]} productUrls - An array of product URLs to scrape.
 * @returns {Promise<ProductData[]>} A promise that resolves to an array of scraped product data.
 */
async function scrapeProductsBatch(
  browser: Browser,
  productUrls: string[],
): Promise<ProductData[]> {
  const results: ProductData[] = [];

  for (let i = 0; i < productUrls.length; i += CONCURRENCY) {
    const batch = productUrls.slice(i, i + CONCURRENCY);
    console.log(
      `  Processing batch ${Math.floor(i / CONCURRENCY) + 1}/${Math.ceil(productUrls.length / CONCURRENCY)} (${batch.length} products)`,
    );

    const batchPromises = batch.map(async (url) => {
      const page = await browser.newPage();
      await page.setExtraHTTPHeaders({ "User-Agent": USER_AGENT });
      // Block images and stylesheets for performance
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        if (["image", "stylesheet", "font"].includes(req.resourceType())) {
          req.abort();
        } else {
          req.continue();
        }
      });

      try {
        const result = await scrapeProduct(page, url);
        if (result) {
          console.log(`    ✓ ${result.name.substring(0, 50)}...`);
        } else {
          console.log(`    ✗ Failed: ${url}`);
        }
        return result;
      } finally {
        await page.close();
      }
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(
      ...batchResults.filter(
        (result): result is ProductData => result !== null,
      ),
    );

    // A small, polite delay between batches
    if (i + CONCURRENCY < productUrls.length) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }

  return results;
}

/**
 * Main function to orchestrate the scraping process.
 */
async function justMyLookScraper() {
  console.log("🚀 Starting Just My Look scraper...");
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  });

  const data = getData();

  try {
    const mainPage = await browser.newPage();
    await mainPage.setExtraHTTPHeaders({ "User-Agent": USER_AGENT });

    for (let pageNumber = 1; ; pageNumber++) {
      const collectionUrl = `${BASE_URL}/collections/korean-beauty-view-all?page=${pageNumber}`;
      console.log(`\n=== Processing Collection Page ${collectionUrl} ===`);

      if (data[collectionUrl]) {
        console.log(`Page ${pageNumber} already processed. Skipping...`);
        continue;
      }

      await mainPage.goto(collectionUrl, {
        waitUntil: "networkidle2",
        timeout: PAGE_TIMEOUT,
      });

      // Get all product links that have one of the target badges
      const productLinks = await mainPage.evaluate(
        (targetBadges: string[], targetBadgeRequired: boolean) => {
          const productCards = document.querySelectorAll(
            "main section .card-wrapper",
          );
          const links: string[] = [];

          productCards.forEach((card) => {
            // const hasTargetBadge = Array.from(card.querySelectorAll(".badge__container"))
            //   .some(badge => targetBadges.includes(badge.textContent?.trim().toLowerCase() || ""));

            // not filtering this time
            let hasTargetBadge = true;
            // This condition makes sense: if badge filtering isn't required, include all products; otherwise include only those with a target badge.
            if (!targetBadgeRequired || hasTargetBadge) {
              const linkElement = card.querySelector(
                "main section .card__heading a",
              ) as HTMLAnchorElement;
              if (linkElement?.href) {
                links.push(linkElement.href);
              }
            }
          });
          return links;
        },
        TARGET_BADGES,
        targetBadgeRequired,
      );

      if (productLinks.length === 0) {
        console.log(
          "No more products with target badges found. Ending pagination.",
        );
        break; // Exit the loop if no relevant products are on the page
      }

      console.log(`Found ${productLinks.length} products with target badges.`);
      const pageData = await scrapeProductsBatch(browser, productLinks);

      data[collectionUrl] = pageData;
      console.log(
        `\nPage ${pageNumber} complete: ${pageData.length}/${productLinks.length} products saved.`,
      );
      saveData(data);
    }

    await mainPage.close();
  } catch (err) {
    console.error("\n❌ An unexpected error occurred during scraping:", err);
  } finally {
    await browser.close();
    console.log("\n🎉 Scraping complete! Browser closed.");
  }
}

// --- Start Script ---
justMyLookScraper();
