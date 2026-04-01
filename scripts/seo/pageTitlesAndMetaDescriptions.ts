import { getAllBrands } from "../../functions/brands/getAllBrands";
import { getAllCategories } from "../../functions/categories/getAllCategories";
import { getAllPages } from "../../functions/pages/getAllPages";
import { output } from "../utils/output";
import path from "path";

function createSeoRowMapper(type: string) {
  return function (p: any) {
    try {
      return {
        id: p.id,
        type,
        name: p.name ?? p.title,
        page_title: p.page_title ?? p.meta_title,
        meta_description: p.meta_description,
        url: p.url ?? p.custom_url.url,
      };
    } catch (err) {
      if (err instanceof TypeError) {
        throw new Error(
          `${err.message} at resource of type ${type}: ${JSON.stringify(p)}`,
        );
      }
      throw err;
    }
  };
}

async function exportSeoToCsv() {
  try {
    require("../..//config/config").config("ch");

    const pages = await getAllPages();
    const categories = await getAllCategories();
    const brands = await getAllBrands();

    const isVisible = (p: any) => p.is_visible;

    const seo = [
      ...pages.filter(isVisible).map(createSeoRowMapper("page")),
      ...brands.map(createSeoRowMapper("brand")),
      ...categories.filter(isVisible).map(createSeoRowMapper("category")),
    ];

    await output(path.resolve(__dirname, "SEO-Export.csv"), seo, true);
  } catch (err: any) {
    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err);
    }
  }
}

exportSeoToCsv();
