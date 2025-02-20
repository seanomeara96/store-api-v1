import { getAllBrands } from "../../functions/brands/getAllBrands";
import { getAllCategories } from "../../functions/categories/getAllCategories";
import { getAllPages } from "../../functions/pages/getAllPages";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { output } from "../utils/output";
import path from "path";

function checkSEOContent(type: "title" | "description", text: string) {
  const limits = {
    title: { min: 50, max: 60 },
    description: { min: 150, max: 160 },
  };

  const length = text?.length || 0;
  const { min, max } = limits[type];

  return {
    text,
    length,
    optimal: length >= min && length <= max,
    minExceeded: length < min,
    maxExceeded: length > max,
  };
}

async function main() {
  try {
    let stores = ["ch", "ha"];
    for (let i = 0; i < stores.length; i++) {
      const store = stores[i];
      require("./config/config").config(store);
      let outputData: {
        type: "product" | "brand" | "category" | "page";
        id: number;
        page_title: string;
        page_title_length: number;
        page_title_optimal: string;
        meta_description: string;
        meta_description_length: number;
        meta_description_optimal: string;
      }[] = [];
      {
        const products = await getAllProducts();
        for (const product of products) {
          const pageTitleOptimal = checkSEOContent(
            "title",
            product.page_title
          ).optimal;
          const metaDescriptionOptimal = checkSEOContent(
            "description",
            product.meta_description
          ).optimal;
          if (
            product.is_visible &&
            (!pageTitleOptimal || !metaDescriptionOptimal)
          ) {
            outputData.push({
              type: "product",
              id: product.id,
              page_title: product.page_title,
              page_title_length: product.page_title.length,
              page_title_optimal: String(pageTitleOptimal),
              meta_description: product.meta_description,
              meta_description_length: product.meta_description.length,
              meta_description_optimal: String(metaDescriptionOptimal)
            });
          }
        }
      }
      {
        const brands = await getAllBrands();
        for (const brand of brands) {
          if (
            !checkSEOContent("title", brand.page_title).optimal ||
            !checkSEOContent("description", brand.meta_description).optimal
          ) {

            outputData.push({
              type: "brand",
              id: brand.id,
              page_title: brand.page_title,
              page_title_length: brand.page_title.length,
              page_title_optimal: String(checkSEOContent("title", brand.page_title).optimal),
              meta_description: brand.meta_description,
              meta_description_length: brand.meta_description?.length || 0,
              meta_description_optimal: String(checkSEOContent("description", brand.meta_description).optimal)
            });
          }
        }
      }
      
      {
        const categories = await getAllCategories();
        for (const category of categories) {
          if (
            category.is_visible &&
            (!checkSEOContent("title", category.page_title).optimal ||
              !checkSEOContent("description", category.meta_description).optimal)
          ) {
            outputData.push({
              type: "category",
              id: category.id,
              page_title: category.page_title,
              page_title_length: category.page_title.length,
              page_title_optimal: String( checkSEOContent("title", category.page_title).optimal),
              meta_description: category.meta_description,
              meta_description_length: category.meta_description.length,
              meta_description_optimal: String(checkSEOContent("description", category.meta_description).optimal)
            });
          }
        }
      }
      
      {
        const pages = await getAllPages();
        for (const page of pages) {
          if (
            page.meta_title &&
            page.is_visible &&
            (!checkSEOContent("title", page.meta_title).optimal ||
              !checkSEOContent("description", page.meta_description).optimal)
          ) {
            outputData.push({
              type: "page",
              id: page.id,
              page_title: page.meta_title,
              page_title_length: page.meta_title.length,
              page_title_optimal: String(checkSEOContent("title", page.meta_title).optimal),
              meta_description: page.meta_description,
              meta_description_length: page.meta_description.length,
              meta_description_optimal: String(checkSEOContent("description", page.meta_description).optimal)
            });
          }
        }
      }
      

      await output(
        path.resolve(__dirname, `${store}-seo-audit.csv`),
        outputData,
        true
      );
    }
  } catch (err) {
    console.log("Error:", err);
  }
}

main();
