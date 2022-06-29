import { getProductByName } from "./getProductByName";

export const getProductIdByName = (name: string): Promise<number> => {
  return new Promise((reject, resolve) =>
    getProductByName(name)
      .then(({ id }) => resolve(id))
      .catch(reject)
  );
};
