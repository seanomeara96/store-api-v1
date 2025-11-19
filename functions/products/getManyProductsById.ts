import { getAllProducts } from "./getAllProducts";

export async function getManyProductsById(idArray: number[]) {
  try {
    let products: any = [];
    for (const id of idArray) {
      try {
        const product = await getAllProducts({ id });
        products.push(product[0]);
      } catch (err) {
        throw err;
      }
    }
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
// 3615
