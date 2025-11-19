import { AxiosInstance } from "axios";
import { getAll } from "../utils/getAll";
/**
 * requires v2
 */
export const getAllBanners = getAll("/banners");

export class Banners {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  // TODO replace with get banner params
  /**
   * Will throw an error
   * @param params
   * @returns
   */
  async getAll(params: any = {}) {
    try {
      const banners: any[] = [];
      let pageNumber = 1;
      while (true) {
        const { data } = await this.client.get("/banners", {
          params: {
            limit: 250,
            page: pageNumber,
            ...params,
          },
        });

        const dataArray = data.data ?? data;

        if (dataArray.length) {
          banners.push(...dataArray);
          pageNumber++;
        } else {
          return banners;
        }
      }
    } catch (err) {
      throw err;
    }
  }
}
