import { marked } from "marked";
import { getAllProducts } from "./functions/products/getAllProducts";
import { updateProduct } from "./functions/products/updateProduct";
import {JSDOM} from "jsdom"
import { output } from "./scripts/utils/output";
import path from "path"
function unescapeHTML(html: string): string {
  const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`);
  return dom.window.document.body.textContent || "";
}

const knownIssues = [
  "/kerastase-premiere-pre-shampoo-shampoo-conditioner-mask-bundle/",
  "/kerastase-curl-manifesto-fondant-hydratation-essentielle-250ml-duo/",
  "/loreal-professionnel-pro-longer-shampoo-conditioner-mask-trio/",
  "/pureology-hydrate-shampoo-mask-with-free-microfibre-hair-towel/",
  "/the-ordinary-dry-skin-saviours-with-free-cleansing-pads-cuffs/",
  "/loreal-professionnel-absolut-repair-bundle-the-full-routine/",
  "/loreal-professionnel-vitamino-color-bundle-the-full-routine/",
  "/kerastase-resistance-bain-force-architecte-shampoo-250ml-duo/",
  "/loreal-professionnel-pro-longer-bundle-the-full-routine/",
  "/loreal-professionnel-vitamino-color-conditioner-200ml-duo/",
  "/kerastase-curl-manifesto-shampoo-conditioner-mask-trio/",
  "/kerastase-elixir-ultime-sublime-shampoo-conditioner-duo/",
  "/loreal-professionnel-absolut-repair-shampoo-mask-duo/",
  "/loreal-professionnel-absolut-repair-shampoo-300ml-duo/",
  "/loreal-professionnel-pro-longer-conditioner-200ml-duo/",
  "/loreal-professionnel-silver-shampoo-conditioner-duo/",
  "/loreal-professionnel-vitamino-color-shampoo-300ml-duo/",
  "/kerastase-premiere-pre-shampoo-shampoo-mask-bundle/",
  "/kerastase-densifique-shampoo-conditioner-mask-trio/",
  "/loreal-professionnel-inforcer-conditioner-200ml-duo/",
  "/kerastase-blond-absolu-bain-ultra-violet-mask-duo/",
  "/kerastase-blond-absolu-bain-ultra-violet-250ml-duo/",
  "/kerastase-genesis-bain-nutri-fortifiant-250ml-duo/",
  "/loreal-professionnel-inforcer-shampoo-300ml-duo/",
  "/kerastase-gloss-absolu-shampoo-conditioner-duo/",
  "/kerastase-genesis-fondant-renforcateur-200ml-duo/",
  "/loreal-professionnel-silver-shampoo-300ml-duo/",
  "/kerastase-resistance-shampoo-conditioner-duo/",
  "/kerastase-resistance-bundle-the-full-routine/",
  "/kerastase-blond-absolu-bain-lumiere-mask-duo/",
  "/kerastase-blond-absolu-bain-lumiere-250ml-duo/",
  "/kerastase-discipline-shampoo-mask-duo/",
  "/kerastase-densifique-shampoo-mask-duo/",
  "/kerastase-densifique-shampoo-mask-duo/",
  "/kerastase-densifique-shampoo-mask-duo/",
  "/kerastase-densifique-shampoo-mask-duo/",
  "/kerastase-densifique-shampoo-mask-duo/",
  "/kerastase-densifique-shampoo-mask-duo/"
]

async function clean() {
  try {
    require("./config/config").config("bf");

    console.log(`known issues: ${knownIssues.length}`)

    let products = await getAllProducts();
    products = products.filter((p) => knownIssues.includes(p.custom_url.url));
     const skus = products.map(p => ({sku:p.sku}))

     output(path.resolve(__dirname, "skus-to-fix.csv"), skus, true)
    
  } catch (err) {
    console.log(err);
  }
}

clean();
