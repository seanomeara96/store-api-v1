import { AxiosInstance } from "axios";

export class ProductVariantOptions {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }
}
