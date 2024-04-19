import { AxiosInstance } from "axios";
import { Category, CategoryCreationParams } from "../../functions/categories/createCategory";

/**
 * categories
 */
export class Categories {
    private client: AxiosInstance;
  
    constructor(client: AxiosInstance) {
      this.client = client;
    }
  
    async getById(category_id: number): Promise<Category> {
      try {
        const res = await this.client.get(`/catalog/categories/${category_id}`);
        return res.data.data;
      } catch (err) {
        throw err;
      }
    }
  
    async getMany(params: any): Promise<Category[]> {
      try {
        const res = await this.client.get("/catalog/categories", { params });
        return res.data.data;
      } catch (err) {
        throw err;
      }
    }
  
    async getAll(params: any) {
      params.page = 1;
  
      if (!params.limit) {
        params.limit = 250;
      }
  
      const all = [];
      while (true) {
        const batch = await this.getMany({
          ...params,
          page: params.page,
          limit: params.limit,
        });
        if (!batch.length) {
          return all;
        }
        all.push(...batch);
        params.page++;
      }
    }
  
    // need typed update params
    async update(catId: number, fieldToUpdate: any) {
      try {
        const path = `/catalog/categories/${catId}`;
        const res = await this.client.put(path, fieldToUpdate);
        return res.data.data;
      } catch (err) {
        throw err;
      }
    }
  
    async create(params: CategoryCreationParams): Promise<Category> {
      try {
        const res = await this.client.post(`/catalog/categories`, params);
        return res.data.data;
      } catch (err) {
        throw err;
      }
    }
  
    async delete(category_id: number) {
      try {
        const path = `/catalog/categories/${category_id}`;
        await this.client.delete(path);
      } catch (err) {
        throw err;
      }
    }
  }