require("../config/config").config("bf");
const { getNumberOfImages } = require("../images/getNumberOfImages");
const { getAllProducts } = require("../products/getAllProducts");
const output = require("./utils/output");
async function numberOfImagesPerProduct() {
  const products = await getAllProducts();
  let promises = [];
  products.forEach(({ id }) => {
    promises.push(getNumberOfImages(id));
  });
  let responses = await Promise.allSettled(promises);
  responses = responses
    .filter((response) => response.status === "fulfilled")
    .map(({ value }) => {
      return { ...value };
    });
  const outputDoc = products.map(({ id, name, sku }) => {
    const hasImages = responses.find(({ product_id }) => product_id === id);
    const numberOfImages = hasImages ? hasImages["#images"] : null;
    console.log(numberOfImages);
    return {
      id,
      name,
      sku,
      "#images": numberOfImages,
    };
  });
  output("imagesPerProduct", outputDoc);
}
numberOfImagesPerProduct();
