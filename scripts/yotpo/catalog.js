require("../../config/config").config("fs")
const {
  getAllProductImages,
} = require("../../functions/images/getAllProductImages");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");

const yotpoFormat = (product) => {
  return {
    "Product ID": product.id, // required string
    "Product Name": product.name, // required string
    "Product Description": product.description, // string
    "Product URL": getSiteUrl("bf") + product.url, // required string
    "Product Image URL": product.image, // string
    "Product Price": product.sale, // integer
    Currency: "EUR", // default
    "Spec UPC": "null", // string
    "Spec SKU": "null", // string
    "Spec Brand": "null", // string
    "Spec MPN": "null", // string
    "Spec ISBN": "null", // string
    "Spec EAN": "null", // string
    "Product Tags": "", // string one tag allowed not required / understtod leaving blank
    Blacklisted: false, // boolean
    "Product Group": "null",
  };
};
const getImages = async (products) => {
  const imageResponses = await Promise.allSettled(
    products.map(({ id }) => getAllProductImages(id))
  );

  const images = imageResponses
    .filter((ii) => ii.status === "fulfilled")
    .map(({ value }) => value);

  return products.map((product) => ({
    ...product,
    images: images.find((i) => i.product_id === product.id).images || [],
  }));
};
function main() {
  getAllProducts().then(getImages).then(products => console.log(products[0].images));
  // .then(updateUrls)
  // .then(yotpoFormat)
  // .then(output);
}
main()