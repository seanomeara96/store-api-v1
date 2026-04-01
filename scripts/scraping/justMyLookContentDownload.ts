import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const data = [{"name":"Skin1004 Madagascar Centella Watergel Ampoule Sheet Mask 25ml","price":2.95,"barcode":8809913833079,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-watergel-ampoule-sheet-mask-25ml","sku":"22964"},
{"name":"Skin1004 Madagascar Centella Poremizing Fresh Ampoule 100ml","price":18.95,"barcode":8809913831259,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-poremizing-fresh-ampoule-100ml","sku":"22959"},
{"name":"Skin1004 Madagascar Centella Probio-Cica Nourishing Sheet Mask 23ml","price":2.95,"barcode":8809913832003,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-probio-cica-nourishing-sheet-mask-23ml","sku":"22962"},
{"name":"Medicube Red Succinic Acid Peeling Pads x70","price":19.95,"barcode":8809960356170,"url":"https://www.justmylook.com/products/medicube-red-succinic-acid-peeling-pads-x70","sku":"22944"},
{"name":"Skin1004 Madagascar Centella Poremising Clarifying Sheet Mask 23ml","price":2.95,"barcode":8809913831310,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-poremising-clarifying-sheet-mask-23ml","sku":"22958"},
{"name":"Arencia Fresh Green Mochi Cleanser 120g","price":17.95,"barcode":8809562190738,"url":"https://www.justmylook.com/products/arencia-fresh-green-mochi-cleanser-120g","sku":"22917"},
{"name":"Medicube PDRN Booster Gel 300ml","price":20.95,"barcode":8800256114979,"url":"https://www.justmylook.com/products/medicube-pdrn-booster-gel-300ml","sku":"22942"},
{"name":"Skin1004 Madagascar Centella Hyalu-Cica Hydrating Sheet Mask 23ml","price":2.95,"barcode":8809913833093,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-hyalu-cica-hydrating-sheet-mask-23ml","sku":"22952"},
{"name":"Skin1004 Madagascar Centella Probio-Cica Intensive Ampoule 95ml","price":22.95,"barcode":8809913831280,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-probio-cica-intensive-ampoule-95ml","sku":"22961"},
{"name":"Skin1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum PA++++ SPF50+ 100ml","price":24.95,"barcode":8809913830603,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-hyalu-cica-water-fit-sun-serum-pa-spf50-100ml","sku":"22954"},
{"name":"D'Alba White Truffle First Spray Serum 50ml","price":15.95,"barcode":8809563069156,"url":"https://www.justmylook.com/products/dalba-white-truffle-first-spray-serum-50ml","sku":"22932"},
{"name":"Skin1004 Madagascar Centella Tone Brightening Glow Sheet Mask 25ml","price":2.95,"barcode":8809913830931,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-tone-brightening-glow-sheet-mask-25ml","sku":"22963"},
{"name":"Biodance Radiant Vita Niacinamide Real Deep Mask 4 x 34g","price":18.95,"barcode":8809937361466,"url":"https://www.justmylook.com/products/biodance-radiant-vita-niacinamide-real-deep-mask-4-x-34g","sku":"22925"},
{"name":"Haruharu Wonder Centella Phyto & 5 Peptide Concentrate Cream 30ml","price":17.95,"barcode":8809532221790,"url":"https://www.justmylook.com/products/haruharu-wonder-centella-phyto-5-peptide-concentrate-cream-30ml","sku":"22935"},
{"name":"VT Cosmetics Reedle Shot 300 50ml","price":28.95,"barcode":8809695678431,"url":"https://www.justmylook.com/products/vt-cosmetics-reedle-shot-300-50ml","sku":"22975"},
{"name":"K-Secret Seoul 1988 Cream: Retinal Liposome + Fermented Rice 50ml","price":16.95,"barcode":8809695240584,"url":"https://www.justmylook.com/products/k-secret-seoul-1988-cream-retinal-liposome-fermented-rice-50ml","sku":"22938"},
{"name":"VT Cosmetics Reedle Shot 700 2-Step Mask 25g","price":5.95,"barcode":8803463006051,"url":"https://www.justmylook.com/products/vt-cosmetics-reedle-shot-700-2-step-mask-25g","sku":"22976"},
{"name":"Haruharu Wonder Black Rice 5 Ceramide Barrier Moisturising Cream 50ml","price":21.95,"barcode":8809532222247,"url":"https://www.justmylook.com/products/haruharu-wonder-black-rice-5-ceramide-barrier-moisturising-cream-50ml","sku":"22933"},
{"name":"CosRx Advanced Snail Mucin Glass Glow Hydrogel Sheet Mask 34g","price":13.95,"barcode":8809598457058,"url":"https://www.justmylook.com/products/cosrx-advanced-snail-mucin-glass-glow-hydrogel-sheet-mask-34g","sku":"22928"},
{"name":"Medicube Zero Pore One Day Cream 50ml","price":24.95,"barcode":8800240567354,"url":"https://www.justmylook.com/products/medicube-zero-pore-one-day-cream-50ml","sku":"22945"},
{"name":"CosRx Skin Barrier Moisturising Cream 450ml","price":21.95,"barcode":8800311120112,"url":"https://www.justmylook.com/products/cosrx-skin-barrier-moisturising-cream-450ml","sku":"22929"},
{"name":"Numbuzin No. 9 NAD+ PDRN Glow Boosting Toner 150ml","price":16.95,"barcode":8809652589794,"url":"https://www.justmylook.com/products/numbuzin-no-9-nad-pdrn-glow-boosting-toner-150ml","sku":"22948"},
{"name":"Biodance Rejuvenating Caviar PDRN Real Deep Mask 4 x 34g","price":18.95,"barcode":8809891184613,"url":"https://www.justmylook.com/products/biodance-rejuvenating-caviar-pdrn-real-deep-mask-4-x-34g","sku":"22926"},
{"name":"Some By Mi 30 Days Bye Bye Blackhead Miracle Green Tea-Tox Bubble Cleanser 120g","price":15.95,"barcode":8809647390244,"url":"https://www.justmylook.com/products/some-by-mi-30-days-bye-bye-blackhead-miracle-green-tea-tox-bubble-cleanser-120g","sku":"22965"},
{"name":"K-Secret Seoul 1988 Essence: Snail Mucin 97% + Rice 100ml","price":16.95,"barcode":8809695240515,"url":"https://www.justmylook.com/products/k-secret-seoul-1988-essence-snail-mucin-97-rice-100ml","sku":"22940"},
{"name":"K-Secret Seoul 1988 Cream: Snail Mucin 93% + Rice 100ml","price":18.95,"barcode":8809695240591,"url":"https://www.justmylook.com/products/k-secret-seoul-1988-cream-snail-mucin-93-rice-100ml","sku":"22939"},
{"name":"Biodance Cera-Nol Gel Toner Pads x60","price":19.95,"barcode":8809937361206,"url":"https://www.justmylook.com/products/biodance-cera-nol-gel-toner-pads-x60","sku":"22922"},
{"name":"Arencia Fresh Royal Rosehip Mochi Cleanser 120g","price":17.95,"barcode":8809562190745,"url":"https://www.justmylook.com/products/arencia-fresh-royal-rosehip-mochi-cleanser-120g","sku":"22919"},
{"name":"K-Secret Seoul 1988 Cleansing Oil: Pine Cica 1% + Probiotics 200ml","price":16.95,"barcode":8809695240560,"url":"https://www.justmylook.com/products/k-secret-seoul-1988-cleansing-oil-pine-cica-1-probiotics-200ml","sku":"22937"},
{"name":"Arencia Fresh Blue Hyssop Mochi Cleanser 120g","price":17.95,"barcode":8809562191070,"url":"https://www.justmylook.com/products/arencia-fresh-blue-hyssop-mochi-cleanser-120g","sku":"22916"},
{"name":"Axis-Y Dark Spot Correcting Glow Toner 125ml","price":20.95,"barcode":8809634610959,"url":"https://www.justmylook.com/products/axis-y-dark-spot-correcting-glow-toner-125ml","sku":"22921"},
{"name":"Numbuzin No. 9 NAD+ Collagen Under Eye Patches 5 Pairs","price":15.95,"barcode":8809652589619,"url":"https://www.justmylook.com/products/numbuzin-no-9-nad-collagen-under-eye-patches-5-pairs","sku":"22947"},
{"name":"VT Cosmetics Mild Reedle Shot 50 50ml","price":18.95,"barcode":8809559626196,"url":"https://www.justmylook.com/products/vt-cosmetics-mild-reedle-shot-50-50ml","sku":"22974"},
{"name":"Skin1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum PA++++ SPF50+ 15ml","price":8.95,"barcode":8809913830467,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-hyalu-cica-water-fit-sun-serum-pa-spf50-15ml","sku":"22955"},
{"name":"Some By Mi PDRN Spirulina Poreless Primer 10g","price":16.95,"barcode":8809647395461,"url":"https://www.justmylook.com/products/some-by-mi-pdrn-spirulina-poreless-primer-10g","sku":"22967"},
{"name":"VT Cosmetics Mild Reedle Shot 50 2-Step Mask 25g","price":3.95,"barcode":8803463006020,"url":"https://www.justmylook.com/products/vt-cosmetics-mild-reedle-shot-50-2-step-mask-25g","sku":"22973"},
{"name":"Mixsoon Centella Sun Cream PA++++ SPF50+ 50g","price":11.95,"barcode":8809732910791,"url":"https://www.justmylook.com/products/mixsoon-centella-sun-cream-pa-spf50-50g","sku":"22946"},
{"name":"Arencia Holy Hyssop Serum 30 50g","price":21.95,"barcode":8809562190820,"url":"https://www.justmylook.com/products/arencia-holy-hyssop-serum-30-50g","sku":"22920"},
{"name":"VT Cosmetics Reedle Shot 700 30ml","price":37.95,"barcode":8809695678448,"url":"https://www.justmylook.com/products/vt-cosmetics-reedle-shot-700-30ml","sku":"22977"},
{"name":"D'Alba UV Essence Waterfull Tone-Up Colour Correcting Sun Cream SPF50+ 50ml","price":23.95,"barcode":8809782554884,"url":"https://www.justmylook.com/products/dalba-uv-essence-waterfull-tone-up-colour-correcting-sun-cream-spf50-50ml","sku":"22931"},
{"name":"K-Secret Seoul 1988 Sun: Pine Tree + Ceramide PA++++ SPF50+ 50ml","price":16.95,"barcode":8809695240492,"url":"https://www.justmylook.com/products/k-secret-seoul-1988-sun-pine-tree-ceramide-pa-spf50-50ml","sku":"22941"},
{"name":"Skin1004 Madagascar Centella Niacinamide 10% Boosting Shot Ampoule 30ml","price":16.95,"barcode":8809913832492,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-niacinamide-10-boosting-shot-ampoule-30ml","sku":"22957"},
{"name":"Some By Mi Retinol Bakuchiol Dual Cream 50ml","price":19.95,"barcode":8809647395928,"url":"https://www.justmylook.com/products/some-by-mi-retinol-bakuchiol-dual-cream-50ml","sku":"22971"},
{"name":"Skin1004 Madagascar Centella Hyalu-Cica Cloudy Mist 120ml","price":18.95,"barcode":8809913830191,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-hyalu-cica-cloudy-mist-120ml","sku":"22949"},
{"name":"Some By Mi V10 Hyal Lip Sun Protector SPF15 7ml","price":6.95,"barcode":8809647392873,"url":"https://www.justmylook.com/products/some-by-mi-v10-hyal-lip-sun-protector-spf15-7ml","sku":"22972"},
{"name":"K-Secret Seoul 1988 Cleansing Foam: Pine Cica 1% + Probiotics 150ml","price":15.95,"barcode":8809695240553,"url":"https://www.justmylook.com/products/k-secret-seoul-1988-cleansing-foam-pine-cica-1-probiotics-150ml","sku":"22936"},
{"name":"Some By Mi PDRN Spirulina Soothing Repair Serum 50ml","price":18.95,"barcode":8809647395454,"url":"https://www.justmylook.com/products/some-by-mi-pdrn-spirulina-soothing-repair-serum-50ml","sku":"22968"},
{"name":"Some By Mi AHA, BHA, PHA Miracle Toner 30ml","price":6.95,"barcode":8809647390411,"url":"https://www.justmylook.com/products/some-by-mi-aha-bha-pha-miracle-toner-30ml","sku":"22966"},
{"name":"Skin1004 Madagascar Centella Hyalu-Cica First Ampoule 50ml","price":16.95,"barcode":8809913830139,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-hyalu-cica-first-ampoule-50ml","sku":"22950"},
{"name":"Arencia Fresh Red Smoothie Serum 30 50g","price":24.95,"barcode":8809562191889,"url":"https://www.justmylook.com/products/arencia-fresh-red-smoothie-serum-30-50g","sku":"22918"},
{"name":"Some By Mi Retinol Bakuchiol Bubble Toner 100ml","price":15.95,"barcode":8809647395911,"url":"https://www.justmylook.com/products/some-by-mi-retinol-bakuchiol-bubble-toner-100ml","sku":"22970"},
{"name":"Skin1004 Madagascar Centella Hyalu-Cica Gentle Cleansing Milk 200ml","price":17.95,"barcode":8809913832850,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-hyalu-cica-gentle-cleansing-milk-200ml","sku":"22951"},
{"name":"Some By Mi PDRN Spirulina Soothing Sherbet Mask 10 x 1g","price":18.95,"barcode":8809647395447,"url":"https://www.justmylook.com/products/some-by-mi-pdrn-spirulina-soothing-sherbet-mask-10-x-1g","sku":"22969"},
{"name":"Skin1004 Madagascar Centella Hyalu-Cica Sunsational Kit","price":33.95,"barcode":8809913830269,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-hyalu-cica-sunsational-kit","sku":"22953"},
{"name":"Skin1004 Madagascar Centella Poremizing Velvet Finish Sunscreen PA++++ SPF50+ 50ml","price":16.95,"barcode":8809913832485,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-poremizing-velvet-finish-sunscreen-pa-spf50-50ml","sku":"22960"},
{"name":"Biodance Skin Refining Mild PHA Toner 150ml","price":18.95,"barcode":8809937360230,"url":"https://www.justmylook.com/products/biodance-skin-refining-mild-pha-toner-150ml","sku":"22927"},
{"name":"Biodance Micro Dual Serum Toner 150ml","price":18.95,"barcode":8809937360483,"url":"https://www.justmylook.com/products/biodance-micro-dual-serum-toner-150ml","sku":"22924"},
{"name":"Biodance First Synergy Toner 150ml","price":19.95,"barcode":8809937360445,"url":"https://www.justmylook.com/products/biodance-first-synergy-toner-150ml","sku":"22923"},
{"name":"Medicube PDRN Pink Collagen Gel Mask Pack 4 x 28ml","price":15.95,"barcode":8800256114399,"url":"https://www.justmylook.com/products/medicube-pdrn-pink-collagen-gel-mask-pack-4-x-28ml","sku":"22943"},
{"name":"Haruharu Wonder Black Rice Probiotics Barrier Essence 120ml","price":18.95,"barcode":8809532221967,"url":"https://www.justmylook.com/products/haruharu-wonder-black-rice-probiotics-barrier-essence-120ml","sku":"22934"},
{"name":"CosRx The Peptide Collagen Hydrogel Eye Patches 30 Pairs","price":17.95,"barcode":8809598456983,"url":"https://www.justmylook.com/products/cosrx-the-peptide-collagen-hydrogel-eye-patches-30-pairs","sku":"22930"},
{"name":"Skin1004 Madagascar Centella Matrixyl 10% Boosting Shot Ampoule 30ml","price":21.95,"barcode":8809913832508,"url":"https://www.justmylook.com/products/skin1004-madagascar-centella-matrixyl-10-boosting-shot-ampoule-30ml","sku":"22956"}];

async function justMyLookContent() {
  // Contextful logger (timestamps + scope + structured meta)
  const ts = () => new Date().toISOString();
  const log = (level: "INFO" | "WARN" | "ERROR" | "DEBUG", scope: string, msg: string, meta?: any) => {
    const base = `[${ts()}] [${level}] [justMyLookContent:${scope}] ${msg}`;
    if (meta !== undefined) {
      // Keep console output readable but still structured.
      try {
        console.log(base, typeof meta === "string" ? meta : JSON.stringify(meta, null, 2));
      } catch {
        console.log(base, meta);
      }
    } else {
      console.log(base);
    }
  };

  const toErrMeta = (e: any) => ({
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
  });

  let browser: any | null = null;
  let page: any | null = null;

  try {
    log("INFO", "startup", "Launching browser...");
    browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
      ],
    });
    log("INFO", "startup", "Browser launched.");

    const outDir = path.resolve(__dirname);
    const imagesDir = path.resolve(outDir, "images");
    const jsonPath = path.resolve(outDir, "products.json");

    if (!fs.existsSync(imagesDir)) {
      try {
        fs.mkdirSync(imagesDir, { recursive: true });
        log("INFO", "fs", "Created images directory.", { imagesDir });
      } catch (e) {
        log("ERROR", "fs", "Failed to create images directory.", { imagesDir, ...toErrMeta(e) });
        throw e;
      }
    }

    // Load existing results so restarts skip already-scraped items
    let existing: any[] = [];
    if (fs.existsSync(jsonPath)) {
      try {
        existing = JSON.parse(fs.readFileSync(jsonPath, "utf8") || "[]");
        if (!Array.isArray(existing)) existing = [];
        log("INFO", "state", "Loaded existing products file.", { jsonPath, count: existing.length });
      } catch (e) {
        log("WARN", "state", "Failed to parse existing products file; starting fresh.", {
          jsonPath,
          ...toErrMeta(e),
        });
        existing = [];
      }
    } else {
      log("INFO", "state", "No existing products file found; starting fresh.", { jsonPath });
    }

    const scrapedKeySet = new Set<string>(
      existing
        .map((x) => x?.sku ?? x?.barcode ?? x?.url)
        .filter((v) => v !== undefined && v !== null)
        .map(String)
    );

    const persist = () => {
      const tmp = `${jsonPath}.tmp`;
      try {
        fs.writeFileSync(tmp, JSON.stringify(existing, null, 2), "utf8");
        fs.renameSync(tmp, jsonPath);
        log("DEBUG", "persist", "Persisted products to disk.", { jsonPath, count: existing.length });
      } catch (e) {
        log("ERROR", "persist", "Failed to persist products file.", { jsonPath, tmp, ...toErrMeta(e) });
        // Re-throw so the caller can decide whether to continue; safer than silently losing data.
        throw e;
      }
    };

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const sanitize = (s: string) =>
      String(s)
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
        .replace(/\s+/g, " ")
        .trim();

    const withRetries = async <T,>(
      fn: () => Promise<T>,
      {
        retries = 3,
        baseDelayMs = 1000,
        factor = 2,
        label = "operation",
        context,
      }: {
        retries?: number;
        baseDelayMs?: number;
        factor?: number;
        label?: string;
        context?: any;
      } = {}
    ): Promise<T> => {
      let lastErr: any;
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          if (attempt > 0) log("WARN", "retry", `Retrying ${label} (attempt ${attempt}/${retries})...`, context);
          return await fn();
        } catch (e) {
          lastErr = e;
          log(
            attempt === retries ? "ERROR" : "WARN",
            "retry",
            `${label} failed${attempt === retries ? " (final attempt)" : ""}.`,
            { attempt, retries, ...context, ...toErrMeta(e) }
          );
          if (attempt === retries) break;
          const delay = baseDelayMs * Math.pow(factor, attempt);
          await sleep(delay);
        }
      }
      throw lastErr;
    };

    const ensurePage = async () => {
      if (!browser) throw new Error("Browser not initialized.");
      const p = await browser.newPage();
      await p.setViewport({ width: 1280, height: 800 });

      // Keep going if some resources fail
      p.on("pageerror", (e: any) => log("WARN", "page", "pageerror event.", toErrMeta(e)));
      p.on("error", (e: any) => log("WARN", "page", "error event.", toErrMeta(e)));
      p.on("requestfailed", (req: any) => {
        const failure = req.failure();
        log("DEBUG", "network", "requestfailed.", { url: req.url(), errorText: failure?.errorText });
      });

      return p;
    };

    page = await ensurePage();

    const total = (data as any[])?.length ?? 0;
    log("INFO", "run", "Starting scrape run.", { total, alreadyScraped: scrapedKeySet.size });

    let idx = 0;
    for (const item of data as any[]) {
      idx++;
      const key = String(item?.sku ?? item?.barcode ?? item?.url);
      const ctx = { idx, total, key, sku: item?.sku, barcode: item?.barcode, url: item?.url, name: item?.name };

      if (scrapedKeySet.has(key)) {
        log("INFO", "item", "Skipping already scraped item.", ctx);
        continue;
      }

      await withRetries(
        async () => {
          if (!page) throw new Error("Page not initialized.");
          log("INFO", "item", "Scraping item.", ctx);

          // Navigate & wait for full load
          await withRetries(
            async () => {
              await page!.goto(item.url, { waitUntil: "networkidle2", timeout: 120000 });
            },
            { retries: 2, baseDelayMs: 2000, factor: 2, label: "navigate", context: ctx }
          );

          // puppeteer version compatibility: older versions may not have page.waitForTimeout()
          await sleep(750);

          // You will implement query selectors yourself:
          // - Extract description
          // - Extract image URLs

          const extracted = await withRetries(
            async () => {
              return await page!.evaluate(() => {
                const text = (el: Element | null | undefined) =>
                  (el?.textContent ?? "")
                    .replace(/\s+/g, " ")
                    .trim();

                // Example description extraction:
                // Prefer common product description containers; fall back to meta description.
                const descriptionEl = document.querySelector(".wysiwyg--pdp-accordion.text-body-r");

                const metaDescription = (document.querySelector('meta[name="description"]') as HTMLMetaElement | null)
                  ?.content;

                const description = text(descriptionEl) || (metaDescription ?? "").trim();

                // Example image URL extraction:
                // Gather from common product gallery selectors; fall back to og:image.
                const imgNodes = Array.from(document.querySelectorAll("#pdp-media-gallery .relative img")) as
                  | HTMLImageElement[]
                  | any[];

                const urls = imgNodes
                  .map((img) => {
                    const getAttr = (name: string) => {
                      try {
                        return typeof img?.getAttribute === "function" ? img.getAttribute(name) : null;
                      } catch {
                        return null;
                      }
                    };

                    // Prefer high-res hints when present
                    const zoom = getAttr("data-zoom") || getAttr("data-zoom-image");
                    const dataSrc = getAttr("data-src") || getAttr("data-original");
                    const src = getAttr("src");

                    // If srcset exists, choose the largest candidate (guard for null/empty)
                    const srcset = getAttr("srcset");
                    let bestFromSrcset = "";
                    if (srcset && typeof srcset === "string") {
                      const candidates = srcset
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .map((part) => {
                          const [u, size] = part.split(/\s+/);
                          const w = size?.endsWith("w") ? parseInt(size.slice(0, -1), 10) : NaN;
                          return { u, w: Number.isFinite(w) ? w : 0 };
                        })
                        .filter((c) => !!c.u);
                      candidates.sort((a, b) => b.w - a.w);
                      bestFromSrcset = candidates[0]?.u ?? "";
                    }

                    return zoom || dataSrc || bestFromSrcset || src || "";
                  })
                  .map((u) => {
                    try {
                      // Handle protocol-relative URLs like: //www.justmylook.com/...
                      const normalized = String(u).startsWith("//") ? `${window.location.protocol}${u}` : u;
                      return new URL(normalized, window.location.href).toString();
                    } catch {
                      return "";
                    }
                  })
                  .filter((u) => !!u);

                const ogImage = (document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null)?.content;
                const normalizedOg = (() => {
                  if (!ogImage) return "";
                  try {
                    const normalized = String(ogImage).startsWith("//")
                      ? `${window.location.protocol}${ogImage}`
                      : ogImage;
                    return new URL(normalized, window.location.href).toString();
                  } catch {
                    return "";
                  }
                })();

                // De-dupe while preserving order
                const seen = new Set<string>();
                const imageUrls: string[] = [];
                for (const u of urls) {
                  if (!seen.has(u)) {
                    seen.add(u);
                    imageUrls.push(u);
                  }
                }
                if (normalizedOg && !seen.has(normalizedOg)) imageUrls.push(normalizedOg);

                return { description, imageUrls };
              });
            },
            { retries: 2, baseDelayMs: 750, factor: 2, label: "extract description/images", context: ctx }
          );

          const description = extracted?.description ?? "";
          const imageUrls: string[] = Array.isArray(extracted?.imageUrls) ? extracted.imageUrls : [];
          log("DEBUG", "extract", "Extraction complete (placeholders may be empty).", {
            ...ctx,
            descriptionLength: description?.length ?? 0,
            imageUrlCount: imageUrls?.length ?? 0,
          });

          // Save images (download via fetch in page context)
          const itemImagesDir = path.resolve(imagesDir, sanitize(key));
          if (!fs.existsSync(itemImagesDir)) {
            try {
              fs.mkdirSync(itemImagesDir, { recursive: true });
              log("DEBUG", "fs", "Created item images directory.", { ...ctx, itemImagesDir });
            } catch (e) {
              log("ERROR", "fs", "Failed to create item images directory.", { ...ctx, itemImagesDir, ...toErrMeta(e) });
              throw e;
            }
          }

          const savedImages: string[] = [];
          for (let i = 0; i < imageUrls.length; i++) {
            const imgUrl = imageUrls[i];
            if (!imgUrl) {
              log("WARN", "image", "Encountered empty image URL; skipping.", { ...ctx, imageIndex: i });
              continue;
            }

            const imgExtGuess = (() => {
              try {
                const u = new URL(imgUrl);
                const ext = path.extname(u.pathname);
                return ext && ext.length <= 5 ? ext : ".jpg";
              } catch {
                return ".jpg";
              }
            })();

            const imgFilename = `${String(i + 1).padStart(3, "0")}${imgExtGuess}`;
            const imgPath = path.resolve(itemImagesDir, imgFilename);

            if (fs.existsSync(imgPath)) {
              savedImages.push(imgPath);
              log("DEBUG", "image", "Image already exists; skipping download.", {
                ...ctx,
                imageIndex: i,
                imgUrl,
                imgPath,
              });
              continue;
            }

            log("INFO", "image", "Downloading image.", { ...ctx, imageIndex: i, imgUrl, imgPath });

            const bufBase64 = await withRetries(
              async () => {
                try {
                  // NOTE: Avoid transpiled async/await inside evaluate (can trigger "__awaiter is not defined")
                  return await page!.evaluate((u: string) => {
                    return fetch(u, { credentials: "omit" })
                      .then((res) => {
                        if (!res.ok) throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
                        return res.arrayBuffer();
                      })
                      .then((ab) => {
                        let binary = "";
                        const bytes = new Uint8Array(ab);
                        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
                        return btoa(binary);
                      });
                  }, imgUrl);
                } catch (e) {
                  // Add context about the image URL to any thrown error.
                  (e as any).message = `[imageFetch] url=${imgUrl} :: ${(e as any)?.message ?? String(e)}`;
                  throw e;
                }
              },
              {
                retries: 3,
                baseDelayMs: 1500,
                factor: 2,
                label: "download image",
                context: { ...ctx, imageIndex: i, imgUrl },
              }
            );

            try {
              fs.writeFileSync(imgPath, Buffer.from(bufBase64, "base64"));
              savedImages.push(imgPath);
              log("INFO", "image", "Saved image.", { ...ctx, imageIndex: i, imgPath });
            } catch (e) {
              log("ERROR", "image", "Failed to write image to disk.", {
                ...ctx,
                imageIndex: i,
                imgPath,
                ...toErrMeta(e),
              });
              // Continue with other images rather than failing the whole product.
            }
          }

          // Save JSON record
          try {
            existing.push({
              ...item,
              sku: item?.sku ?? key,
              scrapedAt: new Date().toISOString(),
              description,
              images: savedImages.map((p) => path.relative(outDir, p)),
            });

            scrapedKeySet.add(key);
            persist();
            log("INFO", "item", "Item saved successfully.", {
              ...ctx,
              savedImageCount: savedImages.length,
              productsTotalNow: existing.length,
            });
          } catch (e) {
            log("ERROR", "item", "Failed saving item record.", { ...ctx, ...toErrMeta(e) });
            throw e;
          }
        },
        {
          retries: 3,
          baseDelayMs: 1500,
          factor: 2,
          label: "scrape item",
          context: ctx,
        }
      ).catch(async (e) => {
        log("ERROR", "item", "Failed scraping item (will continue).", { ...ctx, ...toErrMeta(e) });

        // Try to recover by recreating the page if it got into a bad state
        try {
          if (page) await page.close();
        } catch (closeErr) {
          log("WARN", "recovery", "Failed to close page during recovery.", { ...ctx, ...toErrMeta(closeErr) });
        }

        try {
          page = await ensurePage();
          log("INFO", "recovery", "Recovered by creating a new page.", ctx);
        } catch (ensureErr) {
          log("ERROR", "recovery", "Failed to recover by creating a new page. Scrape may not continue correctly.", {
            ...ctx,
            ...toErrMeta(ensureErr),
          });
        }
      });
    }

    log("INFO", "shutdown", "Scrape run complete.", { total, saved: existing.length, uniqueKeys: scrapedKeySet.size });

    try {
      if (page) await page.close();
      log("DEBUG", "shutdown", "Page closed.");
    } catch (e) {
      log("WARN", "shutdown", "Failed to close page.", toErrMeta(e));
    }

    try {
      if (browser) await browser.close();
      log("INFO", "shutdown", "Browser closed.");
    } catch (e) {
      log("WARN", "shutdown", "Failed to close browser.", toErrMeta(e));
    }
  } catch (err) {
    log("ERROR", "fatal", "Unhandled error in scraper.", toErrMeta(err));

    // Best-effort cleanup
    try {
      if (page) await page.close();
    } catch (e) {
      log("WARN", "fatal", "Cleanup: failed to close page.", toErrMeta(e));
    }

    try {
      if (browser) await browser.close();
    } catch (e) {
      log("WARN", "fatal", "Cleanup: failed to close browser.", toErrMeta(e));
    }
  }
}
justMyLookContent();
