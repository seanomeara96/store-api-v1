import puppeteer from "puppeteer";

async function run() {
  try {
    // Or import puppeteer from 'puppeteer-core';

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto("https://www.donedeal.ie/cars?price_to=6000&make=Opel;model:Insignia&sort=publishdatedesc");

    // Set screen size.
    await page.setViewport({ width: 1080, height: 1024 });

    await new Promise((resolve) => setTimeout(resolve, 2 * 60 * 1000));

    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

run();
