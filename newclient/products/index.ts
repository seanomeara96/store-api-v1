import { AxiosInstance } from "axios";
import { ProductVariants } from "./variants";
import { ProductImages } from "./images";
import { ProductVideos } from "./videos";
import { Product } from "../../functions/products/Product";
import { productCreationFields } from "./types";

/**
 * Products
 */
export class Products {
  private client: AxiosInstance;
  variants: ProductVariants;
  images: ProductImages;
  videos: ProductVideos;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.images = new ProductImages(this.client);
    this.videos = new ProductVideos(this.client);
    this.variants = new ProductVariants(this.client);
  }

  async create(params: productCreationFields): Promise<Product> {
    try {
      const res = await this.client.post(`/catalog/products`, params);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async get(product_id: number): Promise<Product> {
    try {
      const res = await this.client.get(`/catclog/products/${product_id}`);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async delete(product_id: number): Promise<void> {
    try {
      await this.client.delete(`/catalog/products/${product_id}`);
    } catch (err) {
      throw err;
    }
  }
}
