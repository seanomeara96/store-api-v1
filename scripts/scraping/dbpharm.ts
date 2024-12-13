import { JSDOM } from "jsdom";
import axios from "axios";
import { output } from "../utils/output";
import path from "path";
const urls: string[] = [
  "https://www.dpharmacy.ie/Dermalogica-Lift-and-Firm-Gift-Set",
  "https://www.dpharmacy.ie/Dermalogica-Jumbo-Smart-Response-Serum",
  "https://www.dpharmacy.ie/Dermalogica-Microneedling-Home-Care-Kit",
  "https://www.dpharmacy.ie/Dermalogica-Chemical-Peel-Home-Care-Kit",
  "https://www.dpharmacy.ie/Dermalogica-Super-Rich-Repair-100ml",
  "https://www.dpharmacy.ie/Dermalogica-Powerbright-Dark-Spot-System",
  "https://www.dpharmacy.ie/Dermalogica-Smooth-and-Hydrate-Gift-Set",
  "https://www.dpharmacy.ie/Dermalogica-Retinol-Renewal-Gift-Set",
  "https://www.dpharmacy.ie/Dermalogica-Phyto-Nature-Oxygen-Cream",
  "https://www.dpharmacy.ie/Dermalogica-Smart-Response-Serum-30ml",
  "https://www.dpharmacy.ie/dermalogica-phyto-nature-firming-serum",
  "https://www.dpharmacy.ie/Dermalogica-BioLumin-C-Serum-59ml",
  "https://www.dpharmacy.ie/Dermalogica-Cleanse-and-Glow-Gift-Set",
  "https://www.dpharmacy.ie/Dermalogica-Dynamic-Skin-Recovery-SPF50-100ml",
  "https://www.dpharmacy.ie/Dermalogica-Phyto-Nature-Lifting-Eye-Cream",
  "https://www.dpharmacy.ie/Dermalogica-Biolumin-C-Night-Restore-25ml",
  "https://www.dpharmacy.ie/Dermalogica-Age-Smart-Multivitamin-Power-Firm-Supersize",
  "https://www.dpharmacy.ie/Dermalogica-Daily-Microfoliant-and-Refill-Duo",
  "https://www.dpharmacy.ie/Dermalogica-Skin-Smoothing-Cream-150ml",
  "https://www.dpharmacy.ie/Dermalogica-Powerbright-Dark-Spot-Serum",
  "https://www.dpharmacy.ie/Dermalogica-Intensive-Moisture-Balance-150ml",
  "https://www.dpharmacy.ie/Dermalogica-Active-Moist-Jumbo-150ml",
  "https://www.dpharmacy.ie/Dermalogica-Pro-Collagen-Banking-Serum",
  "https://www.dpharmacy.ie/Dermalogica-Cleanse-and-Brighten-Gift-Set",
  "https://www.dpharmacy.ie/Dermalogica-BioLumin-C-Serum-30ml",
  "https://www.dpharmacy.ie/Dermalogica-Super-Rich-Repair",
  "https://www.dpharmacy.ie/Dermalogica-Powerbright-Dark-Spot-Peel",
  "https://www.dpharmacy.ie/dermalogica-sound-sleep-cocoon",
  "https://www.dpharmacy.ie/Dermalogica-Powerbright-Pure-Night",
  "https://www.dpharmacy.ie/Dermalogica-Neck-Fit-Contour-Serum",
  "https://www.dpharmacy.ie/Dermalogica-Dynamic-Skin-Retinol-Serum-30ml",
  "https://www.dpharmacy.ie/Dermalogica-Dynamic-Skin-Retinol-Serum-free-Dynamic-Skin-Recovery-Travel",
  "https://www.dpharmacy.ie/dermalogica-retinol-clearing-oil-30ml",
  "https://www.dpharmacy.ie/Dermalogica-Age-Smart-Rapid-Reveal-Peel",
  "https://www.dpharmacy.ie/dermalogica-intensive-moisture-balance",
  "https://www.dpharmacy.ie/Dermalogica-Daily-Liquid-Peelfoliant",
  "https://www.dpharmacy.ie/Dermalogica-PowerBright-Moisturiser-SPF50",
  "https://www.dpharmacy.ie/Dermalogica-Multivitamin-Thermafoliant-75ml",
  "https://www.dpharmacy.ie/Dermalogica-Multivitamin-Power-Firm",
  "https://www.dpharmacy.ie/Dermalogica-Dynamic-Skin-Recovery",
  "https://www.dpharmacy.ie/Dermalogica-Jumbo-Precleanse-Cleansing-Oil-295ml",
  "https://www.dpharmacy.ie/Dermalogica-daily-Milkfoliant",
  "https://www.dpharmacy.ie/Dermalogica-Smooth-and-Brighten-Gift-Set",
  "https://www.dpharmacy.ie/Dermalogica-Daily-Microfoliant-74g",
  "https://www.dpharmacy.ie/Dermalogica-UltraCalming-Stabilizing-Repair-Cream",
  "https://www.dpharmacy.ie/Dermalogica-UltraCalming-Cleanser-500ml",
  "https://www.dpharmacy.ie/Dermalogica-Special-Cleansing-Gel-500ml",
  "https://www.dpharmacy.ie/Dermalogica-Protect-and-Renew-Gift-Set",
  "https://www.dpharmacy.ie/dermalogica-biolumin-c-eye-cream-15ml",
  "https://www.dpharmacy.ie/Dermalogica-Active-Moist-100ml",
  "https://www.dpharmacy.ie/Dermalogica-Stress-Positive-Eye-Lift",
  "https://www.dpharmacy.ie/dermalogica-age-bright-clearing-serum",
  "https://www.dpharmacy.ie/Dermalogica-Age-Reversal-eye-Complex",
  "https://www.dpharmacy.ie/Dermalogica-Superfoliant",
  "https://www.dpharmacy.ie/Dermalogica-Circular-Hydration-Serum-30ml",
  "https://www.dpharmacy.ie/dermalogica-phyto-replenish-body-oil-125ml",
  "https://www.dpharmacy.ie/dermalogica-oil-to-foam-total-cleanser-250ml",
  "https://www.dpharmacy.ie/Dermalogica-Intensive-Moisture-Cleanser-295ml",
  "https://www.dpharmacy.ie/Dermalogica-Daily-Glycolic-Cleanser-295ml",
  "https://www.dpharmacy.ie/Dermalogica-Biolumin-C-Gel-Moisturiser-50ml",
  "https://www.dpharmacy.ie/Dermalogica-Awaken-Peptide-Eye-Gel-15ml",
  "https://www.dpharmacy.ie/Dermalogica-Daily-Microfoliant-Refill-Pouch",
  "https://www.dpharmacy.ie/Dermalogica-Active-Clearing-Skin-Wash-500ml",
  "https://www.dpharmacy.ie/Dermalogica-Age-Smart-Age-Defense-Kit",
  "https://www.dpharmacy.ie/Dermalogica-UltraCalming-Serum-Concentrate",
  "https://www.dpharmacy.ie/Dermalogica-Porescreen-Spf40-30ml",
  "https://www.dpharmacy.ie/dermalogica-sebum-clearing-masque",
  "https://www.dpharmacy.ie/dermalogica-oil-free-matte-spf-30",
  "https://www.dpharmacy.ie/dermalogica-multivitamin-power-recovery-masque",
  "https://www.dpharmacy.ie/Dermalogica-Barrier-Repair",
  "https://www.dpharmacy.ie/Dermalogica-Powerbright-Dark-Spot-Solutions-Kit",
  "https://www.dpharmacy.ie/Dermalogica-Special-Cleansing-Gel-500ml-Refill-Pouch",
  "https://www.dpharmacy.ie/Dermalogica-UltraCalming-Calm-Water-Gel",
  "https://www.dpharmacy.ie/Dermalogica-Daily-Brightness-Booster-Skin-Kit",
  "https://www.dpharmacy.ie/index.php?route=product/product&product_id=19252",
  "https://www.dpharmacy.ie/Dermalogica-Age-Smart-Antioxidant-Hydramist",
  "https://www.dpharmacy.ie/index.php?route=product/product&product_id=52090",
  "https://www.dpharmacy.ie/Dermalogica-Hyaluronic-Ceramide-Mist-150ml",
  "https://www.dpharmacy.ie/Dermalogica-Precleanse",
  "https://www.dpharmacy.ie/Dermalogica-Intensive-Moisture-Balance-50ml",
  "https://www.dpharmacy.ie/Dermalogica-Age-Smart-Skin-Resurfacing-Cleanser",
  "https://www.dpharmacy.ie/Dermalogica-Micellar-Prebiotic-Precleanse",
  "https://www.dpharmacy.ie/dermalogica-invisible-physical-defense-spf-30",
  "https://www.dpharmacy.ie/Dermalogica-UltraCalming-mist",
  "https://www.dpharmacy.ie/Dermalogica-Multi-Active-Toner",
  "https://www.dpharmacy.ie/dermalogica-active-clay-cleanser",
  "https://www.dpharmacy.ie/Dermalogica-Special-Cleansing-Gel-250ml",
  "https://www.dpharmacy.ie/Dermalogica-Discover-Healthy-Skin-Kit",
  "https://www.dpharmacy.ie/dermalogica-ultra-calming-rescue-set",
  "https://www.dpharmacy.ie/Dermalogica-Skin-Smoothing-Cream-50ml",
  "https://www.dpharmacy.ie/Dermalogica-Intensive-Moisture-Cleanser-150ml",
  "https://www.dpharmacy.ie/Dermalogica-active-clearing-skin-wash-250ml",
  "https://www.dpharmacy.ie/Dermalogica-Ultracalming-Cleanser-250ml",
  "https://www.dpharmacy.ie/Dermalogica-Protection-Sport-SPF50",
  "https://www.dpharmacy.ie/Dermalogica-Daily-Glycolic-Cleanser-150ml",
  "https://www.dpharmacy.ie/dermalogica-body-hydrating-cream",
  "https://www.dpharmacy.ie/Dermalogica-Active-Moist-50ml",
  "https://www.dpharmacy.ie/dermalogica-conditioning-body-wash",
  "https://www.dpharmacy.ie/Dermalogica-Clear-Start-Clear-Glow-Kit",
  "https://www.dpharmacy.ie/Dermalogica-Deep-Breakout-Liquid-Patch",
  "https://www.dpharmacy.ie/Dermalogica-BioLumin-C-Serum-10ml",
  "https://www.dpharmacy.ie/Dermalogica-Clear-Start-Foaming-Wash-295ml",
  "https://www.dpharmacy.ie/Dermalogica-Clear-Start-Breakout-Clearing-Liquid-Peel",
  "https://www.dpharmacy.ie/Dermalogica-Age-Smart-Renewal-Lip-Complex",
  "https://www.dpharmacy.ie/dermalogica-clear-start-clearing-defense-spf30",
  "https://www.dpharmacy.ie/Dermalogica-Clear-Start-Breakout-Clearing-Kit",
  "https://www.dpharmacy.ie/Dermalogica-Clear-Start-Cooling-Aqua-Jelly",
  "https://www.dpharmacy.ie/Dermalogica-Clear-Start-Clarifying-Body-Spray",
  "https://www.dpharmacy.ie/Dermalogica-Clear-Start-Breakout-Clearing-Booster",
  "https://www.dpharmacy.ie/Dermalogica-Clear-Start-Post-break-Out-Fix",
  "https://www.dpharmacy.ie/Dermalogica-Sound-Sleep-Cocoon-10ml",
  "https://www.dpharmacy.ie/dermalogica-clear-start-fizz-mask",
  "https://www.dpharmacy.ie/Dermalogica-Clear-Start-Micro-Pore-Mist",
  "https://www.dpharmacy.ie/Dermalogica-Clear-Start-Hydrating-Lotion",
  "https://www.dpharmacy.ie/Dermalogica-Smooth-Brighten-gift",
  "https://www.dpharmacy.ie/Dermalogica-Clear-Start-Foaming-Wash-177ml",
  "https://www.dpharmacy.ie/dermalogica-intensive-moisture-balance-travel-size",
  "https://www.dpharmacy.ie/Dermalogica-Age-Smart-Multivitamin-Power-Recovery-Masque-15ml",
  "https://www.dpharmacy.ie/dermalogica-multi-active-toner-travel-size-50ml",
  "https://www.dpharmacy.ie/dermalogica-travel-size-skin-smoothing-cream",
  "https://www.dpharmacy.ie/dermalogica-precleanse-30ml"
];

