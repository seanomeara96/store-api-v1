import { JSDOM } from "jsdom";
import axios from "axios";
import { output } from "../utils/output";
import path from "path";
const urls: string[] = [
    "https://www.kudosbeauty.ie/dermalogica-en/ultracalming-mist.html",
    "https://www.kudosbeauty.ie/dermalogica-en/age-smart-antioxidant-hydramist-travel-size-30ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/age-smart-multivitamin-power-recovery-masque.html",
    "https://www.kudosbeauty.ie/dermalogica-en/special-cleansing-gel-250ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/skin-concern/menopausal-skin/ultracalming-cleanser-250ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/ultracalming-cleanser-500ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/skinperfect-primer-spf30.html",
    "https://www.kudosbeauty.ie/dermalogica-en/age-reversal-eye-complex.html",
    "https://www.kudosbeauty.ie/dermalogica-en/skin-concern/menopausal-skin/multi-active-toner.html",
    "https://www.kudosbeauty.ie/dermalogica-en/age-smart-antioxidant-hydramist.html",
    "https://www.kudosbeauty.ie/dermalogica-en/special-cleansing-gel-travel-size.html",
    "https://www.kudosbeauty.ie/dermalogica-en/skin-concern/menopausal-skin/multi-active-toner-travel-size.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-daily-superfoliant-57g.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-stress-positive-eye-lift.html",
    "https://www.kudosbeauty.ie/dermalogica-en/skin-concern/menopausal-skin/dermalogica-calm-water-gel.html",
    "https://www.kudosbeauty.ie/dermalogica-en/skin-concern/menopausal-skin/dermalogica-sound-sleep-cocoon.html",
    "https://www.kudosbeauty.ie/dermalogica-en/blackhead-clearing-fizz-mask.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-pre-cleanse.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-intensive-moisture-cleanser-295ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-intensive-moisture-cleanser-295ml-clone.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-conditioning-body-wash-295ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-conditioning-body-wash-295ml-clone.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-discover-healthy-skin.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-clear-and-brighten-kit.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-age-defense-kit.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-sensitive-skin-rescue.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-retinol-clearing-oil.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-superfoliant-travel-size-13g.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-dynamic-skin-recover-12ml-travel-size-trail-size.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-prisma-protect-12ml-trail-size.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-clear-stat-micro-pore-mist.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-dark-spot-solutions-kit.html",
    "https://www.kudosbeauty.ie/dermalogica-en/clear-start-breakout-clearing-kit.html",
    "https://www.kudosbeauty.ie/dermalogica-en/clear-start-post-breakout-fix.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-daily-milkfoliant.html",
    "https://www.kudosbeauty.ie/dermalogica-en/clear-start-breakout-clearing-liquid-peel.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogic-dynamic-skin-retinol-serum.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-deep-breakout-liquid-patch.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogic-stabilizing-repair-cream.html",
    "https://www.kudosbeauty.ie/dermalogica-en/clear-start-clarifying-body-spray.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-long-lasting-hydration-trio.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-daily-microfoliant-duo.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-powerbright-dark-spot-peel.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-dynamic-skin-sculptor.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-systems/clear-start/clear-start-golden-hour-hydrating-spf30-stick.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-neurotouch-symmetry-serum.html",
    "https://www.kudosbeauty.ie/dermalogica-en/active-moist-50ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/active-moist-100ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/age-smart-multivitamin-power-firm-lip-and-eye.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-age-bright-clearing-serum.html",
    "https://www.kudosbeauty.ie/dermalogica-en/travel-bright-daily-microfoliant-holiday-clone.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-power-bright-serum.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-active-moist-100ml-clone.html",
    "https://www.kudosbeauty.ie/dermalogica-en/new-dermalogica-intensive-moisture-balance-100ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-intensive-moisture-balance-15ml-trail-size.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-circular-hydration-serum.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-intensive-moisture-balance-100ml-clone.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-age-smart-multivitamin-power-firm-jumbo.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-circular-hydration-serum-jumbo.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-magnetic-afterglow-cleanser.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-magnetic-afterglow-cleanser-295ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/age-smart-multivitamin-thermafoliant-75ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-skin-smoothing-100ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-skin-smoothing-100ml-en.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-skin-smoothing-100ml-clone.html",
    "https://www.kudosbeauty.ie/dermalogica-en/age-smart-super-rich-repair.html",
    "https://www.kudosbeauty.ie/dermalogica-en/age-smart-skin-resurfacing-cleanser.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-rapid-reveal-peel.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-age-smart-super-rich-repair-100ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/age-smart-dynamic-skin-recovery-spf50.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-biolumin-c-serum.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-biolumin-c-eye-serum.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-age-smart-dynamic-skin-recovery-spf50-clone.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-awaken-peptide-eye-gel.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-multivitamin-power-recovery-cream.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-powerbright-moisturiser.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-powerbright-overnight-cream.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-oil-to-foam-total-cleanser.html",
    "https://www.kudosbeauty.ie/dermalogica-en/phyto-nature-firming-serum.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-daily-glycolic-cleanser.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-daily-glycolic-cleanser-clone.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-phyto-nature-oxygen-cream.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-liquid-peelfoliant.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-pro-collagen-banking-serum.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-phyto-nature-lifting-eye-cream.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-neck-fit-contour-serum.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-medibac-clearing-skin-wash-500ml.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-clearing-skin-wash-500ml-clone.html",
    "https://www.kudosbeauty.ie/dermalogica-en/breakout-clearing-foaming-wash.html",
    "https://www.kudosbeauty.ie/dermalogica-en/clear-start-clearing-foaming-wash-clone.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-prisma-protect-spf30.html",
    "https://www.kudosbeauty.ie/dermalogica-en/invisible-physical-defense-spf30.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-biolumin-c-gel-moisturizer.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-porescreen-spf-40.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-biolumin-c-night-restore.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-biolumin-c-heat-aging-protector-spf50.html",
    "https://www.kudosbeauty.ie/dermalogica-en/clear-start-hydrating-lotion.html",
    "https://www.kudosbeauty.ie/dermalogica-en/clearing-defense-spf30.html",
    "https://www.kudosbeauty.ie/dermalogica-en/dermalogica-aqua-cool-jelly.html",
    "https://www.kudosbeauty.ie/dermalogica-en/breakout-clearing-booster.html"
];

async function test() {
  try {
    let out: {
      [key: string]: any;
    }[] = [];

    for (let i = 0; i < urls.length; i++) {
      console.log(i, urls.length);
      const url = urls[i];
      console.log("Getting:", url);
      let res;
      try {
        res = await axios.get(url);
      } catch (err: any) {
        if (err.status ? err.status === 404 : false) {
          console.log(`404 could not get ${url}`);
          continue;
        }
        throw err;
      }
      const { data } = res;
      const { window } = new JSDOM(data);
      const type =
        window.document.querySelector(`[itemtype]`)?.getAttribute("itemType") ||
        "";
      const sku =
        window.document
          .querySelector(`[itemprop="sku"]`)
          ?.getAttribute("content") || "";
      const name =
        window.document
          .querySelector(`[itemprop="name"]`)
          ?.getAttribute("content") || "";
      const description =
        window.document
          .querySelector(`[itemprop="description"]`)
          ?.getAttribute("content") || "";
      const price =
        window.document
          .querySelector(`[itemprop="price"]`)
          ?.getAttribute("content") || "";

      out.push({ type, sku, name, description, price, url });
    }

    output(path.resolve(__dirname, "kudosderm.csv"), out, true);
  } catch (err) {
    throw err;
  }
}

test();
