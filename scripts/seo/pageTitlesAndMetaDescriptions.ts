import { getAllBrands } from "../../functions/brands/getAllBrands";
import { getAllCategories } from "../../functions/categories/getAllCategories";
import { getAllPages } from "../../functions/pages/getAllPages";
import { output } from "../utils/output";
import path from "path"

function fmt(type: string) {
  return (p: any) => {
    try {
        return {
            id: p.id,
            type: type,
            name: p.name ?? p.title,
            page_title: p.page_title ?? p.meta_title,
            meta_description: p.meta_description,
            url: p.url ?? p.custom_url.url,
          }
    } catch (err){
        if(err instanceof TypeError) {
            throw new Error(`${err.message} at resource of type ${type}: ${JSON.stringify(p)}`)
        } else {
            throw err
        }
    }
  };
}

async function ptAndMD() {
  try {
    require("../..//config/config").config("ch")

    const seo = [
      ...(await getAllPages()).filter(p => p.is_visible).map(fmt("page")),
      ...(await getAllBrands()).map(fmt("brand")),
      ...(await getAllCategories()).filter(p => p.is_visible).map(fmt("category")),
    ];

    await output(path.resolve(__dirname, "SEO-Export.csv"), seo, true)
  } catch (err: any) {
    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err);
    }
  }
}

ptAndMD();
