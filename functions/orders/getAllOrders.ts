import { getAll } from "../utils/getAll";
import { Order } from "./Order";
/**
 * requires version 2
 */
export const getAllOrders = getAll("/orders") as (
  params?: any
) => Promise<Order[]>;
