import { getAll } from "../utils/getAll";
/**
 * gats all pages
 */
export const getAllPromotions = getAll("/promotions") as (params?: GetAllPromotionsQueryParams) => Promise<Promotion[]>

export type RedemptionType = "AUTOMATIC" | "COUPON";
export type PromotionStatus = "ENABLED" | "DISABLED" | "INVALID";
export type NotificationType = "UPSELL" | "ELIGIBLE" | "APPLIED";
export type CreatedFrom = "react_ui" | "legacy_ui" | "api";
export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Channel {
  id: number;
}

export interface CustomerSegments {
  id: string[];
}

export interface Customer {
  group_ids?: number[];
  minimum_order_count?: number;
  excluded_group_ids?: number[];
  segments: CustomerSegments;
}

export interface RuleActionCartValue {
  discount: {
    fixed_amount?: string;
    percentage?: string;
  };
}

export interface RuleConditionCart {
  items?: {
    brands?: number[];
    categories?: number[];
    products?: number[];
  };
  minimum_spend?: string;
  minimum_quantity?: number;
}

export interface Rule {
  action: {
    cart_value?: RuleActionCartValue;
    cart_items?: object;
    fixed_price_set?: object;
    shipping?: object;
  };
  apply_once: boolean;
  stop: boolean;
  condition?: {
    cart?: RuleConditionCart;
    and?: object;
  };
}

export interface Notification {
  content: string;
  type: NotificationType;
  locations: string[]; // e.g. ["HOME_PAGE", "CART_PAGE"]
}

export interface CountryRule {
  iso2_country_code: string; // e.g. "US"
}

export interface ShippingAddress {
  countries: CountryRule[];
}

export interface Schedule {
  week_frequency: number; // >=1
  week_days: WeekDay[];
  daily_start_time: string; // "HH:MM:SS"
  daily_end_time: string;   // "HH:MM:SS"
}

export interface Promotion {
  id: number;
  redemption_type: RedemptionType;
  name: string;
  display_name?: string;
  created_from: CreatedFrom;

  channels: Channel[];
  customer: Customer;

  rules: Rule[];

  current_uses: number;
  max_uses?: number;
  status: PromotionStatus;

  start_date: string; // ISO date string
  end_date?: string;

  stop: boolean;
  can_be_used_with_other_promotions: boolean;
  currency_code: string | "*";

  notifications: Notification[];

  shipping_address?: ShippingAddress;
  schedule?: Schedule;
}

export type PromotionRedemptionTypeQuery = "automatic" | "coupon";
export type PromotionStatusQuery = "ENABLED" | "DISABLED" | "INVALID";
export type PromotionSortField = "id" | "name" | "priority" | "start_date";
export type SortDirection = "asc" | "desc";

export interface GetAllPromotionsQueryParams {
  id?: number;                     // Filter by promotion ID
  name?: string;                   // Filter by internal name
  code?: string;                   // Filter by code
  currency_code?: string;          // Filter by currency
  redemption_type?: PromotionRedemptionTypeQuery; // automatic | coupon
  status?: PromotionStatusQuery;   // ENABLED | DISABLED | INVALID

  page?: number;                   // Pagination: page number
  limit?: number;                  // Pagination: items per page (default 50)

  sort?: PromotionSortField;       // Sort field (default: id)
  direction?: SortDirection;       // Sort direction (default: asc)

  channels?: number[];             // Filter by channel IDs
  query?: string;                  // Search by name or code
}
