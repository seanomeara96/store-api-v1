type ConsignmentResponse = {
  pickups: PickupConsignment[];
  shipping: ShippingConsignment[];
  downloads: DownloadConsignment[];
  email: EmailConsignment;
};
export function getOrderConignment(orderID: number):Promise<ConsignmentResponse> {
  return new Promise(async function (resolve, reject) {
    try {
      const response = await require("../../config/config").store.get(
        `/orders/${orderID}/consignments`
      );
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

interface PickupConsignment {
  id: number;
  pickup_method_id: number;
  pickup_method_display_name: string;
  collection_instructions: string;
  collection_time_description: string;
  location: PickupLocation;
  line_items: LineItem[];
}

interface PickupLocation {
  id: number;
  name: string;
  code: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  postal_code: string;
  country_alpha2: string;
  email: string;
  phone: string;
}

interface LineItem {
  url: string;
  resource: string;
}

interface ShippingConsignment {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  street_1: string;
  street_2: string;
  city: string;
  zip: string;
  country: string;
  country_iso2: string;
  state: string;
  email: string;
  phone: string;
  form_fields: FormField[];
  line_items: LineItem[];
  items_total: number;
  items_shipped: number;
  shipping_method: string;
  base_cost: number;
  cost_ex_tax: number;
  cost_inc_tax: number;
  cost_tax: number;
  cost_tax_class_id: number;
  base_handling_cost: number;
  handling_cost_ex_tax: number;
  handling_cost_inc_tax: number;
  handling_cost_tax: number;
  handling_cost_tax_class_id: number;
  shipping_zone_id: number;
  shipping_zone_name: string;
  shipping_quotes: ShippingQuotes; // Define the type of shipping_quotes object if available
}

interface FormField {
  name: string;
  value: number | string | string[];
}

interface LineItem {
  url: string;
  resource: string;
  
}
interface ShippingQuotes {
    url: string;
    resource: string;
  }

interface DownloadConsignment {
  recipient_email: string;
  line_items: LineItem[];
}

interface EmailConsignment {
  gift_certificates: GiftCertificate[];
  line_items: LineItem[];
}

interface GiftCertificate {
  recipient_email: string;
}
