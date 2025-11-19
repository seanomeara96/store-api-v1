import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import path from "path";
puppeteer.use(StealthPlugin());

const urls = [
  "https://www.sephora.co.uk/p/glow-recipe-plum-plump-hyaluronic-moisturizer-refillable-pod",
  "https://www.sephora.co.uk/p/glow-recipe-blueberry-bounce-gentle-cleanser",
  "https://www.sephora.co.uk/p/cosrx-acne-pimple-master-patch-24-patc",
  "https://www.sephora.co.uk/p/glow-recipe-plum-plump-hyaluronic-serum",
  "https://www.sephora.co.uk/p/glow-recipe-strawberry-smooth-bha-aha-salicylic-serum",
  "https://www.sephora.co.uk/p/cosrx-aha-bha-clarifying-treatment-toner",
  "https://www.sephora.co.uk/p/glow-recipe-papaya-sorbet-enzyme-cleansing-balm",
  "https://www.sephora.co.uk/p/glow-recipe-watermelon-glow-aha-night-treatment",
  "https://www.sephora.co.uk/p/laneige-bouncy-firm-serum",
  "https://www.sephora.co.uk/p/yepoda-the-mist-have",
  "https://www.sephora.co.uk/p/cosrx-aloe-soothing-sun-cream-spf50-pa",
  "https://www.sephora.co.uk/p/yepoda-the-midnight-magic",
  "https://www.sephora.co.uk/p/laneige-sunscreen-hydro-uv-defense-ex-spf50",
  "https://www.sephora.co.uk/p/cosrx-salicylic-acid-daily-gentle-cleanser",
  "https://www.sephora.co.uk/p/erborian-centella-cleansing-oil",
  "https://www.sephora.co.uk/p/cosrx-advanced-snail-92-all-in-one-cream",
  "https://www.sephora.co.uk/p/yepoda-the-repair-hero",
  "https://www.sephora.co.uk/p/cosrx-advanced-snail-peptide-eye-cream",
  "https://www.sephora.co.uk/p/holika-holika-good-cera-super-ceramide-cream",
  "https://www.sephora.co.uk/p/yepoda-the-purify-hero",
  "https://www.sephora.co.uk/p/erborian-cc-eye-with-centella-asiatica-radiance-eye-contour-cream-10ml",
  "https://www.sephora.co.uk/p/erborian-cc-water-fresh-complexion-gel-skin-perfector-15ml",
  "https://www.sephora.co.uk/p/erborian-skin-hero-bare-skin-perfector",
  "https://www.sephora.co.uk/p/holika-holika-skin-rescuer-sheet-mask-collagen",
  "https://www.sephora.co.uk/p/cosrx-full-fit-propolis-light-c",
  "https://www.sephora.co.uk/p/erborian-centella-cleansing-gel",
  "https://www.sephora.co.uk/p/cosrx-full-fit-propolis-synergy-toner",
  "https://www.sephora.co.uk/p/yepoda-the-spot-stop",
  "https://www.sephora.co.uk/p/cosrx-bha-blackhead-power-liquid",
  "https://www.sephora.co.uk/p/cosrx-galactomyces-95-tone-balancing-essence",
  "https://www.sephora.co.uk/p/mixsoon-bean-essence",
  "https://www.sephora.co.uk/p/cosrx-hyaluronic-acid-hydra-power-essence",
  "https://www.sephora.co.uk/p/holika-holika-prime-youth-black-snail-repair-hydro-gel-mask",
  "https://www.sephora.co.uk/p/yepoda-the-make-my-day-cream",
  "https://www.sephora.co.uk/p/cosrx-centella-blemish-cream",
  "https://www.sephora.co.uk/p/erborian-yuza-double-lotion",
  "https://www.sephora.co.uk/p/cosrx-hyaluronic-acid-intensive-cream",
  "https://www.sephora.co.uk/p/cosrx-hydrium-triple-hyaluronic-moisturizing-cleanser",
  "https://www.sephora.co.uk/p/dr-jart-teatreement-soothing-spot",
  "https://www.sephora.co.uk/p/yepoda-the-timeless-moment",
  "https://www.sephora.co.uk/p/holika-holika-holi-pop-water-tint-9ml",
  "https://www.sephora.co.uk/p/cosrx-ac-collection-acne-patch-26-patc",
  "https://www.sephora.co.uk/p/holika-holika-aloe-99-soothing-gel-jelly-mask-shee",
  "https://www.sephora.co.uk/p/erborian-glow-creme-illuminating-face-cream",
  "https://www.sephora.co.uk/p/dr-jart-pore-remedy-multi-acid-radiance-peel",
  "https://www.sephora.co.uk/p/dr-jart-teatreement-moisturizer",
  "https://www.sephora.co.uk/p/erborian-matte-creme",
  "https://www.sephora.co.uk/p/holika-holika-aloe-cleansing-foam",
  "https://www.sephora.co.uk/p/cosrx-pure-fit-cica-serum",
  "https://www.sephora.co.uk/p/dr-jart-cryo-rubber-so-cool",
  "https://www.sephora.co.uk/p/cosrx-full-fit-propolis-nourishing-magnet-sheet-mask",
  "https://www.sephora.co.uk/p/erborian-yuza-super-serum-nutrishing-serum",
  "https://www.sephora.co.uk/p/erborian-cc-water-gel-skin-perfector-40ml",
  "https://www.sephora.co.uk/p/holika-holika-pure-essence-sheet-mask-lemon",
  "https://www.sephora.co.uk/p/yepoda-the-night-light",
  "https://www.sephora.co.uk/p/yepoda-the-spf-bff-spf30",
  "https://www.sephora.co.uk/p/erborian-pink-primer-care",
  "https://www.sephora.co.uk/p/holika-holika-puri-pore-no-sebum-compact-powder",
  "https://www.sephora.co.uk/p/cosrx-hydrium-triple-hyaluronic-water-wave-sheet",
  "https://www.sephora.co.uk/p/erborian-red-pepper-pulp-radiance-booster-gel-cream",
  "https://www.sephora.co.uk/p/cosrx-balancium-comfort-ceramide-cream",
  "https://www.sephora.co.uk/p/cosrx-advanced-snail-radiance-dual-essence",
  "https://www.sephora.co.uk/p/holika-holika-clearing-petit-bb-cream",
  "https://www.sephora.co.uk/p/cosrx-ultimate-moisturizing-honey-overnight-mask",
  "https://www.sephora.co.uk/p/yepoda-the-spf-bff-spf50",
  "https://www.sephora.co.uk/p/holika-holika-moisturizing-petit-bb-cream",
  "https://www.sephora.co.uk/p/cosrx-ac-collection-acne-hero-trial-kit-int",
  "https://www.sephora.co.uk/p/holika-holika-good-cera-super-ceramide-mist",
  "https://www.sephora.co.uk/p/yepoda-the-rescue-moment",
  "https://www.sephora.co.uk/p/holika-holika-3-seconds-starter-vita-complex",
  "https://www.sephora.co.uk/p/erborian-ginseng-super-serum",
  "https://www.sephora.co.uk/p/erborian-yuza-sorbet-vitamin-featherweight-emulsion",
  "https://www.sephora.co.uk/p/erborian-bamboo-super-serum",
  "https://www.sephora.co.uk/p/erborian-yuza-sorbet-eye-radiance-eye-serum",
  "https://www.sephora.co.uk/p/erborian-red-pepper-super-serum",
  "https://www.sephora.co.uk/p/holika-holika-ac-mild-red-spot-patch",
  "https://www.sephora.co.uk/p/dr-jart-dr-jart-cicapair-tiger-grass-color-correcting-treatment",
  "https://www.sephora.co.uk/p/yepoda-the-recovery-moment",
  "https://www.sephora.co.uk/p/Holika-Holika-Prime-Youth-Gold-Caviar-Gold-Foil-Mask-25g",
  "https://www.sephora.co.uk/p/cosrx-hydrium-centella-aqua-soothing-ampoule",
  "https://www.sephora.co.uk/p/erborian-matte-creme-P3256001",
  "https://www.sephora.co.uk/p/yepoda-the-sunsational",
  "https://www.sephora.co.uk/p/holika-holika-smooth-egg-skin-peeling-gel",
  "https://www.sephora.co.uk/p/holika-holika-baby-silky-foot-one-shot-peeling",
  "https://www.sephora.co.uk/p/cosrx-find-your-go-to-toner-collec",
  "https://www.sephora.co.uk/p/cosrx-two-in-one-poreless-power-liquid",
  "https://www.sephora.co.uk/p/cosrx-full-fit-propolis-light-ampoule",
  "https://www.sephora.co.uk/p/erborian-milk-peel-mask",
  "https://www.sephora.co.uk/p/holika-holika-aqua-petit-bb-cream",
  "https://www.sephora.co.uk/p/holika-holika-puri-pore-no-sebum-primer-deep-pore",
  "https://www.sephora.co.uk/p/holika-holika-pig-nose-clear-black-head-3-step-kit-honey-gold",
  "https://www.sephora.co.uk/p/cosrx-one-step-green-hero-calming-pad-7",
  "https://www.sephora.co.uk/p/cosrx-ac-collection-blemish-spot-clearing-serum",
  "https://www.sephora.co.uk/p/cosrx-pimple-master-patc",
  "https://www.sephora.co.uk/p/cosrx-ac-collection-lightweight-soothing-moisturizer",
  "https://www.sephora.co.uk/p/dr-jart-teatreement-toner",
  "https://www.sephora.co.uk/p/cosrx-low-ph-good-morning-gel-cleanser",
  "https://www.sephora.co.uk/p/COSRX-Pure-Fit-Cica-Calming-True-Sheet-Mask-1ea",
];

