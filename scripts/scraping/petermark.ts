import axios from "axios";
import { JSDOM } from "jsdom";
import { output } from "../utils/output";
import path from "path";
const pmLinks = [
  "https://shop.petermark.ie/collections/semi-di-lino/products/semi-di-lino-blonde-set",
  "https://shop.petermark.ie/collections/semi-di-lino/products/semi-di-lino-curl-set",
  "https://shop.petermark.ie/collections/semi-di-lino/products/semi-di-lino-volume-set",
  "https://shop.petermark.ie/collections/semi-di-lino/products/semi-di-lino-smooth-set",
  "https://shop.petermark.ie/collections/semi-di-lino/products/semi-di-lino-reconstruct-set",
  "https://shop.petermark.ie/collections/semi-di-lino/products/semi-di-lino-moisture-set",
  "https://shop.petermark.ie/collections/semi-di-lino/products/semi-di-lino-density-set",
  "https://shop.petermark.ie/collections/semi-di-lino/products/semi-de-lino-diamond-set",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-volume-volumizing-spray-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-volume-volumizing-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-volume-volumizing-mousse-condition-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-sunshine-hair-protective-oil-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-sunshine-hair-protective-milk-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-sunshine-after-sun-treatment-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-sunshine-after-sun-low-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-sublime-violet-ash-ultra-concentrated-pigment-10ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-sublime-shine-lotion-pink",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-sublime-essential-oils",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-sublime-crystalli-50ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-sublime-crystal-liquid-15ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-sublime-cristalli-di-seta-45ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-sublime-ash-ultra-concentrated-pigment-10ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-smooth-smoothing-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-smooth-smoothing-oil-100ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-smooth-smoothing-mask-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-smooth-smoothing-cream-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-smooth-smoothing-conditioner-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-scalp-rebal-scrub-150ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-scalp-purify-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-scalp-energize-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-scalp-energize-12x10ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-scalp-energise-tonic-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-scalp-calming-tonic-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-scalp-calming-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-scalp-balance-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-reconstruct-reparative-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-reconstruct-reparative-mask-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-reconstruct-reparative-lotion-6x13ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-reconstruct-reparative-anti-break-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-moisture-nutritive-shampoo-75ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-moisture-nutritive-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-moisture-nutritive-mask-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-moisture-nutritive-essential-oil-6pk",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-moisture-nutritive-conditioner-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-moist-detan-fluid-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-diamond-illuminating-shampoo-75ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-diamond-illuminating-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-diamond-illuminating-mask-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-diamond-illuminating-conditioner-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-diamond-extraordinary-all-in-1-fluid-125",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-diamond-crystal-spray-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-detox-clarifying-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-density-thickening-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-density-thickening-leave-in-cream-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-density-thickening-conditioner-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-curl-reactivating-spray-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-curl-multi-benefit-oil-100ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-curl-hydrating-co-wash-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-curl-enhancing-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-curl-enhancing-mask-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-curl-enhancing-conditioner-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-curl-defining-cream-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-brunette-anti-orange-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-brunette-anti-orange-conditioner-200ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-blonde-anti-yellow-spray-125ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/alfaparf-semi-di-lino-blonde-anti-yellow-shampoo-250ml",
  "https://shop.petermark.ie/collections/semi-di-lino/products/semi-di-lino-blonde-conditioner-200ml",
];

const out: {
  [key: string]: any;
}[] = [];

async function main() {
  try {
    for (let i = 0; i < pmLinks.length; i++) {

      console.log(i, pmLinks.length)

      const url = pmLinks[i];
      const res = await axios.get(url);
      const dom = new JSDOM(res.data);
      const { document } = dom.window;
      const selector = `[type="application/ld+json"]`;
      const snippets = document.querySelectorAll(selector);

      if (!snippets.length) {
        console.log(`no snippets for ${url}`);
        continue;
      }

      const productSnippet = findProductSnippet(snippets);
      if (!productSnippet) {
        console.log(`no product snippet for ${url}`);
        continue;
      }

      if (!productSnippet.textContent) {
        console.log(`no text content in product snippet? ${url}`);
        continue;
      }

      const sd = JSON.parse(productSnippet.textContent);

      for (let iii = 0; iii < sd.offers.length; iii++) {
        const offer = sd.offers[iii];

        console.log(offer.gtin13)

        out.push({
          name: sd.name,
          description: sd.description,
          url: offer.url,
          sku: offer.sku,
          gtin13: offer.gtin13,
          mpn: offer.mpn,
          price: offer.price,
        });
      }
    }

    await output(path.resolve(__dirname, "pmarks.csv"), out, true);
  } catch (err) {
    console.log(err);
  }
}
main();

function findProductSnippet(list: NodeListOf<Element>): Element | undefined {
  for (let ii = 0; ii < list.length; ii++) {
    const snippet = list[ii];
    if (snippet.textContent?.includes(`"@type": "Product"`)) {
      return snippet;
    }
  }
  return undefined;
}
