import { ProductVariant } from "../../newclient/products/variants";

import { getAll } from "../utils/getAll";
/**
 * @param {*} params
 * @returns resolves with an array of product variants objects
 */
export const getAllProductVariants = getAll(`/catalog/variants`) as (
  params?: any
) => Promise<ProductVariant[]>;
