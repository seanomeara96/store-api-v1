export function getOrderShipment(orderID: number):Promise<Shipment[]> {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await require("../../config/config").store.get(
          `/orders/${orderID}/shipments`
        );
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    });
  }

interface Shipment {
    id: number;
    order_id: number;
    customer_id: number;
    order_address_id: number;
    date_created: string;
    tracking_number: string;
    shipping_method: string;
    shipping_provider: string;
    tracking_carrier: string;
    tracking_link: string;
    comments: string;
    billing_address: Address;
    shipping_address: Address;
    items: ShipmentItem[];
  }
  
  interface Address {
    first_name: string;
    last_name: string;
    company: string;
    street_1: string;
    street_2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    country_iso2: string;
    phone: string;
    email: string;
  }
  
  interface ShipmentItem {
    order_product_id: number;
    product_id: number;
    quantity: number;
  }
  
