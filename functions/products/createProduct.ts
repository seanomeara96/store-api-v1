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
  reviews_rating_sum?: number;
  reviews_count?: number;
  total_sold?: number;
  custom_fields?: {
    id: number;
    name: string;
    value: string;
  }[];
  bulk_pricing_rules?: {
    id: number;
    quantity_min: number;
    quantity_max: number;
    type: "price" | "percent" | "fixed";
    amount: number;
  }[];
  images?: {
    image_file: string; // the local path to the original image file uploaded to BigCommerce
    is_thumbnail: boolean; // flag for identifying whether the image is used as the product's thumbnail
    sort_order: number; // the order in which the image will be displayed on the product page
    description?: string; // optional description for the image
    image_url?: string; // a fully qualified URL path, including protocol, to the image
    id: number; // the unique numeric ID of the image; increments sequentially
    product_id: number; // the unique numeric identifier for the product with which the image is associated
    url_zoom?: string; // the zoom URL for this image
    url_standard?: string; // the standard URL for this image
    url_thumbnail?: string; // the thumbnail URL for this image
    url_tiny?: string; // the tiny URL for this image
    date_modified?: string; // the date on which the product image was modified
  }[];
  videos: {
    title: string;
    description: string;
    sort_order: number;
    type: "youtube";
    video_id: string;
    id: number;
    product_id: number;
    length: string;
  }[];
}
export function createProduct(productCreationFields: productCreationFields) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.post(
        "/catalog/products",
        productCreationFields
      );

      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}