async function test() {
  try {
    let data = [];

    for (const url of urls) {
      console.log("Getting:", url);
      const res = await axios.get(url);
      const dom = new JSDOM(res.data);
      const { document } = dom.window;

      const ldJsonElems = [
        ...document.querySelectorAll("[type='application/ld+json']"),
      ];

      const productStructuredData = ldJsonElems.find((el) =>
        el.textContent
          ? el.textContent.trim().match(/"@type":\s?"Product"/)
          : false
      );

      if (!productStructuredData) {
        console.log("No structured data", url);
        continue;
      }

      const productDataString = productStructuredData.textContent
        ?.replace(/"gtin1([0-9])":\s+([A-Za-z\d&/-]+)/g, '"gtin1$1": "$2"')
        .replace(/\u00A0/gi, "");

      if (!productDataString) {
        console.log("No product data string", url);
        continue;
      }

      const productData = JSON.parse(productDataString);
      if (!productData) {
        console.log("No product data", url);
        continue;
      }


      let offers = productData.offers;
      if (!Array.isArray(offers)) {
        offers = [offers];
      }

      for (const offer of offers) {
        if (!offer) {
          continue;
        }

        const brand = productData.brand?.name || "";
        const product_name = productData.name || "";
        const variant_name = offer.name || "";
        const price = offer.price || "";
        const sku = offer.sku || productData.sku || "";
        const mpn = offer.mpn || productData.mpn || "";
        const gtin14 = offer.gtin14 || "";
        const gtin13 = offer.gtin13 || "";
        const gtin12 = offer.gtin12 || "";
        const availability = offer.availability || "";
        const url = offer.url || "";
        const description = productData.description || "";

        data.push({
          brand,
          product_name,
          variant_name,
          price,
          sku,
          mpn,
          gtin14,
          gtin13,
          gtin12,
          availability,
          url,
          description,
        });
      }
    }

    output(path.resolve(__dirname, "dbpharmderm.csv"), data, true);
  } catch (err) {
    throw err;
  }
}

test();
