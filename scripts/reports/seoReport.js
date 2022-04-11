require("../../config/config");
const ejs = require("ejs");
const sgMail = require("@sendgrid/mail");
const { readFileSync } = require("fs"), {
  getAllCategories,
} = require("../../functions/categories/getAllCategories"), { getAllBrands } = require("../../functions/brands/getAllBrands");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");
const { store } = require("../../config/config");


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function needsSEO(page) {
  return (page.meta_description.length < 1 || page.page_title.length < 1)
}

function visibleButNeedsSEO(page) {
  return needsSEO(page) && page.is_visible
}

function renderNotification(storeUrl, storeName, type, storeHash, id, slug) {
  return ejs.render(readFileSync("./seoReport/notification.ejs", {
    encoding: "utf8"
  }), {
    storeUrl, storeName, type, storeHash, id, slug
  });
}


/**
 * 
 * @param {checkTheSEO} storeInitials 
 * @returns 
 */
function checkSeo(store) {

  require("../../config/config").config(store.initial);

  const { storeHash } = store;

  return new Promise(async (resolve, reject) => {
    try {
      let brands = await getAllBrands();
      brands.forEach((brand) => {
        brand.pageType = "brand"
        if (!brand.page_title) {
          brand.page_title = "";
        }
        if (!brand.meta_description) {
          brand.meta_description = "";
        }
      });
      brands = brands.filter(needsSEO);

      let cats = await getAllCategories();
      cats.forEach((cat) => {
        cat.pageType = "category";
        if (!cat.page_title) {
          cat.page_title = "";
        }
        if (!cat.meta_description) {
          cat.meta_description = "";
        }
      });
      cats = cats.filter(visibleButNeedsSEO);

      const data = brands.concat(cats).map(page => renderNotification(
        store.url,
        store.name,
        page.pageType,
        storeHash,
        page.id,
        page.custom_url.url
      ));

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
function checkAllSeo() {
  const allStores = [
    { initial: "bf", name: "BeautyFeatures" },
    { initial: "bsk", name: "BeautySkincare" },
    { initial: "ah", name: "AllHair" },
    { initial: "pb", name: "Pregnancy&Baby" },
    { initial: "ih", name: "InHealth" },
    { initial: "bs", name: "BabySafety" },
    { initial: "huk", name: "Haakaa Uk" },
    { initial: "hie", name: "Haakaa Ireland" },
  ];
  /**
   * add store hash & url to each store
   */
  allStores.forEach(
    (store) => {
      /**
       * add store hash
       */
      store.storeHash =
        process.env[`${store.initial.toUpperCase()}_STORE_HASH`];
      /**
       * add store Url
       */
      store.url = getSiteUrl(store.initial);
    }
  );

  const responses = [];

  /**
   * check seo for each store one by one
   */
  let allStorePromises = allStores.map(
    (store) => () => checkSeo(store)
  );
  allStorePromises.reduce(
    (acc, cur, indx) =>
      acc
        .then(cur)
        .then((res) => responses.push(res))
        .then(() => {
          /**
           * when all stores have been checked send an email with the data
           */
          if (indx === allStores.length - 1 && responses.length)
            sendMail(responses);
        }),
    Promise.resolve()
  );
}

function sendMail(responses) {
  if (!responses)
    throw new Error(
      "Either an html string or an array of such strings is expected to be passed in here"
    );
  let data = responses;
  if (Array.isArray(responses)) {
    data = responses.join("\n");
  }
  const msg = {
    to: ["sean@beautyfeatures.ie"],
    from: "sean@beautyfeatures.ie",
    subject: "These Pages Require Page Titles & Meta Descriptions",
    text: "Page Titles and Meta Descriptions",
    html: data,
  };
  sgMail
    .send(msg)
    .then(() => console.log("Email sent"))
    .catch((err) => error(err.response.body.errors));
}
checkAllSeo();
