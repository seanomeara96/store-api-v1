import { JSDOM } from "jsdom";
import axios from "axios";
import { output } from "../utils/output";
import path from "path";
const urls: string[] = [
  "https://www.kudosbeauty.ie/dermalogica-en/clear-start-breakout-clearing-liquid-peel.html",
  "https://www.kudosbeauty.ie/dermalogica-en/breakout-clearing-foaming-wash.html",
  "https://www.kudosbeauty.ie/dermalogica-en/clear-start-clearing-foaming-wash-clone.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-aqua-cool-jelly.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogic-dynamic-skin-retinol-serum.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogic-stabilizing-repair-cream.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-biolumin-c-gel-moisturizer.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-active-clay-cleanser.html",
  "https://www.kudosbeauty.ie/dermalogica-en/active-moist-100ml.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-active-moist-100ml-clone.html",
  "https://www.kudosbeauty.ie/dermalogica-en/active-moist-50ml.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-age-bright-clearing-serum.html",
  "https://www.kudosbeauty.ie/dermalogica-en/age-reversal-eye-complex.html",
  "https://www.kudosbeauty.ie/dermalogica-en/age-smart-antioxidant-hydramist.html",
  "https://www.kudosbeauty.ie/dermalogica-en/age-smart-antioxidant-hydramist-travel-size-30ml.html",
  "https://www.kudosbeauty.ie/dermalogica-en/age-smart-dynamic-skin-recovery-spf50.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-age-smart-dynamic-skin-recovery-spf50-clone.html",
  "https://www.kudosbeauty.ie/dermalogica-en/age-smart-multivitamin-power-firm-lip-and-eye.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-age-smart-multivitamin-power-firm-jumbo.html",
  "https://www.kudosbeauty.ie/dermalogica-en/age-smart-multivitamin-power-recovery-masque.html",
  "https://www.kudosbeauty.ie/dermalogica-en/age-smart-multivitamin-thermafoliant-75ml.html",
  "https://www.kudosbeauty.ie/dermalogica-en/age-smart-skin-resurfacing-cleanser.html",
  "https://www.kudosbeauty.ie/dermalogica-en/age-smart-super-rich-repair.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-age-smart-super-rich-repair-100ml.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-awaken-peptide-eye-gel.html",
  "https://www.kudosbeauty.ie/dermalogica-en/barrier-repair.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-circular-hydration-serum.html",
  "https://www.kudosbeauty.ie/dermalogica-en/daily-microfoliant.html",
  "https://www.kudosbeauty.ie/dermalogica-en/daily-microfoliant-clone.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-daily-milkfoliant.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-deep-breakout-liquid-patch.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-hyaluronic-ceramide-mist.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-micellar-prebiotic-precleanse.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-neck-fit-contour-serum.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-porescreen-spf-40.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-power-bright-serum.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-powerbright-moisturiser.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-skin-smoothing-100ml.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-skin-smoothing-100ml-clone.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-smart-response-serum.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-smart-response-serum-supersize.html",
  "https://www.kudosbeauty.ie/dermalogica-en/special-cleansing-gel-500ml.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-special-cleansing-gel-500ml-refill.html",
  "https://www.kudosbeauty.ie/dermalogica-en/special-cleansing-gel-250ml.html",
  "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-special-cleansing-gel-250ml-unboxed.html",
  "https://www.kudosbeauty.ie/dermalogica-en/ultracalming-cleanser-250ml.html",
  "https://www.kudosbeauty.ie/dermalogica-en/ultracalming-cleanser-500ml.html",
  "https://www.kudosbeauty.ie/dermalogica-en/special-cleansing-gel-500ml-clone.html",
  "https://www.kudosbeauty.ie/dermalogica-en/ultracalming-cleanser-500ml-clone.html",
];

async function test() {
  try {
    let data: {
      [key: string]: any;
    }[] = [];

    for (const url of urls) {
      console.log("Getting:", url);
      const { data } = await axios.get(url);
      const qs = new JSDOM(data).window.document.querySelector;
      const type = qs(`[itemtype]`)?.getAttribute("itemType") || "";
      const sku = qs(`[itemprop="sku"]`)?.getAttribute("content") || "";
      const name = qs(`[itemprop="name"]`)?.getAttribute("content") || "";
      const description =
        qs(`[itemprop="description"]`)?.getAttribute("content") || "";
      const price = qs(`[itemprop="price"]`)?.getAttribute("content") || "";
      data.push({ type, sku, name, description, price, url });
    }

    output(path.resolve(__dirname, "kudosderm.csv"), data, true);
  } catch (err) {
    throw err;
  }
}

test();
