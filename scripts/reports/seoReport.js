require("../../config/config");
const ejs = require("ejs");
const sgMail = require("@sendgrid/mail");
const { readFileSync } = require("fs"),
  { getAllCategories } = require("../../functions/categories/getAllCategories"),
  { getAllBrands } = require("../../functions/brands/getAllBrands");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");
const { stringify } = require("csv-stringify");
const path = require("path");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const templatepath = path.resolve(__dirname, "./seoReport/notification.ejs");
const template = readFileSync(templatepath, {
  encoding: "utf8",
});

async function checkAllSeo(allStores, recipients) {
  const responses = [];
  for (const store of allStores) {
    store.storeHash = process.env[`${store.initial.toUpperCase()}_STORE_HASH`];
    store.url = getSiteUrl(store.initial);
    console.log("scanning store", store.url);
    let storeSEO;
    try {
      require("../../config/config").config(store.initial);
      storeSEO = await new Promise(async (resolve, reject) => {
        try {
          let brands = await getAllBrands();
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

          let cats = await getAllCategories();
          const catNeedsUpdate = [];
          for (const cat of cats) {
            cat.pageType = "category";
            if (!cat.page_title) cat.page_title = "";
            if (!cat.meta_description) cat.meta_description = "";
            if (
              (cat.meta_description.length < 1 || cat.page_title.length < 1) &&
              cat.is_visible
            ) {
              catNeedsUpdate.push(cat);
            }
          }

          const data = brandsNeedUpdate.concat(...catNeedsUpdate);
          for (const page of data) {
            page.storeHash = store.storeHash;
            page.storeName = store.name;
            page.storeUrl = store.url;
          }

          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
      console.log(storeSEO.length, "responses on this site");
    } catch (err) {
      console.log(err);
      continue;
    }
    responses.push(storeSEO);
  }
  const issues = responses.filter((arr) => arr.length);
  if (!issues.length) return;

  if (!issues) return console.log("something wrong with issues");

  const toStringify = issues.map((r) => ({
    id: r.id,
    storeName: r.storeName,
    type: r.pageType,
    name: r.name,
    url: r.storeUrl + r.custom_url.url,
    edit: `https://store-${r.storeHash}.mybigcommerce.com/manage/products/${
      r.pageType === "brand" ? "brands" : "categories"
    }/${r.id}/edit`,
  }));
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
          url: page.storeUrl + page.custom_url.url,
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

/**checkAllSeo(
  [
    { initial: "bf", name: "BeautyFeatures" },
    { initial: "bsk", name: "BeautySkincare" },
    { initial: "ah", name: "AllHair" },
    { initial: "pb", name: "Pregnancy&Baby" },
    { initial: "ih", name: "InHealth" },
    { initial: "bs", name: "BabySafety" },
    { initial: "hie", name: "Haakaa Ireland" },
    { initial: "ds", name: "DogSpace" },
    { initial: "stie", name: "Sleepytot IE" },
  ],
  [
    "sean@beautyfeatures.ie",
    "shannon@beautyfeatures.ie",
    "daryl@beautyfeatures.ie",
  ]
); */

checkAllSeo(
  [
    { initial: "ch", name: "Caterhire" },
    { initial: "ha", name: "HireAll" },
  ],
  ["sean@beautyfeatures.ie" /*"daryl@beautyfeatures.ie"*/]
);
