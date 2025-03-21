import { getAllProductImages } from "../../functions/images/getAllProductImages";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { output } from "../utils/output";
import path from "path";
import axios from "axios";
import imageSize from "image-size";

const store = "ch";
require("../../config/config").config(store);

async function test() {
  try {
    const data: any[] = [];
    const params = { "categories:in": 34 };
    const products = await getAllProducts(params);

    for (let i = 0; i < products.length; i++) {
      console.log(i, products.length);

      const product = products[i];
      const images = await getAllProductImages(product.id);
      for (let ii = 0; ii < images.length; ii++) {
        const image = images[ii];
        // Specify the URL of the image

        const storehash = process.env[store.toUpperCase() + `_STORE_HASH`];
        const imageUrl =
          `https://store-${storehash}.mybigcommerce.com/product_images/` +
          image.image_file;

        console.log(imageUrl);

        let response;

        try {
          response = await axios.get(imageUrl, {
            responseType: "arraybuffer",
          });
        } catch (err: any) {
          // console.log(err.response ? err.response.data : err);
          continue;
        }

        // Use image-size to get image dimensions
        const dimensions = imageSize(response.data);

        // Extract relevant information
        const imageSizeInBytes = response.headers["content-length"];
        const imageWidth = dimensions.width;
        const imageHeight = dimensions.height;

        if (!imageHeight || !imageWidth) {
          console.log("no image data");
          return;
        }

        // console.log("Image Size: " + fileSize);
        // console.log("Dimensions: " + imageWidth + " x " + imageHeight);
        const excesive_file_size_gt_70_kb = imageSizeInBytes / 1024 > 70;
        const not_square = imageWidth != imageHeight;
        const excessive_file_dimensions =
          imageWidth > 1000 || imageHeight > 1000;

        let priority = "LOW";
        if (not_square && excessive_file_dimensions) {
          priority = "MID";
        }
        if (excesive_file_size_gt_70_kb && not_square && excessive_file_dimensions) {
          priority = "HIGH";
        }

        data.push({
          product_id: product.id,
          image_id: image.id,
          sort_order: image.sort_order,
          is_thumbnail: image.is_thumbnail,
          sku: product.sku,
          name: product.name,
          image_url: imageUrl,
          file_size: imageSizeInBytes,
          width: imageWidth,
          height: imageHeight,
          excesive_file_size_gt_70_kb,
          not_square,
          excessive_file_dimensions,
        });
      }
    }

    await output(path.resolve(__dirname, "image-audit.csv"), data, true);
  } catch (err: any) {
    console.log(err.response ? err.response.data : err);
  }
}
test();

function formatBytes(bytes: string | number, decimals = 2) {
  console.log(bytes);

  if (typeof bytes === "string") {
    bytes = parseInt(bytes);
  }

  console.log("bytes, decimals", bytes, decimals, typeof bytes);
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Use a larger unit if the size is very large
  const adjustedSize = bytes / Math.pow(k, i);
  const roundedSize = parseFloat(adjustedSize.toFixed(decimals));

  return roundedSize + " " + sizes[i];
}
