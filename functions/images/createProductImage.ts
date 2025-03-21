import { NewImageParams } from "../products/createProduct";
import FormData from "form-data";
import {Readable } from "stream"
import fs from "fs";
import { ProductImage } from "./getProductImage";
/**
 * copied to client.ts
 * @param product_id
 * @param params
 * @returns
 */
export function createProductImage(
  product_id: number,
  params: NewImageParams
): Promise<undefined> {
  return new Promise(async function (resolve, reject) {
    try {
      await require("../../config/config").store.post(
        `/catalog/products/${product_id}/images`,
        params
      );
      resolve(undefined);
    } catch (err) {
      reject(err);
    }
  });
}

export function createProductImageFromFile(
  product_id: number,
  imagePath: string,
  imageName: string,
  isThumbnail: boolean,
  sortOrder: number,
): Promise<undefined> {
  return new Promise(async function (resolve, reject) {
    try {
      const formData = new FormData();
      formData.append("image_file", fs.createReadStream(imagePath), imageName);
      formData.append("is_thumbnail", String(isThumbnail));
      formData.append("sort_order", String(sortOrder));
      await require("../../config/config").store.post(
        `/catalog/products/${product_id}/images`,
        formData,
        {
          headers: formData.getHeaders(),
        }
      );
      resolve(undefined);
    } catch (err) {
      reject(err);
    }
  });
}


export function createProductImageFromBuffer(
  product_id: number,
  imageBuffer: Buffer,
  imageName: string,
  isThumbnail: boolean,
  sortOrder: number,
): Promise<ProductImage> {
  return new Promise(async function (resolve, reject) {
    try {
      // Create a FormData object
      const formData = new FormData();

      // Convert the buffer to a readable stream
      const readableStream = new Readable();
      readableStream.push(imageBuffer);
      readableStream.push(null); // Signal the end of the stream

      // Append the image buffer as a file
      formData.append('image_file', readableStream, imageName);

      // Append additional fields
      formData.append('is_thumbnail', String(isThumbnail));
      formData.append('sort_order', String(sortOrder));

      // Make the API request
      const res = await require('../../config/config').store.post(
        `/catalog/products/${product_id}/images`,
        formData,
        {
          headers: formData.getHeaders(),
        },
      );

      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}