import { getOrderProducts } from "./getOrderProducts";
export const getOrderProductNames = (order:any) =>
  new Promise((resolve, reject) => {
    getOrderProducts(order)
      .then((e: any) => resolve(e.map((g: any) => g.name)))
      .catch(reject);
  });
