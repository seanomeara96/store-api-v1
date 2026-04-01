import { getAll } from "../utils/getAll";
import { Order } from "./Order";
/**
 * requires version 2
 */
export type GetAllOrdersParams = {
  min_id?: number;
  max_id?: number;
  min_total?: number;
  max_total?: number;
  customer_id?: number;
  email?: string;
  status_id?: number;
  cart_id?: string;
  payment_method?: string;
  min_date_created?: string;
  max_date_created?: string;
  min_date_modified?: string;
  max_date_modified?: string;
  page?: number;
  limit?: number;
  sort?:
    | "id"
    | "customer_id"
    | "date_created"
    | "date_modified"
    | "status_id"
    | "channel_id"
    | "external_id"
    | `${"id" | "customer_id" | "date_created" | "date_modified" | "status_id" | "channel_id" | "external_id"}:${"asc" | "desc"}`;
  channel_id?: number;
  include?: Array<"consignments" | "consignments.line_items" | "fees">;
  consignment_structure?: "object";
  external_order_id?: string;
};

export const getAllOrders = getAll("/orders") as (
  params?: GetAllOrdersParams,
) => Promise<Order[]>;
