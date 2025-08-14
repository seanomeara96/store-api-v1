import { Database } from "sqlite3";
import path from "path";
import puppeteer, { Page } from "puppeteer";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
const db = new Database(path.resolve(__dirname, "boots.db"));

// ✅ Promisify helpers
function run(sql: string, params: any[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
}

function get<T>(sql: string, params: any[] = []): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row: T) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function all<T>(sql: string, params: any[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows: T[]) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// ✅ Create
async function createPage(page: Resource): Promise<void> {
  await run(
    `
    INSERT INTO pages (
      PR, URL, Title, "Content type", "Is rendered page",
      "HTTP status code", "Organic traffic", Depth,
      "Is indexable page", "No. of all inlinks",
      "First found at", "Schema items", scrape_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      page.PR,
      page.URL,
      page.Title,
      page.ContentType,
      page.IsRenderedPage,
      page.HTTPStatusCode,
      page.OrganicTraffic,
      page.Depth,
      page.IsIndexablePage,
      page.NumAllInlinks,
      page.FirstFoundAt,
      page.SchemaItems,
      page.scrape_status ? 1 : 0,
    ]
  );
}

// ✅ Update status
async function updateScrapeStatus(url: string, status: boolean): Promise<void> {
  await run(
    `
    UPDATE pages SET scrape_status = ? WHERE URL = ?
    `,
    [status ? 1 : 0, url]
  );
}

async function getNextUnscrapedPages(count: number): Promise<Resource[]> {
  return all<Resource>(
    `
    SELECT 
      PR, URL, Title,
      "Content type" AS ContentType,
      "Is rendered page" AS IsRenderedPage,
      "HTTP status code" AS HTTPStatusCode,
      "Organic traffic" AS OrganicTraffic,
      Depth,
      "Is indexable page" AS IsIndexablePage,
      "No. of all inlinks" AS NumAllInlinks,
      "First found at" AS FirstFoundAt,
      "Schema items" AS SchemaItems,
      scrape_status
    FROM pages
    WHERE scrape_status = 0
    LIMIT ?
    `,
    [count]
  );
}

interface Resource {
  PR: string;
  URL: string;
  Title: string;
  ContentType: string;
  IsRenderedPage: string;
  HTTPStatusCode: string;
  OrganicTraffic: string;
  Depth: string;
  IsIndexablePage: string;
  NumAllInlinks: string;
  FirstFoundAt: string;
  SchemaItems: string;
  scrape_status: boolean;
}

async function scrapePage(tab: Page, page: Resource) {
  if (!tab) {
    throw new Error("how on earth could tab be undefined");
  }

  console.log();
  console.log(`[INFO] Preparing to scrape: ${page.URL}`);

  try {
    await tab.goto(page.URL, {
      waitUntil: "networkidle0",
    });
  } catch (err: any) {
    if (err.message.includes("TOO_MANY_REDIRECTS")) {
      console.log(`[SKIPPING] Too many redirects: ${page.URL}`);
      await updateScrapeStatus(page.URL, true);
      return;
    }
  }

  let isProductPage = await tab.evaluate(function () {
    const elem = document.querySelector(
      `meta[name="pageName"]`
    ) as HTMLMetaElement;
    return elem?.content === "ProductPage";
  });

  if (!isProductPage) {
    console.log(`[SKIPPING] Not a product page: ${page.URL}`);
    await updateScrapeStatus(page.URL, true);
    return;
  }

  try {
    await tab.waitForSelector('[data-bv-show="rating_summary"]');
  } catch {
    console.log(`[SKIPPING] No rating summary available: ${page.URL}`);
    await updateScrapeStatus(page.URL, true);
    return;
  }
  let elem = await tab.evaluate(function () {
    const target = document.querySelector(`[data-bv-show="rating_summary"]`);
    if (!target) return undefined;
    const itemNameElem = document.querySelector("#estore_product_title h1");
    const ratingValueElem = target.querySelector(
      ".bv_avgRating_component_container"
    );
    const ratingCountElem = target.querySelector(".bv_numReviews_text");
    if (!(ratingValueElem && ratingCountElem)) return undefined;
    return {
      name: itemNameElem?.textContent || "",
      value: ratingValueElem.textContent,
      count: ratingCountElem.textContent,
    };
  });

  if (elem) {
    console.log(elem);
    await new Promise(function (resolve, reject) {
      db.run(
        `update pages set scrape_data = ? where URL = ?`,
        [JSON.stringify(elem), page.URL],
        function (err) {
          if (err) reject(err);
          else resolve(undefined);
        }
      );
    });
  }

  await updateScrapeStatus(page.URL, true);
  console.log(`[SUCCESS] Finished scraping: ${page.URL}`);
}

async function main() {
  try {
    let retries = 0;
    console.log("🚀 Starting Boots scraper...");
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

    const newTab = async () => {
      const tab = await browser.newPage();
      await tab.setUserAgent(USER_AGENT);
      return tab;
    };

    // ❌ This calls newTab() once, then fills the array with the *same* promise
    // const tabs = await Promise.all(Array(5).fill(newTab()));
    const tabs = await Promise.all(Array.from({ length: 2 }, () => newTab()));

    for (
      let pages = await getNextUnscrapedPages(2);
      pages.length;
      pages = await getNextUnscrapedPages(2)
    ) {
      try {
        const promises = [];
        for (let i = 0; i < pages.length; i++)
          promises.push(scrapePage(tabs[i], pages[i]));
        await Promise.all(promises);
      } catch (err) {
        if (retries >= 10) {
          throw err;
        }
        retries++
        continue;
      }
    }
  } catch (err) {
    console.log(err);
  }
}
main();
