const puppeteer = require("puppeteer");
const lighthouse = require("lighthouse");
const { URL } = require("url");
const { output } = require("../utils/output");
// const { getAllLiveUrls } = require("../urls/getAllLiveUrls"); // (await getAllLiveUrls("fs")).map((r) => r.url);

const urls = [
  "https://www.hireall.ie/",

  "https://www.hireall.ie/conference-exhibitions/",
  "https://www.hireall.ie/corporate-hospitality/",
  "https://www.hireall.ie/event-seating/",
  "https://www.hireall.ie/exam-furniture/",
  "https://www.hireall.ie/hotel-venues/",
  "https://www.hireall.ie/live-events/",
  "https://www.hireall.ie/private-parties-weddings/",
  "https://www.hireall.ie/?ctk=197906db-8f17-4092-8ac5-a181e8fe1c5c#",
  "https://www.hireall.ie/event-kitchens/",
  "https://www.hireall.ie/?ctk=197906db-8f17-4092-8ac5-a181e8fe1c5c#",
  "https://www.hireall.ie/the-irish-open-gallery/",
];

const desktopConfig = {
  extends: "lighthouse:default",
  settings: {
    formFactor: "desktop",
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
  },
};

const results = [];

(async () => {
  // Use Puppeteer to launch headful Chrome and don't use its default 800x600 viewport.
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  for (const url of urls) {
    // Lighthouse will open the URL.
    // Puppeteer will observe `targetchanged` and inject our stylesheet.
    const { lhr } = await lighthouse(url, {
      port: new URL(browser.wsEndpoint()).port,
      output: "json",
      logLevel: "silent",
    });

    const d = {
      url,
    };

    Object.values(lhr.categories).forEach((c) => {
      d[c.title] = c.score;
    });

    results.push(d);
  }

  await browser.close();

  await output(`lh-reports`, results);

  console.log("done");
})();
