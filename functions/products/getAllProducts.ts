import { Product } from "../products/Product";
import { getAll } from "../utils/getAll";

export type GetAllProductsParams = {
  id?: number;
  'id:in'?: number[];
  'id:not_in'?: number[];
  'id:min'?: number;
  'id:max'?: number;
  'id:greater'?: number;
  'id:less'?: number;

  'channel_id:in'?: number[];

  include?: (
    | 'bulk_pricing_rules'
    | 'reviews'
    | 'modifiers'
    | 'options'
    | 'parent_relations'
    | 'custom_fields'
    | 'channels'
    | 'videos'
  )[];

  include_fields?: string[];
  exclude_fields?: string[];

  page?: number;
  limit?: number;
  direction?: 'asc' | 'desc';
  sort?:
    | 'id'
    | 'name'
    | 'sku'
    | 'price'
    | 'date_modified'
    | 'date_last_imported'
    | 'inventory_level'
    | 'is_visible'
    | 'total_sold'
    | 'calculated_price';

  name?: string;
  mpn?: string;
  upc?: string;
  sku?: string;
  'sku:in'?: string;

  brand_id?: number;

  price?: number;
  weight?: number;

  condition?: 'new' | 'used' | 'refurbished';
  is_visible?: boolean;
  is_featured?: 0 | 1;
  is_free_shipping?: 0 | 1;

  inventory_level?: number;
  'inventory_level:in'?: number[];
  'inventory_level:not_in'?: number[];
  'inventory_level:min'?: number;
  'inventory_level:max'?: number;
  'inventory_level:greater'?: number;
  'inventory_level:less'?: number;

  inventory_low?: 0 | 1;
  out_of_stock?: 0 | 1;
  total_sold?: number;

  type?: 'digital' | 'physical';

  categories?: number;
  'categories:in'?: string;

  keyword?: string;
  keyword_context?: 'shopper' | 'merchant';

  availability?: 'available' | 'disabled' | 'preorder';

  date_modified?: string;
  'date_modified:min'?: string;
  'date_modified:max'?: string;

  date_last_imported?: string;
  'date_last_imported:not'?: string;
  'date_last_imported:min'?: string;
  'date_last_imported:max'?: string;
};

/**
 * Fetches all products, 250 at a time recursively
 * @param {*} params
 * @returns resolves with an array of product objects
 */
export const getAllProducts = getAll(`/catalog/products`) as (
  params?: GetAllProductsParams
) => Promise<Product[]>;
