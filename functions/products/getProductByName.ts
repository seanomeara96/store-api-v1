import { getAllProducts } from "./getAllProducts";

export const getProductByName = (productName: string): Promise<any> =>
  new Promise((resolve, reject) => {
    getAllProducts({ name: productName })
      .then((products:any[]) => {
        if (products.length < 1) {
          reject("No Products");
        } else if (products.length > 1) {
          reject("There are multiple producs with that name");
        } else {
          resolve(products[0]);
        }
      })
      .catch((err:any) => reject("Error in getProductByName"));
  });