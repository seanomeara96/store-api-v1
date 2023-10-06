type OptionTypes =
  | "radio_buttons"
  | "rectangles"
  | "dropdown"
  | "product_list"
  | "product_list_with_images"
  | "swatch";

  export interface ProductVariantOption {
  id: number;
  product_id: number;
  display_name: string;
  type: OptionTypes;
  config: {
    default_value: string | boolean | null;
    checked_by_default?: boolean;
    checkbox_label?: string;
    date_limited?: boolean;
    date_limit_mode?: "earliest" | "range" | "latest";
    date_earliest_value?: string;
    date_latest_value?: string;
    file_types_mode?: "specific" | "all";
    file_types_supported?: string[];
    file_types_other?: string[];
    file_max_size?: number;
    text_characters_limited?: boolean;
    text_min_length?: number;
    text_max_length?: number;
    text_lines_limited?: boolean;
    text_max_lines?: number;
    number_limited?: boolean;
    number_limit_mode?: "lowest" | "highest" | "range";
    number_lowest_value?: number;
    number_highest_value?: number;
    number_integers_only?: boolean;
    product_list_adjusts_inventory?: boolean;
    product_list_adjusts_pricing?: boolean;
    product_list_shipping_calc?: "none" | "weight" | "package";
    sort_order: number;
  };
  option_values: {
    id: number | undefined;
    is_default?: boolean;
    label: string;
    sort_order: number;
    value_data?: {
      id?: number;
      name?: string;
      // Add additional properties based on the type of option or modifier with which the value is associated.
    } | null;
  }[];
}


export interface CreateProductVariantOptionParams {
    product_id: number;
    display_name: string;
    type: 'radio_buttons' | 'rectangles' | 'dropdown' | 'product_list' | 'product_list_with_images' | 'swatch';
    config: {
      default_value?: string | boolean | null;
      checked_by_default?: boolean;
      checkbox_label?: string;
      date_limited?: boolean;
      date_limit_mode?: 'earliest' | 'range' | 'latest';
      date_earliest_value?: string;
      date_latest_value?: string;
      file_types_mode?: 'specific' | 'all';
      file_types_supported?: string[];
      file_types_other?: string[];
      file_max_size?: number;
      text_characters_limited?: boolean;
      text_min_length?: number;
      text_max_length?: number;
      text_lines_limited?: boolean;
      text_max_lines?: number;
      number_limited?: boolean;
      number_limit_mode?: 'lowest' | 'highest' | 'range';
      number_lowest_value?: number;
      number_highest_value?: number;
      number_integers_only?: boolean;
      product_list_adjusts_inventory?: boolean;
      product_list_adjusts_pricing?: boolean;
      product_list_shipping_calc?: 'none' | 'weight' | 'package';
      sort_order: number;
    };
    option_values: {
      is_default?: boolean;
      label: string;
      sort_order: number;
      value_data?: {
        id?: number;
        image_url?: string;
        // Add additional properties based on the type of option or modifier with which the value is associated.
      } | null;
    }[];
  }
  