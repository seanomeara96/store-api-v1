type productTypes = "physical" | "digital";
type inventoryTrackingOptions = "none" | "product" | "variant";
type availabilityOptions = "available" | "disabled" | "preorder";
type giftWrappingOptions = "any" | "none" | "list";
type openGraphTypes =
  | "product"
  | "album"
  | "book"
  | "drink"
  | "food"
  | "game"
  | "movie"
  | "song"
  | "tv_show";
type conditionOptions = "New" | "Used" | "Refurbished";
interface productCreationFields {
  name: string;
  type: productTypes;
  weight: number;
  price: number;
  sku?: string;
  description?: string;
  width?: number;
  depth?: number;
  height?: number;
  cost_price: number;
  retail_price?: number;
  sale_price?: number;
  map_price?: number;
  tax_class_id?: number;
  product_tax_code?: string;
  categories?: number[];
  brand_id?: number;
  inventory_level?: number;
  inventory_warning_level?: number;
  inventory_tracking?: inventoryTrackingOptions;
  fixed_cost_shipping_price?: number;
  is_free_shipping?: boolean;
  is_visible?: boolean;
  is_featured?: boolean;
  related_products?: number[];
  warranty?: string;
  bin_picking_number?: string;
  layout_file?: string;
  upc?: string;
  search_keywords?: string;
  availability?: availabilityOptions;
  availability_description?: string;
  gift_wrapping_options_type?: giftWrappingOptions;
  gift_wrapping_options_list?: number[];
  sort_order?: number;
  condition?: conditionOptions;
  is_condition_shown?: boolean;
  order_quantity_minimum?: number;
  order_quantity_maximum?: number;
  page_title: string;
  meta_keywords?: string[];
  meta_description: string;
  view_count?: number;
  preorder_release_date?: string;
  preorder_message?: string;
  is_preorder_only?: boolean;
  is_price_hidden?: boolean;
  price_hidden_label?: string;
  custom_url?: { url: string; is_customized: boolean };
  open_graph_type?: openGraphTypes;
  open_graph_title?: string;
  open_graph_description?: string;
  open_graph_use_meta_description?: boolean;
  open_graph_use_product_name?: boolean;
  open_graph_use_image?: boolean;
  brand_name?: string;
  gtin?: string;
  mpn?: string;
  reviews_rating_sum?:number;
  reviews_count?: number;
  total_sold?: number;
    // TODO keep adding fields
}
export const createProduct = (productCreationFields: productCreationFields) =>
  new Promise((resolve, reject) => {
    require("../../config/config")
      .store.post("/catalog/products", productCreationFields)
      .then((res: any) => resolve(res))
      .catch((err: any) => reject(err));
  });
