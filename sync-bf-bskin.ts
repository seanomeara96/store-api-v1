import { getAllBrands } from "./functions/brands/getAllBrands";
import { getAllProductImages } from "./functions/images/getAllProductImages";
import { CreateProductVariantOptionParams } from "./functions/product-variant-options/ProductVariantOption";
import { createProductVariantOption } from "./functions/product-variant-options/createProductVariantOption";
import { getAllProductVariantOptions } from "./functions/product-variant-options/getAllProductVariantOptions";
import { CreateProductVariantParams } from "./functions/product-variants/ProductVariant";
import { createProductVariant } from "./functions/product-variants/createProductVariant";
import {
  createProduct,
  productCreationFields,
} from "./functions/products/createProduct";
import { getAllProductVariants } from "./functions/products/getAllProductVariants";
import { getProductById } from "./functions/products/getProductById";
import { getProductVariants } from "./functions/products/getProductVariants";

async function main() {
  // { brand_id: 18 }
  // 85
  // ah const srcFilter = { "categories:in": 12 };
  // ah const destinationDummyCategoryID = 190;

  const srcFilter = { brand_id: 18 }; // bsk
  const destinationDummyCategoryID = 85; // bsk
  const src = "bf";
  const destination = "bsk";
  const destination_name = "BeautySkincare";
  const src_name = "beautyfeatures";

  const match_src_name = new RegExp(src_name, "gi");

  require("./config/config").config(src);
  const src_vars = await getAllProductVariants(srcFilter);
  const src_brands = await getAllBrands();

  require("./config/config").config(destination);
  const destination_vars = await getAllProductVariants();

  const needTransfer = [];

  for (let i = 0; i < src_vars.length; i++) {
    const variant = src_vars[i];

    const matchingBskVar = destination_vars.find(function (bskvar) {
      return bskvar.sku === variant.sku;
    });

    if (matchingBskVar) {
      continue;
    }

    needTransfer.push(variant);
  }

  let no_brand_count = 0;
  for (let i = 0; i < needTransfer.length; i++) {
    // needTransfer.length
    // update the one
    require("./config/config").config(src);
    const product = await getProductById(needTransfer[i].product_id);

    const variants = await getProductVariants(product.id);

    const images = await getAllProductImages(product.id);
    const newImages = images.map(function (img) {
      return {
        is_thumbnail: img.is_thumbnail,
        sort_order: img.sort_order,
        description: img.description,
        image_url: `https://store-${process.env.BF_STORE_HASH}.mybigcommerce.com/product_images/${img.image_file}`,
      };
    });

    const brand = src_brands.find(function (brand) {
      return brand.id === product.brand_id;
    });

    if (!brand) {
      no_brand_count++;
      continue;
    }

    const brand_name = brand.name;

    const productCreationFields: productCreationFields = {
      name: product.name,
      sku: product.sku,
      type: product.type,
      description: product.description.replace(match_src_name, destination_name),
      weight: product.weight,
      price: product.price,
      cost_price: product.cost_price,
      retail_price: product.retail_price,
      sale_price: product.sale_price,
      categories: [destinationDummyCategoryID],
      page_title: product.page_title.replace(match_src_name, destination_name),
      meta_description: product.meta_description.replace(
        match_src_name,
        destination_name
      ),
      inventory_tracking: product.inventory_tracking,
      inventory_level: product.inventory_level,
      is_visible: false,
      sort_order: product.sort_order,
      images: newImages,
      brand_name: brand_name,
    };

    if (variants.length > 1) {
      continue;
      const options = await getAllProductVariantOptions(product.id);

      require("./config/config").config(destination);
      const newProduct = await createProduct(productCreationFields);

      const newOptions = options.map(function (option) {
        const optionCreationParams: CreateProductVariantOptionParams = {
          product_id: newProduct.id,
          display_name: option.display_name,
          type: option.type,
          config: option.config,
          option_values: option.option_values,
        };
        return optionCreationParams;
      });

      const newOption = await createProductVariantOption(
        newProduct.id,
        newOptions[0]
      );

      const newVariants = variants.map(function (variant) {
        const variantCreationparams: CreateProductVariantParams = {
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
          option_values: variant.option_values,
        };
        return variantCreationparams;
      });

      for (const variant of newVariants) {
        await createProductVariant(newProduct.id, variant);
      }
    }

    if (product.sku !== "") {
      require("./config/config").config(destination);
      try {
        await createProduct(productCreationFields);
      } catch (err: any) {
        if (err && err.response && err.response.status === 409) {
          productCreationFields.name += (" " + destination_name);
          try {
            await createProduct(productCreationFields);
            continue;
          } catch (err) {
            throw err;
          }
        }
        console.log(err.response ? err.response : err);
        break;
      }
    }
  }
  console.log(`no brand count ${no_brand_count}`)
  console.log(`needed transfer ${needTransfer.length}`)
}

main();
