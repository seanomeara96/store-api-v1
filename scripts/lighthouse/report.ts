import puppeteer from "puppeteer";
import { URL } from "url";
import { output } from "../utils/output";
import path from "path";

const urls = [
  "https://beautyfeatures.ie",
  "https://inhealth.ie",
  "https://beautyskincare.ie",
  "https://allhair.ie",
  "https://pregnancyandbaby.ie",
  "https://babysafety.ie",
  "https://pixieloves.ie",
  "https://sleepytot.ie",
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

  const lighthouse = (await import("lighthouse")).default

  // Use Puppeteer to launch headful Chrome and don't use its default 800x600 viewport.
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  for (const url of urls) {
    // Lighthouse will open the URL.
    // Puppeteer will observe `targetchanged` and inject our stylesheet.
    const res = await lighthouse(url, {
      port: parseInt(new URL(browser.wsEndpoint()).port),
      output: "json",
      logLevel: "silent",
    });

    if (!res) {
      console.log("No result");
      return;
    }

    const { lhr } = res;

    const d: any = {
      url,
    };

    Object.values(lhr.categories).forEach((c) => {
      const title = c.title;
      d[title] = c.score;
    });

    results.push(d);
  }

  await browser.close();

  await output(path.resolve(__dirname, `lh-reports.csv`), results, true);

  console.log("done");
})();
