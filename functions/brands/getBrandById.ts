import { Brand } from "./Brand";
/**
 * copied to client
 * @param brand_id
 * @returns **/
export async function getBrandById(brand_id: number): Promise<Brand> {
  try {
    const config = require("../../config/config");
    const response = await config.store.get(`/catalog/brands/${brand_id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch brand with ID ${brand_id}: ${error}`);
  }
}
