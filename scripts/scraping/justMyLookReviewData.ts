import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const filePath = path.resolve(__dirname, "jml-input.json");
const encoding = "utf-8";

type ReviewData = {
  name: string;
  price: number;
  barcode: string;
  url: string;
  retail_price: number;
  review_count: number;
};

function loadData(): ReviewData[] {
  return JSON.parse(
    fs.readFileSync(filePath, {
      encoding,
    })
  );
}

function saveData(data: ReviewData[]) {
  fs.writeFileSync(filePath, JSON.stringify(data), { encoding });
}

async function main() {
  try {
    const data = loadData();
    let browser = await puppeteer.launch({headless:true});
    let page = await browser.newPage();
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];
      await page.goto(row.url, { waitUntil: 'networkidle2' });
      row.retail_price = await page.evaluate(function():number{
        const rrpELem = document.querySelector(".js-quick-add-context-product-info-container .block s")
        if(!rrpELem) return 0
        const rrpTextContent = rrpELem.textContent
        if(!rrpTextContent) return 0
        try{
            return parseFloat(rrpTextContent.replace("€", "").replace(",", "."))
        } catch{
            return 0
        }
      })
      row.review_count = await page.evaluate(function():number{
        const reviewCountElem = document.querySelector(".js-quick-add-context-product-info-container .ruk-rating-snippet-count")
        if(!reviewCountElem) return 0
        const reviewCountTextContent = reviewCountElem.textContent
        if(!reviewCountTextContent) return 0
        const match = reviewCountTextContent.match(/[0-9]+/)
        if(!match) return 0;
        try {
            return parseInt(match[0])
        } catch {
            return 0
        }
      })
      saveData(data)
    }
  } catch (err) {
    console.log(err);
  }
}
main();
