import { ProductVariant } from "../../newclient/products/variants";

import { getAll } from "../utils/getAll";
/**
 * @param {*} params
 * @returns resolves with an array of product variants objects
 */
export async function getAllProductVariants(
  params?: any,
): Promise<ProductVariant[]> {
  return getAll(`/catalog/variants`)(params);
}
