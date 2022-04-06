import { getAllProducts } from "./getAllProducts";

export const getManyProductsBySKU = (skuArray: { [key: string]: number }[]) =>
  new Promise((resolve, reject) => {
    let promises: Promise<any>[] = [];
    let products: any = [];
    skuArray.forEach((SKU) => {
      promises.push(
        getAllProducts({
          sku: Object.values(SKU)[0],
        })
          .then((product) => products.push(product[0]))
          .catch((err) => reject(err))
      );
    });
    Promise.allSettled(promises)
      .then(() => resolve(products))
      .catch((err) => console.log(err));
  });
