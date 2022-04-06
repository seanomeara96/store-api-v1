import { deleteProduct } from "./deleteProduct";

export const deleteManyProducts = (idObjects: { [key: string]: number }[]) =>
  new Promise((resolve, reject) => {
    const ids = idObjects.map((id) => Object.values(id)[0]);
    const promises = ids.map((id) => deleteProduct(id));
    Promise.allSettled(promises).then(resolve).catch(reject);
  });
