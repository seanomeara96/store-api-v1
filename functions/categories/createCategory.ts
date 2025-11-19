export interface CategoryCreationParams {
  parent_id: number;
  name: string;
  description?: string;
  views?: number;
  sort_order?: number;
  page_title?: string;
  search_keywords?: string;
  meta_keywords?: string[];
  meta_description?: string;
  layout_file?: string;
  is_visible?: boolean;
  default_product_sort?: string;
  image_url?: string;
  custom_url?: {
    url: string;
    is_customized: boolean;
  };
}

export interface Category {
  id: number;
  parent_id: number;
  name: string;
  description: string;
  views: number;
  sort_order: number;
  page_title: string;
  search_keywords: string;
  meta_keywords: string[];
  meta_description: string;
  layout_file: string;
  is_visible: boolean;
  default_product_sort:
    | "use_store_settings"
    | "featured"
    | "newest"
    | "best_selling"
    | "alpha_asc"
    | "alpha_desc"
    | "avg_customer_review"
    | "price_asc"
    | "price_desc";
  image_url: string;
  custom_url: {
    url: string;
    is_customized: boolean;
  };
}

export async function createCategory(
  categoryToCreate: CategoryCreationParams,
): Promise<Category> {
  const config = await import("../../config/config");
  try {
    const response = await config.store.post(
      `/catalog/categories`,
      categoryToCreate,
    );
    return response.data.data;
  } catch (error) {
    return Promise.reject(
      new Error(`Failed to create category: ${error.message}`),
    );
  }
}
