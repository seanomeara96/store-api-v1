import { NewImageParams } from "../products/createProduct";
import { createProductImage } from "./createProductImage";
import { deleteProductImage } from "./deleteProductImage";
import { getAllProductImages } from "./getAllProductImages";
import { ProductImage } from "./getProductImage";
export async function alignImages(
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