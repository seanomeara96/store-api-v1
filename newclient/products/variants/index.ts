import { AxiosInstance } from "axios";
import { ProductVariantOptions } from "../../../functions/product-variant-options/ProductVariantOptions";

export class ProductVariants {
  private client: AxiosInstance;
  options: ProductVariantOptions;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.options = new ProductVariantOptions(this.client);
  }

  async create(product_id: number, params: CreateProductVariantParams) {
    try {
      const path = `/catalog/products/${product_id}/variants`;
      const res = await this.client.post(path, params);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async update(product_id: number, variant_id: number, updateParams: any) {
    try {
      const path = `/catalog/products/${product_id}/variants/${variant_id}`;
      const res = await this.client.put(path, updateParams);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }
}

export interface ProductVariant {
  id: number;
  product_id: number;
  sku: string;
  sku_id: string | null;
  price: number | null;
  calculated_price: number;
  sale_price: number | null;
  retail_price: number | null;
  map_price: number | null;
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
  sale_price?: number | null;
  retail_price?: number | null;
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
