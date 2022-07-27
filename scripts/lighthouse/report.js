const puppeteer = require("puppeteer");
const lighthouse = require("lighthouse");
const { URL } = require("url");
const { getAllLiveUrls } = require("../urls/getAllLiveUrls");

(async () => {
  const urls = (await getAllLiveUrls("fs")).map((r) => r.url);

  // Use Puppeteer to launch headful Chrome and don't use its default 800x600 viewport.
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const responses = await Promise.all(
    urls.map((url) =>
      lighthouse(url, {
        port: new URL(browser.wsEndpoint()).port,
        output: "json",
        logLevel: "silent",
      })
    )
  );

  const results = responses.map((response) => response.lhr);

  console.log(results);

  return;
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

    console.log(d);
  }

  await browser.close();
})();
