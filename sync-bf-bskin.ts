import { getAllProductImages } from "./functions/images/getAllProductImages";
import { CreateProductVariantOptionParams } from "./functions/product-variant-options/ProductVariantOption";
import { createProductVariantOption } from "./functions/product-variant-options/createProductVariantOption";
import { getAllProductVariantOptions } from "./functions/product-variant-options/getAllProductVariantOptions";
import { CreateProductVariantParams } from "./functions/product-variants/ProductVariant";
import {
  createProduct,
  productCreationFields,
} from "./functions/products/createProduct";
import { getAllProductVariants } from "./functions/products/getAllProductVariants";
import { getProductById } from "./functions/products/getProductById";
import { getProductVariants } from "./functions/products/getProductVariants";

async function main() {
  require("./config/config").config("bf");
  const beautyfeatures_vars = await getAllProductVariants({ brand_id: 18 });
  console.log("beautyfeatures_vars.length", beautyfeatures_vars.length);

  require("./config/config").config("bsk");
  const beautyskincare_vars = await getAllProductVariants();
  console.log("beautyskincare_vars.length", beautyskincare_vars.length);

  const needTransfer = [];

  for (let i = 0; i < beautyfeatures_vars.length; i++) {
    const variant = beautyfeatures_vars[i];

    const matchingBskVar = beautyskincare_vars.find(
      (bskvar) => bskvar.sku === variant.sku
    );
    if (matchingBskVar) {
      continue;
    }

    needTransfer.push(variant);
  }

  for (let i = 0; i < 1; i++) {
    // needTransfer.length
    // update the one
    require("./config/config").config("bf");
    const product = await getProductById(needTransfer[i].product_id);
    
    const variants  = await getProductVariants(product.id);

    const images = await getAllProductImages(product.id);
    const newImages = images.map((img) => ({
      is_thumbnail: img.is_thumbnail,
      sort_order: img.sort_order,
      description: img.description,
      image_url: img.url_standard,
      url_zoom: img.url_zoom,
      url_standard: img.url_standard,
      url_thumbnail: img.url_thumbnail,
      url_tiny: img.url_tiny,
      date_modified: img.date_modified,
    }));

    const productCreationFields: productCreationFields = {
      name: product.name,
      sku: product.sku,
      type: product.type,
      weight: product.weight,
      price: product.price,
      cost_price: product.cost_price,
      retail_price: product.retail_price,
      sale_price: product.sale_price,
      categories: [85],
      page_title: product.page_title,
      meta_description: product.meta_description,
      inventory_tracking: product.inventory_tracking,
      inventory_level: product.inventory_level,
      is_visible: false,
      sort_order: product.sort_order,
      images: newImages,
    };

    if (variants.length > 1) {
      const options = await getAllProductVariantOptions(product.id)
      
      require("./config/config").config("bsk");
      const newProduct = await createProduct(productCreationFields)

      const newOptions = options.map(function(option){
        const optionCreationParams: CreateProductVariantOptionParams = {
          product_id: newProduct.id,
          display_name: option.display_name,
          type: option.type,
          config: option.config,
          option_values: option.option_values,
        }
        return optionCreationParams;
      })

      const newOption = newOptions[0]

      const newVariants = variants.map(function(variant){
        const variantCreationparams:CreateProductVariantParams = {
          product_id: newProduct.id,
          sku: variant.sku,
          cost_price: variant.cost_price,
          price: variant.price,
          sale_price: variant.sale_price,
          retail_price: variant.retail_price,
          weight: variant.weight,
          width: variant.width,
          height: variant.height,
          depth: variant.depth,
          is_free_shipping: variant.is_free_shipping,
          fixed_cost_shipping_price: variant.fixed_cost_shipping_price,
          purchasing_disabled: variant.purchasing_disabled,
          purchasing_disabled_message: variant.purchasing_disabled_message,
          upc: variant.upc,
          inventory_level: variant.inventory_level,
          inventory_warning_level: variant.inventory_warning_level,
          bin_picking_number: variant.bin_picking_number,
          image_url: variant.image_url,
          gtin: variant.gtin,
          mpn: variant.mpn,
          option_values: variant.option_values.map(op => ({...op, option_id: newOption.id}))
        }
        return variantCreationparams
      })

      for (const variant of newVariants){
        await createProductVariant(newProduct.id, variant)
      }
    }

    if (product.sku !== "") {
      require("./config/config").config("bsk");
      try {
        await createProduct(productCreationFields);
      } catch (err: any) {
        console.log(err.response ? err.response : err);
        break;
      }
    }
  }
}

main();
