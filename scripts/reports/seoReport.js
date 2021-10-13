const {
  getAllCategories,
} = require("../../functions/categories/getAllCategories");
const { getAllBrands } = require("../../functions/brands/getAllBrands");
require("../../config/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function checkSeo(storeInitials) {
  const store = storeInitials;
  require("../../config/config").config(store);
  const storeHash = process.env[`${store.toUpperCase()}_STORE_HASH`];
  return new Promise(async (resolve, reject) => {
    try {
      let brands = await getAllBrands();
      brands.forEach((brand) => {
        if (!brand.page_title) {
          brand.page_title = "";
        }
        if (!brand.meta_description) {
          brand.meta_description = "";
        }
      });
      brands = brands.filter((brand) => {
        if (brand.meta_description.length < 1 || brand.page_title.length < 1) {
          return brand;
        }
      });

      let cats = await getAllCategories();
      cats.forEach((cat) => {
        if (!cat.page_title) {
          cat.page_title = "";
        }
        if (!cat.meta_description) {
          cat.meta_description = "";
        }
      });
      cats = cats.filter((cat) => {
        if (cat.meta_description.length < 1 || cat.page_title.length < 1) {
          if (cat.is_visible) {
            return cat;
          }
        }
      });

      if (brands.length) {
        brands = brands.map(
          (brand) =>
            `<p><a href="https://store-${storeHash}.mybigcommerce.com/manage/products/brands/${brand.id}/edit">${brand.name}</a></p>`
        );
      }

      if (cats.length) {
        cats = cats.map(
          (cat) =>
            `<p><a href="https://store-${storeHash}.mybigcommerce.com/manage/products/categories/${cat.id}/edit">${cat.name}</a></p>`
        );
      }

      let data = `<h1>${store}</h1>\n`;
      if (brands.length) {
        data = data + `<h2>Brands</h2>` + brands.join("\n");
      }
      if (cats.length) {
        data = data + `<h2>Categories</h2>` + cats.join("\n");
      }
      if (!brands.length && !cats.length) {
        data = data + `<h3>All Clear</h3>`;
      }
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
function checkAllSeo() {
  const allStores = ["bf", "bsk", "ah", "pb", "ih", "bs", "huk", "hie"];
  const responses = [];
  let allStorePromises = allStores.map((store) => () => checkSeo(store));
  allStorePromises.reduce(
    (acc, cur, indx) =>
      acc
        .then(cur)
        .then((res) => responses.push(res))
        .then(() => {
          if (indx === allStores.length - 1)
            sendInStockDummyAllStoresEmail(responses);
        }),
    Promise.resolve()
  );
}
function sendInStockDummyAllStoresEmail(responses) {
  if (!responses) throw new Error("Either an html sstring or an array of such strings is expected to be passed in here"); 
    let data = responses;
    if (Array.isArray(responses)) {
      data = responses.join("\n");
    }
    const msg = {
      to: ["sean@beautyfeatures.ie"],
      from: "sean@beautyfeatures.ie",
      subject: "Page Titles and Meta Descriptions",
      text: "Page Titles and Meta Descriptions",
      html: data,
    };
    sgMail
      .send(msg)
      .then(() => console.log("Email sent"))
      .catch((err) => error(err.response.body.errors));
  
}
checkAllSeo();
