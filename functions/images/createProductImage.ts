import { NewImageParams } from "../products/createProduct";
import FormData from "form-data";
import { Readable } from "stream";
import fs from "fs";
import { ProductImage } from "./getProductImage";

function getStore() {
  return require("../../config/config").store;
}

function getProductImagesPath(product_id: number) {
  return `/catalog/products/${product_id}/images`;
}

function buildImageFormData(
  imageFile: any,
  imageName: string,
  isThumbnail: boolean,
  sortOrder: number,
) {
  const formData = new FormData();
  formData.append("image_file", imageFile, imageName);
  formData.append("is_thumbnail", String(isThumbnail));
  formData.append("sort_order", String(sortOrder));
  return formData;
}

/**
 * Create a new image for a product using JSON payload parameters.
 *
 * Note: This function is duplicated in `client.ts`.
 *
 * @param product_id - The numeric ID of the product to attach the image to.
 * @param params - Image creation parameters (e.g. URL, description, thumbnail flag, sort order).
 * @returns A promise that resolves when the image has been created.
 */
export async function createProductImage(
  product_id: number,
  params: NewImageParams,
): Promise<undefined> {
  await getStore().post(getProductImagesPath(product_id), params);
  return undefined;
}

export async function createProductImageFromFile(
  product_id: number,
  imagePath: string,
  imageName: string,
  isThumbnail: boolean,
  sortOrder: number,
): Promise<undefined> {
  const formData = buildImageFormData(
    fs.createReadStream(imagePath),
    imageName,
    isThumbnail,
    sortOrder,
  );

  await getStore().post(getProductImagesPath(product_id), formData, {
    headers: formData.getHeaders(),
  });

  return undefined;
}

export async function createProductImageFromBuffer(
  product_id: number,
  imageBuffer: Buffer,
  imageName: string,
  isThumbnail: boolean,
  sortOrder: number,
): Promise<ProductImage> {
  const readableStream = Readable.from(imageBuffer);

  const formData = buildImageFormData(
    readableStream,
    imageName,
    isThumbnail,
    sortOrder,
  );

  const res = await getStore().post(
    getProductImagesPath(product_id),
    formData,
    {
      headers: formData.getHeaders(),
    },
  );

  return res.data.data;
}
