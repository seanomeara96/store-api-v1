import { getAllProducts } from "./getAllProducts";

export async function getManyProductsBySKU(
  skuArray: { [key: string]: "string" }[],
) {
  if (!skuArray.length) throw new Error("No SKUs provided");
  if (!skuArray[0].hasOwnProperty("sku"))
    throw new Error("must provide sku number under property 'sku'");

  let products: any = [];

  try {
    for (const SKU of skuArray) {
      const product = await getAllProducts({ sku: SKU.sku });
      products.push(product[0]);
    }
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
