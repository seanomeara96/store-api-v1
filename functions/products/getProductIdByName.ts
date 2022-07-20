import { getProductByName } from "./getProductByName";

export const getProductIdByName = (name: string): Promise<number | string> => {
  return new Promise((resolve, reject) => {
    if (typeof name !== "string") return reject("type of name must be a string");
     getProductByName(name)
      .then((res) => resolve((res.id || res)))
      .catch(reject);
  });
};
