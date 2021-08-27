const store = "ih";
require("./config/config").config(store);
const { getAllCategories } = require("./categories/getAllCategories");
const { getSiteUrl } = require("./utils/getSiteUrl");
async function run() {
  let url = getSiteUrl(store);
  let cats = await getAllCategories();
  let catsWithImage = cats
    .filter(({ image_url }) => image_url !== "")
    .map((i) => {
      return { ...i, url: url + i.custom_url.url };
    });
  console.log(cats.length);
  console.log(catsWithImage);
}
run();
