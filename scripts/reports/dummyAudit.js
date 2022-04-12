require("../../config/config");
const { log, error } = console;
const {
  getAllCategories,
} = require("../../functions/categories/getAllCategories"),
  { getAllProducts } = require("../../functions/products/getAllProducts");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");
const ejs = require("ejs");
const fs = require("fs");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function checkInStockDummy(store) {
  require("../../config/config").config(store.initial);
  return new Promise(async (resolve, reject) => {
    try {
      const products = await getAllProducts();
      const categories = await getAllCategories();
      /**
       * find dummy category
       */
      const dummyCategoryId = categories.find(
        ({ name }) => name.toLowerCase() === "dummy"
      ).id;
      /**
       * find products in dummy category and visible on front end
       */
      const liveProductsInDummy = products.filter(
        ({ categories, is_visible }) =>
          categories.includes(dummyCategoryId) && is_visible
      );
      /**
       * filter dummy, visible & in stock (high priority)
       */
      const productsInDummyAndInStockArray = liveProductsInDummy.filter(
        ({ inventory_level }) => inventory_level > 0
      );
      /**
       * Render notification oreach products
       */
      const productsInDummyAndInStockNotifications =
        productsInDummyAndInStockArray.map((product) => {
          console.log(product.name, store.name)
          return ejs.render(
            fs.readFileSync("./dummyAudit/notification.ejs", { encoding: "utf8" }),
            {
              productId: product.id,
              storeHash: store.storeHash,
              name: product.name,
              editUrl: store.store,
              storeName: store.name,
              storeUrl: store.url,
              slug: product.custom_url.url,
            }
          )
        }
        );

      resolve(productsInDummyAndInStockNotifications);
    } catch (err) {
      reject(err);
    }
  });
}
function sendInStockDummyAllStoresEmail(responses) {
  console.log(responses)
  let data = responses;
  if (Array.isArray(responses)) {
    data = responses.join("\n");
  }
  log(data);
  const msg = {
    to: "sean@beautyfeatures.ie",
    from: "sean@beautyfeatures.ie",
    subject: "Urgently Need to be Categorised",
    text: "Live, In Stock & In Dummy",
    html: data,
  };
  sgMail
    .send(msg)
    .then(() => log("Email sent"))
    .catch((err) => error(err.response.body.errors));
}
function checkInStockDummyAllStores() {
  const allStores = [
    { initial: "bf", name: "BeautyFeatures" },
    { initial: "bsk", name: "BeautySkincare" },
    { initial: "ah", name: "AllHair" },
    { initial: "pb", name: "Pregnancy&Baby" },
    { initial: "ih", name: "InHealth" },
    { initial: "bs", name: "BabySafety" },
    { initial: "huk", name: "Haakaa UK" },
    { initial: "hie", name: "Haakaa IE" },
    { initial: "ds", name: "DogSpace" },
    { initial: "stie", name: "SleepyTots IE" }
  ];

  /**
   * add store hash & url to each store
   */
  allStores.forEach((store) => {
    /**
     * add store hash
     */
    store.storeHash = process.env[`${store.initial.toUpperCase()}_STORE_HASH`];
    /**
     * add store Url
     */
    store.url = getSiteUrl(store.initial);
  });

  const responses = [];
  let allStorePromises = allStores.map(
    (store) => () => checkInStockDummy(store)
  );
  allStorePromises.reduce(
    (acc, cur, indx) =>
      acc
        .then(cur)
        .then((resArr) => resArr.forEach((res) => responses.push(res)))
        .then(() => {
          if (indx === allStores.length - 1 && responses.length) {
            const emailContent = responses.join("\n");
            sendInStockDummyAllStoresEmail(emailContent);
          }
        }),
    Promise.resolve()
  );
}

checkInStockDummyAllStores();
