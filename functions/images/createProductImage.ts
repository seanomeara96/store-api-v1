import { NewImageParams } from "../products/createProduct";
import FormData from "form-data";
import fs from "fs";
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
