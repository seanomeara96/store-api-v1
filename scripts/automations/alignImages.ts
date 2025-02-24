import { createProductImage } from "../../functions/images/createProductImage";
import { deleteProductImage } from "../../functions/images/deleteProductImage";
import {
  getAllProductImages,
  ProductImage,
} from "../../functions/images/getAllProductImages";
import { NewImageParams } from "../../functions/products/createProduct";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";

async function main() {
  try {
    const src = "ch";
    const dest = "ha";
    const skus = [
      { sku: "1040", name: "Wedgwood Butter Dish 7cm (Pack Size 1)" },
      { sku: "1025", name: "Wedgwood Dinner Plate 27cm (Pack Size 10)" },
      { sku: "1026", name: "Wedgwood Dinner Plate 31cm (Pack size 10)" },
      { sku: "1020", name: "Wedgwood Espresso Cup 8cl (Pack Size 10)" },
      { sku: "1021", name: "Wedgwood Espresso Cup Saucer 12cm (Pack Size 10)" },
      {
        sku: "JASP2",
        name: "Wedgwood Jasper Conran Dinner Plate  27cm (Pack Size 10)",
      },
      {
        sku: "JASP1",
        name: "Wedgwood Jasper Conran Dinner Plate 33cm (Pack Size 10)",
      },
      {
        sku: "JASP3",
        name: "Wedgwood Jasper Conran Side Plate 18cm (Pack Size 10)",
      },
      { sku: "1039", name: "Wedgwood Milk Jug 27cl (Pack Size 1)" },
      { sku: "1027L", name: "Wedgwood Pasta Plate 28cm (Pack Size 10)" },
      { sku: "1030", name: "Wedgwood Salt & Pepper Set 5cm (Pack Size 1)" },
      { sku: "1029", name: "Wedgwood Sauce Boat 36cl (Pack size 1)" },
      { sku: "1024", name: "Wedgwood Side Plate 15cm (Pack Size 10)" },
      { sku: "1027", name: "Wedgwood Soup Plate 23cm (Pack size 10)" },
      {
        sku: "W011",
        name: "Wedgwood Starter/Dessert Plate 22cm (Pack Size 10)",
      },
      { sku: "1038", name: "Wedgwood Sugar Bowl 10cm (Pack Size 1)" },
      { sku: "1022", name: "Wedgwood Tea Cup 20cl (Pack Size 10)" },
      { sku: "1023", name: "Wedgwood Tea Cup Saucer 14cm (Pack size 10)" },
    ];
    for (let i = 13; i < skus.length; i++) {
      console.log(i, skus.length);
      const { sku } = skus[i];
      let [srcProductID, destProductID] = [0, 0];
      try {
        [srcProductID, destProductID] = await getProductIds(sku, src, dest);
      } catch (err) {
        console.log(err);
        continue;
      }
      if (!srcProductID || !destProductID) {
        throw new Error("Expected an id for both src and dest product");
      }
      await alignImages(src, dest, srcProductID, destProductID);
    }
  } catch (err) {
    console.log(err);
  }
}
main();

async function getProductIdForSKU(sku: string) {
  try {
    const vars = await getAllProductVariants({ sku: sku });
    if (!vars.length) {
      throw new Error(`Expected sku ${sku} to return variants`);
    }

    return vars[0].product_id;
  } catch (err) {
    throw err;
  }
}

async function getProductIds(sku: string, src: string, dest: string) {
  require("../../config/config").config(src);
  const srcProductID = await getProductIdForSKU(sku);

  require("../../config/config").config(dest);
  const destProductID = await getProductIdForSKU(sku);

  return [srcProductID, destProductID];
}

async function alignImages(
  src: string,
  dest: string,
  srcProductID: number,
  destProductID: number
) {
  try {
    require("../../config/config").config(src);
    const srcProductImages = await getAllProductImages(srcProductID);

    require("../../config/config").config(dest);
    const destProductImages = await getAllProductImages(destProductID);
    for (let i = 0; i < destProductImages.length; i++) {
      await deleteProductImage(destProductID, destProductImages[i].id);
    }

    for (let i = 0; i < srcProductImages.length; i++) {
      await createProductImage(
        destProductID,
        convertToNewImageParams(srcProductImages[i])
      );
    }
  } catch (err) {
    throw err;
  }
}

function convertToNewImageParams(image: ProductImage): NewImageParams {
  return {
    image_file: image.image_file,
    is_thumbnail: image.is_thumbnail,
    sort_order: image.sort_order,
    description: image.description || undefined, // Make optional
    image_url: image.url_zoom, // Set explicitly if needed
    product_id: image.product_id,
    url_zoom: image.url_zoom,
    url_standard: image.url_standard,
    url_thumbnail: image.url_thumbnail,
    url_tiny: image.url_tiny,
    date_modified: image.date_modified || undefined, // Make optional
  };
}
