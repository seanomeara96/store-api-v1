import { getCategoryByName } from "./getCategoryByName";

export const getCategoryIdByName = (name: string) =>
  new Promise((resolve, reject) =>
    getCategoryByName(name)
      .then((i:any) => resolve(i.id))
      .catch((err) => reject(err))
  );
