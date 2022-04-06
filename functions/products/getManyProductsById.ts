import { getAllProducts } from "./getAllProducts";

export const getManyProductsById = (idArray: number[]) =>
  new Promise((resolve, reject) => {
    let promises: any = [];
    let products: any = [];
    idArray.forEach((id) => {
      promises.push(
        getAllProducts({
          id,
        })
          .then((product) => products.push(product[0]))
          .catch((err) => reject(err))
      );
    });
    Promise.allSettled(promises)
      .then(() => resolve(products))
      .catch((err) => console.log(err));
  });
// 3615