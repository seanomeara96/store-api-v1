import { AxiosInstance } from "axios";
import { NewImageParams } from "../../../functions/products/createProduct";

export class ProductImages {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async create(product_id: number, params: NewImageParams) {
    try {
      await this.client.post(`/catalog/products/${product_id}/images`, params);
    } catch (err) {
      throw err;
    }
  }

  async delete(product_id: number, image_id: number) {
    try {
      const path = `/catalog/products/${product_id}/images/${image_id}`;
      const res = await this.client.delete(path);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async getAll(product_id: number) {
    try {
      const path = `/catalog/products/${product_id}/images`;
      const res = await this.client.get(path);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }
}
