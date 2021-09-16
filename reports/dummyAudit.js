const { getAllCategories } = require("../categories/getAllCategories");
const { getAllProducts } = require("../products/getAllProducts");
require("../config/config")
const { log, error } = console;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function checkInStockDummy(storeInit) {
  require("./config/config").config(storeInit);
  return new Promise(async (resolve, reject) => {
    try {
      const products = await getAllProducts();
      const categories = await getAllCategories();
      const dummyCategoryId = categories.find(
        ({ name }) => name.toLowerCase() === "dummy"
      ).id;
      const liveProductsInDummy = products.filter(({ categories, is_visible }) =>
        categories.includes(dummyCategoryId) && is_visible
      );
      const productsInDummyAndInStockArray = liveProductsInDummy.filter(
        ({ inventory_level }) => inventory_level > 0
      )
      const productsInDummyAndInStockString = productsInDummyAndInStockArray
        .map(({ name, sku }) => `<div><p>Name: ${name} (${sku})</p></div>`)
        .join("\n");
      const finalHtml = productsInDummyAndInStockString.length ? productsInDummyAndInStockString : `<div><p>All Clear</p></div>`; 
      let storeInitials = `<div><strong>Store: ${storeInit.toUpperCase()}</strong></div>`;
      resolve(storeInitials + "\n" + finalHtml);
    } catch (err) {
      reject(err);
    }
  });
}
function sendInStockDummyAllStoresEmail(responses) {
  const data = responses.join("\n");
  log(data);
  const msg = {
    to: ["sean@beautyfeatures.ie", "john@beautyfeatures.ie"],
    from: "sean@beautyfeatures.ie",
    subject: "In Stock & In Dummy",
    text: "In Stock & In Dummy",
    html: data,
  };
  sgMail
    .send(msg)
    .then(() => log("Email sent"))
    .catch(err => error(err.response.body.errors));
}
function checkInStockDummyAllStores() {
  const allStores = ["bf", "bsk", "ah", "pb", "ih", "bs", "huk"];
  const responses = [];
  let allStorePromises = allStores.map(
    (store) => () => checkInStockDummy(store)
  );
  allStorePromises.reduce(
    (acc, cur, indx) =>
      acc
        .then(cur)
        .then((res) => responses.push(res))
        .then(() =>
          indx === allStores.length - 1
            ? sendInStockDummyAllStoresEmail(responses)
            : null
        ),
    Promise.resolve()
  );
}
checkInStockDummyAllStores();
