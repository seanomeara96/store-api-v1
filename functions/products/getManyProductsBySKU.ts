import { getAllProducts } from "./getAllProducts";

export const getManyProductsBySKU = (skuArray: { [key: string]: number }[]) =>
  new Promise((resolve, reject) => {
    if (!skuArray.length) return reject("No SKUs provided");
    if (!skuArray[0].hasOwnProperty("sku"))
      return reject("must provide sku number under propery 'sku'");
    let promises: Promise<any>[] = [];
    let products: any = [];
    skuArray.forEach((SKU) => {
      promises.push(
        getAllProducts({
          sku: SKU.sku,
        })
          .then((product) => products.push(product[0]))
          .catch((err) => reject(err))
      );
    });
    Promise.allSettled(promises)
      .then(() => resolve(products))
      .catch((err) => console.log(err));
  });
