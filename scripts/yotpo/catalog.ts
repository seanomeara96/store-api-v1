const store = "bsk";
require("../../config/config").config(store);
import { convert } from "html-to-text";
import { getAllBrands } from "../../functions/brands/getAllBrands";
import { getAllProductImages } from "../../functions/images/getAllProductImages";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getSiteUrl } from "../../functions/utils/getSiteUrl";
import { output } from "../utils/output";
import { Product } from "../../functions/products/Product";
import path from "path";

interface YotpoProduct extends Product {
  brand?: string;
  image?: string;
  url?: string;
}

async function main() {
  const products = (await getAllProducts()) as YotpoProduct[];
  const brands = await getAllBrands();

  for (const product of products) {
    product.brand =
      brands.find((brand) => (brand.id = product.brand_id))?.name || "";
    product.description = convert(product.description);
    product.url = getSiteUrl(store) + product.custom_url.url;
  }

  const promises = [];
  for (const product of products) {
    promises.push(getAllProductImages(product.id));
  }
  const imageResponses = await Promise.allSettled(promises);

  const imageResponseValues = [];
  for (const response of imageResponses) {
    if (response.status === "fulfilled") {
      imageResponseValues.push(response.value);
    }
  }

  for (const { product_id, images } of imageResponseValues) {
    const matchingProduct = products.find((p) => p.id === product_id);
    if (matchingProduct) {
      let firstImage = { url_standard: "" };

      if (!images.length) {
        return firstImage;
      }

      let n = 0;
      while (n < images.length) {
        const foundFirstImage = images.find((i: any) => i.sort_order === n);
        if (foundFirstImage) {
          firstImage = foundFirstImage;
          break;
        }
        n++;
      }

      matchingProduct.image = firstImage.url_standard;
    }
  }

  const productsWithBrand = products.filter(({ brand }) => brand !== "");

  const yotpoFormat = productsWithBrand.map((product) => ({
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

  await output(
    path.resolve(__dirname, "./yotpocatalog.csv"),
    yotpoFormat,
    true
  );
}

main();
