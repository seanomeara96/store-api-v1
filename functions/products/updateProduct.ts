import { productUpdateFields } from "./createProduct";
import { Product } from "./Product";

/**
 * updates a product. must supply a valid field
 * @param {number} productId
 * @param {object} fieldToUpdate
 * @returns promise
 */
export async function updateProduct(
  productId: number,
  fieldToUpdate: productUpdateFields,
) {
  try {
    if (typeof productId !== "number")
      throw new Error("product id must be a number");
    if (typeof fieldToUpdate !== "object")
      throw new Error("field to update must be an object");
    const productURL = `/catalog/products/${productId}`;
    const { store } = require("../../config/config");
    const res = await store.put(productURL, {
      ...fieldToUpdate,
    });
    return res.data.data as Product;
  } catch (err) {
    throw err;
  }
}
