const puppeteer = require("puppeteer");
(async () => {
  const data = [
    {
      url: "https://dcphysiotherapy.ie/team/",
      name: "team",
    },
    {
      url: "https://dcphysiotherapy.ie/book-an-appointment/",
      name: "book-an-appointment",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/chronic-pain/",
      name: "chronic-pain",
    },
    {
      url: "https://dcphysiotherapy.ie/conditions-we-treat/",
      name: "conditions-we-treat",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/sports-physiotherapy/",
      name: "sports-physiotherapy",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/spinal-mobilisations/",
      name: "spinal-mobilisations",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/arthritis-osteoarthritis/",
      name: "arthritis-osteoarthritis",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/sciatica/",
      name: "sciatica",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/degenerative-disc-disease/",
      name: "degenerative-disc-disease",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/tendonitis/",
      name: "tendonitis",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/ankle-sprain/",
      name: "ankle-sprain",
    },
    {
      url: "https://dcphysiotherapy.ie/",
      name: "dcphysiotherapy.ie",
    },
    {
      url: "https://dcphysiotherapy.ie/pricing/",
      name: "pricing",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/occupational-injuries/",
      name: "occupational-injuries",
    },
    {
      url: "https://dcphysiotherapy.ie/about-us/",
      name: "about-us",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/low-back-pain/",
      name: "low-back-pain",
    },
    {
      url: "https://dcphysiotherapy.ie/contact/",
      name: "contact",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/deep-tissue-massage/",
      name: "deep-tissue-massage",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/lumbar-disc-herniation/",
      name: "lumbar-disc-herniation",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/neck-pain/",
      name: "neck-pain",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/spinal-manipulation/",
      name: "spinal-manipulation",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/dry-needling-trigger-point-therapy/",
      name: "dry-needling-trigger-point-therapy",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/whiplash/",
      name: "whiplash",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/non-surgical-spinal-decompression/",
      name: "non-surgical-spinal-decompression",
    },
    {
      url: "https://dcphysiotherapy.ie/pf/bulging-discs/",
      name: "bulging-discs",
    },
  ];

  const browser = await puppeteer.launch({
    headless: false,
    timeout: 100000,
  });

  function runTest(url, name) {
    return new Promise(async (resolve, reject) => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });

      await page.goto(url, {
        waitUntil: "networkidle2",
      });
      //await page.waitFor(500);

      await page.screenshot({
        path: `./dcphysio-shots/${name}.png`,
        fullPage: true,
      });
      resolve()
    });
  }

  for (const page of data) {
    await runTest(page.url, page.name);
  }

 await browser.close();
})();
