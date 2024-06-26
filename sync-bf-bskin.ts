import {
  BrandCreationParams,
  createBrand,
} from "./functions/brands/createBrand";
import { getAllBrands } from "./functions/brands/getAllBrands";
import { getBrandByName } from "./functions/brands/getBrandByName";
import { getAllProductImages } from "./functions/images/getAllProductImages";
import {
  CreateProductVariantOptionParams,
  ProductVariantOption,
} from "./functions/product-variant-options/ProductVariantOption";
import { createProductVariantOption } from "./functions/product-variant-options/createProductVariantOption";
import { getAllProductVariantOptions } from "./functions/product-variant-options/getAllProductVariantOptions";
import {
  CreateProductVariantParams,
  ProductVariant,
} from "./newclient/products/variants";
import { createProductVariant } from "./functions/product-variants/createProductVariant";
import { Product } from "./functions/products/Product";
import {
  createProduct,
  productCreationFields,
} from "./functions/products/createProduct";
import { getAllProductVariants } from "./functions/products/getAllProductVariants";
import { getProductById } from "./functions/products/getProductById";
import { getProductByName } from "./functions/products/getProductByName";
import { getProductVariants } from "./functions/products/getProductVariants";
import { getAllProducts } from "./functions/products/getAllProducts";

const src = "ih";
const destination: string = "hie";

(async function () {
  try {
    if (destination === "px") {
      require("./config/config").config(destination);
      const pxBrands = await getAllBrands();

      require("./config/config").config(src);
      const bfBrands = await getAllBrands();

      // identify brands on bf that are common to pixie
      const common = bfBrands.filter((b) =>
        pxBrands.find((p) => p.name == b.name)
      );

      // for each brand transfer the products
      for (let i = 0; i < common.length; i++) {
        try {
          await transfer(src, destination, common[i].id);
        } catch (err) {
          return console.log(err);
        }
      }
    } else {
      // if not pixie then supply 0 (or any number)
      await transfer(src, destination, 0);
    }
  } catch (err) {
    console.log(err);
  }
})();