async function sephora() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(i, urls.length)
      console.log("### scraping", url);

      await page.goto(url, {
        waitUntil: "domcontentloaded",
      });

      const toSave: any = await page.evaluate(function () {
        function getEAN(): string {
          return (
            document
              .querySelector("[data-flix-ean]")
              ?.getAttribute("data-flix-ean") || ""
          );
        }

        function getReviewData(): { rating: number; review_count: number } {
          let rating =
            parseFloat(
              document
                .querySelector("[data-aggregate-rating]")
                ?.getAttribute("data-aggregate-rating") || "0.0"
            ) || 0;
          let review_count =
            parseInt(
              document
                .querySelector("[data-review-count")
                ?.getAttribute("data-review-count") || "0"
            ) || 0;
          return { rating, review_count };
        }

        function getProductName(): string {
          const name = document.querySelector(
            ".product-name .product-name"
          )?.textContent;
          return name?.trim() || "";
        }
        function getBrandName(): string {
          const name = document.querySelector(
            ".product-name .product-brand-name"
          )?.textContent;
          return name?.trim() || "";
        }

        function getProductPrice(): number {
          return (
            parseFloat(
              document
                .querySelector("[data-flix-price]")
                ?.getAttribute("data-flix-price")
                ?.replace("£", "") || "0.0"
            ) || 0
          );
        }

        const ean = getEAN();
        const { rating, review_count } = getReviewData();
        const name = getProductName();
        const price = getProductPrice();
        const brand = getBrandName();
        return { brand, name, price, rating, review_count, ean };
      });

      toSave.url = url;
      fs.appendFileSync(
        path.resolve(__dirname, "sephora.json"),
        JSON.stringify(toSave) + "\n",
        { encoding: "utf-8" }
      );
    }
  } catch (err) {
    console.log(err);
  }
}

sephora();
