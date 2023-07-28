import { createProductImage } from "./functions/images/createProductImage";
import { deleteProductImage } from "./functions/images/deleteProductImage";
import { getAllProductImages } from "./functions/images/getAllProductImages";
import { getAllProducts } from "./functions/products/getAllProducts";
import { getProductIdFromSku } from "./functions/products/getProductIdFromSku";

async function main() {
  try {
    require("./config/config").config("ah");
    const products = await getAllProducts({ is_visible: false });
    // for (let i = 0; i < products.length; i++) {
    //   console.log(`fixing product ${i + 1} of ${products.length}`);
    //   const product = products[i];
    //   console.log(`getting images for ${product.name}`);
    //   const images = await getAllProductImages(product.id);
    //   for (const image of images) {
    //     await deleteProductImage(product.id, image.id);
    //     console.log(`deleted image`);
    //   }
    // }

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`product sku ${product.sku}`)
      if (product.sku === "") {
        continue;
      }

      require("./config/config").config("bf");
      const matchingProductId = await getProductIdFromSku(product.sku);
      if (!matchingProductId) {
        continue;
      }
      console.log(matchingProductId)
      const images = await getAllProductImages(matchingProductId);
      const newImages = images.map(function (img) {
        let url = `https://store-${process.env.BF_STORE_HASH}.mybigcommerce.com/product_images/${img.image_file}`
        console.log(url)
        return {
          is_thumbnail: img.is_thumbnail,
          sort_order: img.sort_order,
          description: img.description,
          image_url: url,
      
        };
      });
      for (const image of newImages) {
        console.log(image)
        require("./config/config").config("ah");
        await createProductImage(product.id, image);
      }
      
    }
  } catch (err: any) {
    console.log(err.response ? err.response.data : err);
  }
}

main();
