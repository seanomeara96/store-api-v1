import { AxiosInstance } from "axios";
import { BrandCreationParams } from "../../functions/brands/createBrand";
import { Brand } from "../../functions/brands/Brand";

/**
 * Brands
 */
export class Brands {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async create(params: BrandCreationParams): Promise<Brand> {
    try {
      const res = await this.client.post(`/catalog/brands`, params);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async update(brand_id: number, params: any): Promise<Brand> {
    try {
      const res = await this.client.put(`/catalog/brands/${brand_id}`, params);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async get(brand_id: number) {
    try {
      const res = await this.client.get(`/catalog/brands/${brand_id}`);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }
  async getMany(params: any): Promise<Brand[]> {
    try {
      const res = await this.client.get("/catalog/brands/", { params });
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async getAll(params: any) {
    try {
      const all = [];
      let page = 1;

      if (!params.limit || params.limit == 0) {
        params.limit = 250;
      }

      while (true) {
        const batch = await this.getMany({
          params: {
            limit: 250,
            page: page,
            ...params,
          },
        });

        if (batch.length) {
          all.push(...batch);
          page++;
          continue;
        } else {
          return all;
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async delete(brand_id: number) {
    try {
      await this.client.delete(`/catalog/brands/${brand_id}`);
    } catch (err) {
      throw err;
    }
  }
}
