const store = "bf";
require("../../config/config").config(store);
const { convert } = require("html-to-text");
const { getAllBrands } = require("../../functions/brands/getAllBrands");
const {
  getAllProductImages,
} = require("../../functions/images/getAllProductImages");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");
const { output } = require("../utils/output");

const yotpoFormat = (products) => {
  return products.map((product) => ({
    "Product ID": product.id, // required string
    "Product Name": product.name, // required string
    "Product Description": product.description, // string
    "Product URL": product.url, // required string
    "Product Image URL": product.image, // string
    "Product Price": product.sale_price, // integer
    Currency: "EUR", // default
    "Spec UPC": product.upc, // string
    "Spec SKU": product.sku, // string
    "Spec Brand": product.brand, // string
    "Spec MPN": "", // string
    "Spec ISBN": product.upc, // string
    "Spec EAN": product.upc, // string
    "Product Tags": "", // string one tag allowed not required / understtod leaving blank
    Blacklisted: "FALSE", // boolean string
    "Product Group": "",
  }));
};

/**
 * this function only exists because bigcommerce's image sorting sytem is fucking stupid
 */
const findFirstImage = (images, result = undefined, n = 0) => {
  if (!images.length) {
    return { url_standard: "" };
  }
  if (result) {
    return result;
  }
  return findFirstImage(
    images,
    images.find((i) => i.sort_order === n),
    n + 1
  );
};

const imagesFromResponses = (imageResponses) => {
  return imageResponses
    .filter((ii) => ii.status === "fulfilled")
    .map(({ value }) => value)
    .map(({ product_id, images }) => ({
      product_id,
      images: findFirstImage(images),
    }))
    .map(({ product_id, images }) => ({
      product_id,
      image: images.url_standard,
    }));
};

const mapImagesToProducts = (images, products) => {
  return products.map((product) => ({
    ...product,
    image: images.find((i) => i.product_id === product.id).image,
  }));
};

const getImages = async (products) => {
  const imageResponses = await Promise.allSettled(
    products.map(({ id }) => getAllProductImages(id))
  );
  return mapImagesToProducts(imagesFromResponses(imageResponses), products);
};

const updateUrls = (products) =>
  products.map((product) => ({
    ...product,
    url: getSiteUrl(store) + product.custom_url.url,
  }));

const getBrands = async (products) => {
  const brands = await getAllBrands();
  return products.map((product) => ({
    ...product,
    brand: (
      brands.find((brand) => brand.id === product.brand_id) || { name: "" }
    ).name,
  }));
};

const convertHtmlToPlainText = (products) => {
  return products.map((product) => ({
    ...product,
    description: convert(product.description),
  }));
};

const writeYotpoFile = (products) => {
  output(`${store}-yotpo`, products);
};

function main() {
  getAllProducts()
    .then(getBrands)
    .then(convertHtmlToPlainText)
    .then(getImages)
    .then(updateUrls)
    .then(yotpoFormat)
    .then(writeYotpoFile);
}
function test() {
  getAllProductImages(181).then(console.log);
}
main();
