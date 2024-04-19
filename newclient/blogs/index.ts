import { AxiosInstance } from "axios";

export class Blogs {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async create() {
    try {
      const res = await this.client.post(``);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }
}
