import { Brand } from "./Brand";

export const getBrandById = (brand_id: number): Promise<Brand> =>
  new Promise((resolve, reject) =>
    require("../../config/config")
      .store.get(`/catalog/brands/${brand_id}`)
      .then((res:any) => resolve(res.data.data))
      .catch(reject)
  );