async function transfer(src: string, destination: string, pxBrandID: number) {
  try {
    let srcFilter;
    let destinationDummyCategoryID;
    let destination_name;
    let src_name;

    if (src === "bf") {
      src_name = "beautyfeatures";
    }

    if (src == "ih") {
      src_name = "inhealth";
    }

    if (!src_name) {
      throw new Error("No config for that source store");
    }

    if (destination === "ah") {
      srcFilter = { "categories:in": 12 };
      destinationDummyCategoryID = 190;
      destination_name = "AllHair";
    }

    if (destination === "bsk") {
      destinationDummyCategoryID = 85;
      srcFilter = { brand_id: 18 };
      destination_name = "BeautySkincare";
    }

    if (destination === "px") {
      destinationDummyCategoryID = 445;
      srcFilter = { brand_id: pxBrandID };
      destination_name = "Pixieloves";
    }

    if (destination === "pb") {
      destinationDummyCategoryID = 165;
      srcFilter = { brand_id: 238 };
      destination_name = "PregnancyAndBaby";
    }

    if (destination === "bs") {
      destinationDummyCategoryID = 81;
      srcFilter = { brand_id: 438 };
      destination_name = "Babysafety";
    }

    if (destination === "hie") {
      destinationDummyCategoryID = 38;
      srcFilter = { brand_id: 176 };
      destination_name = "Haakaa Ireland";
    }

    if ((destination === "pb" || destination === "bs" || destination === "hie") && src !== "ih") {
      throw new Error("source for pb/bs/hie needs to be ih");
    }

    if (!destinationDummyCategoryID || !srcFilter || !destination_name) {
      throw new Error("dont have config for that store");
    }

    const match_src_name = new RegExp(src_name, "gi");

    // get all src skus
    require("./config/config").config(src);
    console.log(`Fetching all variants for ${src}`);
    const src_products = await getAllProducts(srcFilter);
    const src_vars: ProductVariant[] = [];
    for (const p of src_products) {
      const pvars = await getProductVariants(p.id);
      for (const v of pvars) {
        src_vars.push(v);
      }
    }
    console.log(`Fetching all brands for ${src}`);
    const src_brands = await getAllBrands();

    // get all destination skus
    require("./config/config").config(destination);
    console.log(`Fetching all variants for ${destination}`);
    const destination_vars = await getAllProductVariants();

    // these skus need to be transferred from src to destination
    const needTransfer: ProductVariant[] = [];

    const transferredSKUs: string[] = [];

    // for each src sku
    for (let i = 0; i < src_vars.length; i++) {
      const variant = src_vars[i];

      // find matching destination sku
      const matchingBskVar = destination_vars.find(function (bskvar) {
        return bskvar.sku === variant.sku;
      });

      // if match exists skip
      if (matchingBskVar) {
        continue;
      }

      // if no match, add to need transfer list
      needTransfer.push(variant);
    }

    // for each sku that needs to be transferred
    for (let i = 0; i < needTransfer.length; i++) {
      // needTransfer.length
      // update the one

      if (transferredSKUs.includes(needTransfer[i].sku)) {
        continue;
      }

      // get product from src store
      require("./config/config").config(src);
      console.log(`Fetching product from ${src}`);
      const product = await getProductById(needTransfer[i].product_id);

      // get all variants on the product
      console.log(`Fetching product variants from ${src}`);
      const variants = await getProductVariants(product.id);

      // get all images for the product
      console.log(`Fetching product images from ${src}`);
      const images = await getAllProductImages(product.id);
      // reformat image object to create image requirements
      const newImages = images.map(function (img) {
        const imgURL = `https://store-${
          process.env[`${src.toUpperCase()}_STORE_HASH`]
        }.mybigcommerce.com/product_images/${img.image_file}`;
        return {
          is_thumbnail: img.is_thumbnail,
          sort_order: img.sort_order,
          description: img.description,
          image_url: imgURL,
        };
      });

      // find the brand object for this product
      const brand = src_brands.find(function (brand) {
        return brand.id === product.brand_id;
      });

      // if there is no brand on the src product its prob discontinued, so skip
      if (!brand) {
        continue;
      }

      // need to check if there is a matching brand on destination site
      const brand_name = brand?.name;
      require("./config/config").config(destination);
      console.log(`Fetching brand from ${destination}`);
      const destBrand = await getBrandByName(brand_name);
      // create brand if none at destination
      if (!destBrand) {
        console.log(`brand "${brand.name}" does not exist at destination`);
        const brandCreationParams: BrandCreationParams = {
          name: brand.name,
          page_title: brand.page_title.replace(
            match_src_name,
            destination_name
          ),
          meta_keywords: brand.meta_keywords,
          meta_description: brand.meta_description.replace(
            match_src_name,
            destination_name
          ),
          search_keywords: brand.search_keywords,
          image_url: brand.image_url,
          custom_url: brand.custom_url,
        };
        require("./config/config").config(destination);
        console.log(`Creating brand on ${destination}`);
        await createBrand(brandCreationParams);
        console.log(`brand "${brand.name}" created`);
      }

      // make necessary updates to product content
      const updatedDescription = product.description.replace(
        match_src_name,
        destination_name
      );
      const updatedMetaDescription = product.meta_description.replace(
        match_src_name,
        destination_name
      );
      const updatedPageTitle = product.page_title.replace(
        match_src_name,
        destination_name
      );

      // create necessary product creation fields
      const productCreationFields: productCreationFields = {
        name: product.name,
        sku: product.sku,
        type: product.type,
        description: updatedDescription,
        weight: product.weight,
        price: product.price,
        cost_price: product.cost_price,
        retail_price: product.retail_price,
        sale_price: product.sale_price,
        // we need to add an identifying category here
        categories: [destinationDummyCategoryID],
        page_title: updatedPageTitle,
        meta_description: updatedMetaDescription,
        inventory_tracking: product.inventory_tracking,
        inventory_level: product.inventory_level,
        is_visible: false,
        sort_order: product.sort_order,
        images: newImages,
        brand_name: brand_name,
      };

      if (variants.length > 1) {
        require("./config/config").config(src);
        console.log(`Fetching product variants from ${src}`);
        const options = await getAllProductVariantOptions(product.id);

        require("./config/config").config(destination);

        /**
         * need to handle instances where skus exist as a variant on src
         * but the product already exists on dest without that sku
         */
        console.log(`Fetching product by name from ${destination}`);
        const existingProduct = await getProductByName(product.name);
        if (existingProduct) {
          productCreationFields.name =
            productCreationFields.name + " " + destination;
          continue;
        }

        let newProduct: Product;
        try {
          console.log(`Creating product on ${destination}`);
          newProduct = await createProduct(productCreationFields);
        } catch (err: any) {
          console.log(err.response ? err.response?.data || err.response : err);
          throw new Error("Failed to cretate new product");
        }

        if (!newProduct) {
          throw "faled to return new product from create product";
        }

        const optionsToCreate = options.map(function (option) {
          // cant supply IDs or bigcommerce will return an error
          for (const val of option.option_values) {
            delete val.id;
          }

          const optionCreationParams: CreateProductVariantOptionParams = {
            product_id: newProduct.id,
            display_name: option.display_name,
            type: option.type,
            config: option.config,
            option_values: option.option_values,
          };

          return optionCreationParams;
        });

        const newOptions: ProductVariantOption[] = [];

        // need to get option value id here
        for (const option of optionsToCreate) {
          console.log(`Creating product variants on ${destination}`);
          const newOption = await createProductVariantOption(
            newProduct.id,
            option
          );
          newOptions.push(newOption);
        }

        const newVariants = variants.map(function (variant) {
          const variantOptionValues = [];
          for (const ov of variant.option_values) {
            for (const no of newOptions) {
              for (const nov of no.option_values) {
                if (ov.label === nov.label) {
                  const a = {
                    id: nov.id,
                    label: ov.label,
                    option_id: no.id,
                    option_display_name: ov.option_display_name,
                  };
                  variantOptionValues.push(a);
                }
              }
            }
          }

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
            option_values: variantOptionValues as any,
          };
          return variantCreationparams;
        });

        for (const variant of newVariants) {
          console.log(`Creating product variants on ${destination}`);
          await createProductVariant(newProduct.id, variant);
          transferredSKUs.push(variant.sku);
        }
      } else if (product.sku !== "" && variants.length === 1) {
        try {
          require("./config/config").config(destination);
          console.log(`Creating product on ${destination}`);
          await createProduct(productCreationFields);
          transferredSKUs.push(product.sku);
        } catch (err: any) {
          if (err && err.response && err.response.status === 409) {
            productCreationFields.name +=
              " " + destination_name + " " + generateRandomString(6);
            try {
              console.log(`Creating product on ${destination}`);
              await createProduct(productCreationFields);
              transferredSKUs.push(product.sku);
              continue;
            } catch (err) {
              throw err;
            }
          }
          throw err;
        }
      } else {
        console.log("Warning: unhandled");
        console.log(
          `product has ${variants.length} variants and a sku ${product.sku}`
        );
      }
    }
  } catch (err: any) {
    throw err.response ? err.response?.data || err.response : err;
  }
}

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
}
