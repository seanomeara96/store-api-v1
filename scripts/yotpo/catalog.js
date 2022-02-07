const store = "bsk";
require("../../config/config").config(store);
const { convert } = require("html-to-text");
const { getAllBrands } = require("../../functions/brands/getAllBrands");
const {
  getAllProductImages,
} = require("../../functions/images/getAllProductImages");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");
const { output } = require("../utils/output");

const yotpoFormat = (products) =>
  products.map((product) => ({
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
    "Spec MPN": product.sku, // string
    "Spec ISBN": product.upc, // string
    "Spec EAN": product.upc, // string
    "Product Tags": "", // string one tag allowed not required / understtod leaving blank
    Blacklisted: "FALSE", // boolean string
    "Product Group": "",
  }));

/**
 * this function only exists because bigcommerce's image sorting sytem is fucking stupid
 */
const findFirstImage = (images, result = undefined, n = 0) =>
  !images.length
    ? { url_standard: "" }
    : result
    ? result
    : findFirstImage(
        images,
        images.find((i) => i.sort_order === n),
        n + 1
      );

const fulfilledValues = (promiseResponses) =>
  promiseResponses
    .filter(({ status }) => status === "fulfilled")
    .map(({ value }) => value);

const imagesFromResponses = (imageResponses) =>
  fulfilledValues(imageResponses)
    .map(({ product_id, images }) => ({
      product_id,
      firstImage: findFirstImage(images),
    }))
    .map(({ product_id, firstImage }) => ({
      product_id,
      image: firstImage.url_standard,
    }));

const mapImagesToProducts = (images, products) =>
  products.map((product) => ({
    ...product,
    image: (images.find((i) => i.product_id === product.id) || {image: ""}).image,
  }));

const getImages = async (products) => {
  try {
    const imageResponses = await Promise.allSettled(
      products.map(({ id }) => getAllProductImages(id))
    );
    return mapImagesToProducts(imagesFromResponses(imageResponses), products);
  } catch (err) {
    throw new Error(err);
  }
};

const updateUrls = (products) =>
  products.map((product) => ({
    ...product,
    url: getSiteUrl(store) + product.custom_url.url,
  }));

const mapBrandsToProducts = async (products) => {
  try {
    const brands = await getAllBrands();
    return products.map((product) => ({
      ...product,
      brand: (
        brands.find((brand) => brand.id === product.brand_id) || { name: "" }
      ).name,
    }));
  } catch (err) {
    throw new Error(err);
  }
};

const convertHtmlToPlainText = (products) =>
  products.map((product) => ({
    ...product,
    description: convert(product.description),
  }));

const writeYotpoFile = async (products) =>
  await output(`${store}-yotpo`, products);

/**
 * products without brands are discontinued
 * @param {*} products
 * @returns
 */
const filterProductsWithBrand = (products) =>
  products.filter(({ brand }) => brand !== "");

function main() {
  getAllProducts()
    .then(mapBrandsToProducts)
    .then(convertHtmlToPlainText)
    .then(getImages)
    .then(updateUrls)
    .then(filterProductsWithBrand)
    .then(yotpoFormat)
    .then(writeYotpoFile);
}
function test() {
  getAllProductImages(5573).then(({images}) => console.log(findFirstImage(images)));
}
main();
