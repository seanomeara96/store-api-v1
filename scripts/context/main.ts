import { htmlToText } from "html-to-text";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getAllProductImages } from "../../functions/images/getAllProductImages";
import { getAllCategories } from "../../functions/categories/getAllCategories";
import fs from "fs";
import path from "path";
async function newsletterContextGeneration() {
  require("../../config/config").config("bf");
  const baseURL = `https://www.beautyfeatures.ie`;
  const categoryURL = `https://www.beautyfeatures.ie/affordable-beauty/`;

  const categories = await getAllCategories();
  let category = categories.find(
    (c) =>
      c.custom_url && c.custom_url.url === categoryURL.replace(baseURL, ""),
  );
  if (!category) {
    console.log("no cat found");
    return;
  }
  const products = (
    await getAllProducts({
      "categories:in": [category.id].join(","),
    })
  )
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 15);

  const context: {
    task: string;
    categoryURL: string;
    availableProducts: {
      name: string;
      url: string;
      retail_price: number;
      sale_price: number;
      description: string;
      images: string[];
    }[];
  } = {
    task: "Generate a high-converting marketing newsletter for BeautyFeatures.ie (an Irish online retailer of hair and beauty products) in email-client-safe, responsive HTML (tables + inline CSS). Use ONLY the provided availableProducts data for ALL product links and images. For every product featured: set <a href> EXACTLY to the product's provided url (no rewriting, no tracking params, no shorteners, no relative URLs), and set <img src> EXACTLY to one of the product's provided images URLs (no placeholders, no generated URLs, no different domains). Do not invent, guess, or modify any href/src values. If a product has no valid image URL, omit the image for that product (do not substitute). Keep the tone warm, friendly, and suitable for an Irish audience, with concise, scannable copy. Include prices (show retail vs sale where applicable), properly sized images, and ensure compatibility with major clients (Gmail/Outlook/Apple Mail).",
    categoryURL: categoryURL,
    availableProducts: [],
  };

  for (const product of products) {
    if (!product.is_visible || product.inventory_level === 0) continue;

    let sale_price = product.price;
    if (product.sale_price > 0) {
      sale_price = product.sale_price;
    }

    const images = (await getAllProductImages(product.id))
      .filter((img) => img.is_thumbnail)
      .map((img) => img.url_standard);

    context.availableProducts.push({
      name: product.name,
      description: htmlToText(product.description),
      url: `https://www.beautyfeatures.ie` + product.custom_url.url,
      retail_price: product.price,
      sale_price: sale_price,
      images: images,
    });
  }

  fs.writeFileSync(
    path.resolve(__dirname, "context.json"),
    JSON.stringify(context),
  );
}

newsletterContextGeneration();
