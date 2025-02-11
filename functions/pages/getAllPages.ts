import { getAll } from "../utils/getAll";
/**
 * gats all pages
 */
export const getAllPages = getAll("/content/pages") as (params?: {}) => Promise<Page[]>

export interface Page {
    id: number;
    name: string;
    is_visible: boolean;
    parent_id: number;
    sort_order: number;
    type: string;
    is_homepage: boolean;
    is_customers_only: boolean;
    url: string;
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
    search_keywords: string;
  }