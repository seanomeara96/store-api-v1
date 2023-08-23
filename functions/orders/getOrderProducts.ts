import { Order } from "./Order";


export function getOrderProducts (order:Order):Promise<OrderProduct[]> {
  return new Promise((resolve, reject) => {
    const orderId = order.id;
    const { resource } = order.products;
    console.log("requesting products from order:", orderId);
    if (typeof orderId !== "number") {
      console.log("typeof orderId", typeof orderId);
      return reject("order id must be a number");
    }
    if (typeof resource !== "string") {
      console.log("typeof resource", typeof resource);
      return reject("resource must be a path string");
    }
    require("../../config/config")
      .store.get(resource)
      .then((e:any) => {
        console.log("success");
        resolve(e.data);
      })
      .catch(reject);
  });
}

interface AppliedDiscount {
  id: string;
  name: string;
  amount: string;
  code: string;
  target: 'order' | 'product';
}

interface ProductOption {
  id: number;
  option_id: number;
  order_product_id: number;
  product_option_id: number;
  display_name: string;
  display_value: string;
  value: string;
  type: 'Checkbox' | 'Date field' | 'File Upload' | 'Multi-line text field' | 
        'Multiple choice' | 'Product Pick List' | 'Swatch' | 'Text field';
  name: string;
  display_style: string;
  display_name_customer: string;
  display_name_merchant: string;
  display_value_customer: string;
  display_value_merchant: string;
  external_id: string;
  upc: string;
  variant_id: number;
  name_customer: string;
  name_merchant: string;
  gift_certificate_id: number;
}

export interface OrderProduct {
  id: number;
  order_id: number;
  product_id: number;
  order_pickup_method_id: number;
  order_address_id: number;
  name: string;
  sku: string;
  type: 'physical' | 'digital';
  base_price: string;
  price_ex_tax: string;
  price_inc_tax: string;
  price_tax: string;
  base_total: string;
  total_ex_tax: string;
  total_inc_tax: string;
  total_tax: string;
  quantity: number;
  base_cost_price: string;
  cost_price_inc_tax: string;
  cost_price_ex_tax: string;
  weight: number | string;
  cost_price_tax: string;
  is_refunded: boolean;
  quantity_refunded: number;
  refunded_amount: string;
  return_id: number;
  wrapping_name: string | null;
  base_wrapping_cost: string | number;
  wrapping_cost_ex_tax: string;
  wrapping_cost_inc_tax: string;
  wrapping_cost_tax: string;
  wrapping_message: string;
  quantity_shipped: number;
  event_name: string | null;
  event_date: string | null;
  fixed_shipping_cost: string;
  ebay_item_id: string;
  ebay_transaction_id: string;
  option_set_id: number;
  parent_order_product_id: number;
  is_bundled_product: boolean;
  bin_picking_number: string;
  applied_discounts: AppliedDiscount[];
  product_options: ProductOption[];
}



