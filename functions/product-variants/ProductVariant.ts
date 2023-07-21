export interface ProductVariant {
    id: number;
    product_id: number;
    sku: string;
    sku_id: string | null;
    price: number;
    calculated_price: number;
    sale_price: number;
    retail_price: number;
    map_price: number;
    weight: number;
    width: number;
    height: number;
    depth: number;
    is_free_shipping: boolean;
    fixed_cost_shipping_price: number;
    calculated_weight: number;
    purchasing_disabled: boolean;
    purchasing_disabled_message: string;
    image_url: string;
    cost_price: number;
    upc: string;
    mpn: string;
    gtin: string;
    inventory_level: number;
    inventory_warning_level: number;
    bin_picking_number: string;
    option_values: OptionValue[];
  }

  interface OptionValue {
    option_display_name: string;
    label: string;
    id: number;
    option_id: number;
  }
  
  export interface CreateProductVariantParams {
    cost_price?: number;
    price?: number;
    sale_price?: number;
    retail_price?: number;
    weight?: number;
    width?: number;
    height?: number;
    depth?: number;
    is_free_shipping?: boolean;
    fixed_cost_shipping_price?: number;
    purchasing_disabled?: boolean;
    purchasing_disabled_message?: string;
    upc?: string;
    inventory_level?: number;
    inventory_warning_level?: number;
    bin_picking_number?: string;
    image_url?: string;
    gtin?: string;
    mpn?: string;
    product_id: number;
    sku: string;
    option_values?: {
      option_display_name: string;
      label: string;
      id: number;
      option_id: number;
    }[];
  }
  