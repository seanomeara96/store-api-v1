const store = "ih";
require("./config/config").config(store);
const { getAllCategories } = require("./categories/getAllCategories");
const {
  deleteCategoryImage,
} = require("./categories/images/deleteCategoryImage");

const { getSiteUrl } = require("./utils/getSiteUrl");
async function run() {
  let url = getSiteUrl(store);
  let cats = await getAllCategories();
  let catsWithImage = cats.filter(({ image_url }) => image_url !== "");

  console.log(cats.length);
  console.log(catsWithImage);
}
async function main() {
  try {
    let cats = await getAllCategories();
    let catsWithImage = cats.filter(({ image_url }) => image_url !== "");
    console.log(catsWithImage.length)
    let promises = [];
    catsWithImage.forEach((cat) => promises.push(deleteCategoryImage(cat.id)));
    const responses = await Promise.allSettled(promises);
    console.log(responses);
  } catch (err) {
    console.log(err);
  }
}
run()