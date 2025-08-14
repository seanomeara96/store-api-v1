import { ProductImage } from "./getProductImage";
import FormData from "form-data";
import { Readable } from "stream";
import fs from "fs";

export function updateProductImage(
  product_id: number,
  image_id: number,
  params: {
    image_url?: string;
    is_thumbnail?: boolean;
    sort_order?: number;
    description?: string;
  }
): Promise<ProductImage> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await require("../../config/config").store.put(
        `/catalog/products/${product_id}/images/${image_id}`,
        params
      );
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}

export function updateProductImageFromFile(
  product_id: number,
  image_id: number,
  imagePath: string,
  params: {
    is_thumbnail?: boolean;
    sort_order?: number;
    description?: string;
  }
): Promise<ProductImage> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append("image_file", fs.createReadStream(imagePath));
      
      if (params.is_thumbnail !== undefined) {
        formData.append("is_thumbnail", String(params.is_thumbnail));
      }
      if (params.sort_order !== undefined) {
        formData.append("sort_order", String(params.sort_order));
      }
      if (params.description) {
        formData.append("description", params.description);
      }

      const res = await require("../../config/config").store.put(
        `/catalog/products/${product_id}/images/${image_id}`,
        formData,
        { headers: formData.getHeaders() }
      );
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}

export function updateProductImageFromBuffer(
  product_id: number,
  image_id: number,
  imageBuffer: Buffer,
  imageName: string,
  params: {
    is_thumbnail?: boolean;
    sort_order?: number;
    description?: string;
  }
): Promise<ProductImage> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      const readableStream = new Readable();
      readableStream.push(imageBuffer);
      readableStream.push(null);
      formData.append("image_file", readableStream, imageName);

      if (params.is_thumbnail !== undefined) {
        formData.append("is_thumbnail", String(params.is_thumbnail));
      }
      if (params.sort_order !== undefined) {
        formData.append("sort_order", String(params.sort_order));
      }
      if (params.description) {
        formData.append("description", params.description);
      }

      const res = await require("../../config/config").store.put(
        `/catalog/products/${product_id}/images/${image_id}`,
        formData,
        { headers: formData.getHeaders() }
      );
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}