require("../../config/config");
import ejs from "ejs";

import { readFileSync } from "fs";
import { getAllCategories } from "../../functions/categories/getAllCategories";
import { getAllBrands } from "../../functions/brands/getAllBrands";
import { getSiteUrl } from "../../functions/utils/getSiteUrl";
import { stringify } from "csv-stringify";
import path from "path";
import { Brand } from "../../functions/brands/Brand";
import { Category } from "../../functions/categories/createCategory";

import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);


const templatepath = path.resolve(__dirname, "./seoReport/notification.ejs");
const template = readFileSync(templatepath, { encoding: "utf8" });

type Stores = {
  initial: string;
  name: string;
  storeHash?: string;
  url?: string;
}[];

interface ExtendedBrand extends Brand {
  pageType: string;
  storeHash: string;
  storeName: string;
  storeUrl: string;
}
interface ExtendedCategory extends Category {
  pageType: string;
  storeHash: string;
  storeName: string;
  storeUrl: string;
}

async function checkAllSeo(allStores: Stores, recipients: string[]) {
  const responses = [];
  for (const store of allStores) {
    store.storeHash = process.env[`${store.initial.toUpperCase()}_STORE_HASH`];
    if (!store.storeHash) {
      throw new Error("need store hash");
    }
    store.url = getSiteUrl(store.initial);
    if (!store.url) {
      throw new Error("need store url");
    }
    console.log("scanning store", store.url);
    let storeSEO: (ExtendedBrand | ExtendedCategory)[]
    try {
      require("../../config/config").config(store.initial);
      function getStoreSEO(): Promise<(ExtendedBrand | ExtendedCategory)[]> {
        return new Promise(async (resolve, reject) => {
          try {
            let brands = (await getAllBrands()) as ExtendedBrand[];
            const brandsNeedUpdate = [];
            for (const brand of brands) {
              brand.pageType = "brand";
              if (!brand.page_title) brand.page_title = "";
              if (!brand.meta_description) brand.meta_description = "";
              if (
                brand.meta_description.length < 1 ||
                brand.page_title.length < 1
              ) {
                brandsNeedUpdate.push(brand);
              }
            }

            let cats = (await getAllCategories()) as ExtendedCategory[];
            const catNeedsUpdate = [];
            for (const cat of cats) {
              cat.pageType = "category";
              if (!cat.page_title) cat.page_title = "";
              if (!cat.meta_description) cat.meta_description = "";
              if (
                (cat.meta_description.length < 1 ||
                  cat.page_title.length < 1) &&
                cat.is_visible
              ) {
                catNeedsUpdate.push(cat);
              }
            }

            const data: (ExtendedBrand | ExtendedCategory)[] = [
              ...brandsNeedUpdate,
              ...catNeedsUpdate,
            ];
            for (const page of data) {
              page.storeHash = store.storeHash!;
              page.storeName = store.name;
              page.storeUrl = store.url!;
            }

            resolve(data);
          } catch (err) {
            reject(err);
          }
        });
      }
      storeSEO = await getStoreSEO();
      console.log(storeSEO.length, "responses on this site");
    } catch (err) {
      console.log(err);
      continue;
    }
    responses.push(storeSEO);
  }
  const issues = responses.filter((arr) => arr.length).flat();

  if (!issues.length) return;

  if (!issues) return console.log("something wrong with issues");

  const toStringify = issues.map((r) => {
    return {
      id: r.id,
      storeName: r.storeName,
      type: r.pageType,
      name: r.name,
      url: r.custom_url ? r.storeUrl + r.custom_url.url : "",
      edit: `https://store-${r.storeHash}.mybigcommerce.com/manage/products/${
        r.pageType === "brand" ? "brands" : "categories"
      }/${r.id}/edit`,
    };
  });

  stringify(toStringify, { header: true }, (err, out) => {
    if (err) return console.log(err);
    const msg = {
      to: recipients,
      from: "sean@beautyfeatures.ie",
      subject: "These Pages Require Page Titles & Meta Descriptions",
      text: "Page Titles and Meta Descriptions",
      html: ejs.render(template, {
        pages: issues.map((page) => ({
          name: page.name,
          storeUrl: page.storeUrl,
          storeName: page.storeName,
          type: page.pageType,
          storeHash: page.storeHash,
          id: page.id,
          url: page.custom_url ? page.storeUrl + page.custom_url.url : "",
        })),
      }),
      attachments: [
        {
          content: Buffer.from(out).toString("base64"),
          filename: "need-seo.csv",
          type: "text/csv",
          disposition: "attachment",
        },
      ],
    };
    sgMail
      .send(msg)
      .then(() => console.log("Email sent"))
      .catch((err) => console.log(err.response.body.errors));
  });
}

const stores: Stores = [
  { initial: "bf", name: "BeautyFeatures" },
  { initial: "bsk", name: "BeautySkincare" },
  { initial: "ah", name: "AllHair" },
  { initial: "pb", name: "Pregnancy&Baby" },
  { initial: "ih", name: "InHealth" },
  { initial: "bs", name: "BabySafety" },
  { initial: "hie", name: "Haakaa Ireland" },
  { initial: "ds", name: "DogSpace" },
  { initial: "stie", name: "Sleepytot IE" },
];
checkAllSeo(stores, [
  "sean@beautyfeatures.ie",
  // "shannon@beautyfeatures.ie",
  // "daryl@beautyfeatures.ie",
]);

/**checkAllSeo(
  [
    { initial: "ch", name: "Caterhire" },
    { initial: "ha", name: "HireAll" },
  ],
  ["sean@beautyfeatures.ie"]
)
*/
