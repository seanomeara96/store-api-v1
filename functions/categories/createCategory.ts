export interface Category {
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

export function createCategory(categoryToCreate: Category) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.post(
        `/catalog/categories`,
        categoryToCreate
      );
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}
