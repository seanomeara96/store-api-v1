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
    const src = "bf";
    const dest = "px";
    const skus = [
      { sku: "5702" },
      { sku: "5703" },
      { sku: "9921" },
      { sku: "6465" },
      { sku: "6466" },
      { sku: "6467" },
      { sku: "6468" },
      { sku: "6469" },
      { sku: "6470" },
      { sku: "6471" },
      { sku: "6472" },
      { sku: "6473" },
      { sku: "6474" },
      { sku: "6475" },
      { sku: "6476" },
      { sku: "6477" },
      { sku: "6478" },
      { sku: "6479" },
      { sku: "6481A" },
      { sku: "6481" },
      { sku: "6482" },
      { sku: "6483" },
      { sku: "6736" },
      { sku: "6737" },
      { sku: "6738" },
      { sku: "6739" },
      { sku: "6740" },
      { sku: "6741" },
      { sku: "6742" },
      { sku: "6743" },
      { sku: "6744" },
      { sku: "6745" },
      { sku: "6746" },
      { sku: "6747" },
      { sku: "8758" },
      { sku: "8759" },
      { sku: "8760" },
      { sku: "7682" },
      { sku: "7683" },
      { sku: "7684" },
      { sku: "7685" },
      { sku: "7686" },
      { sku: "7687" },
      { sku: "7688" },
      { sku: "7689" },
      { sku: "7999" },
      { sku: "8000" },
      { sku: "8001" },
      { sku: "8063" },
      { sku: "8066" },
      { sku: "8192" },
      { sku: "8193" },
      { sku: "8204" },
      { sku: "8205" },
      { sku: "8206" },
      { sku: "8713" },
      { sku: "8716" },
      { sku: "8717" },
      { sku: "8715" },
      { sku: "8719" },
      { sku: "8718" },
      { sku: "8714" },
      { sku: "8749" },
      { sku: "8756" },
      { sku: "8757" },
      { sku: "9078" },
      { sku: "9087" },
      { sku: "9229" },
      { sku: "9786" },
      { sku: "9804" },
      { sku: "9805" },
      { sku: "9803" },
      { sku: "9802" },
      { sku: "9806" },
      { sku: "9801" },
      { sku: "9894" },
      { sku: "9895" },
      { sku: "9897" },
      { sku: "9898" },
      { sku: "9899" },
      { sku: "9906" },
      { sku: "9907" },
      { sku: "9908" },
      { sku: "9916" },
      { sku: "9917" },
      { sku: "9919" },
      { sku: "9920" },
      { sku: "9954" },
      { sku: "9955" },
      { sku: "9956" },
      { sku: "10377" },
      { sku: "10411" },
      { sku: "10412" },
      { sku: "10414" },
      { sku: "10415" },
      { sku: "10413" },
      { sku: "10416" },
      { sku: "10417" },
      { sku: "10419" },
      { sku: "10418" },
      { sku: "10364a" },
      { sku: "10361a" },
      { sku: "10365a" },
      { sku: "10364b" },
      { sku: "11038" },
      { sku: "11039" },
      { sku: "11040" },
      { sku: "11041" },
      { sku: "11042" },
      { sku: "11043" },
      { sku: "11044" },
      { sku: "11074" },
      { sku: "11075" },
      { sku: "11076" },
      { sku: "12351" },
      { sku: "12352" },
      { sku: "12353" },
      { sku: "12756" },
      { sku: "12757" },
      { sku: "12758" },
      { sku: "13038" },
      { sku: "13248" },
      { sku: "13249" },
      { sku: "13250" },
      { sku: "13253" },
      { sku: "8192A" },
      { sku: "14054" },
      { sku: "14052" },
      { sku: "14050" },
      { sku: "14051" },
      { sku: "14053" },
      { sku: "14136" },
      { sku: "14137" },
      { sku: "14408" },
      { sku: "14686" },
      { sku: "14758" },
      { sku: "14759" },
      { sku: "14760" },
      { sku: "14761" },
      { sku: "14762" },
      { sku: "14763" },
      { sku: "14764" },
      { sku: "20109" },
      { sku: "20110" },
      { sku: "20111" },
      { sku: "20112" },
      { sku: "20230" },
      { sku: "20231" },
      { sku: "20232" },
      { sku: "20233" },
      { sku: "20198" },
      { sku: "20199" },
      { sku: "20200" },
      { sku: "20208" },
      { sku: "20209" },
      { sku: "20210" },
      { sku: "20211" },
      { sku: "20212" },
      { sku: "20213" },
      { sku: "14057" },
      { sku: "20649" },
      { sku: "20646" },
      { sku: "20647" },
      { sku: "20648" },
      { sku: "20650" },
      { sku: "20651" },
      { sku: "20652" },
      { sku: "20656" },
      { sku: "20657" },
      { sku: "20658" },
      { sku: "20659" },
      { sku: "20660" },
      { sku: "20661" },
      { sku: "20662" },
      { sku: "20663" },
      { sku: "20672" },
      { sku: "20673" },
      { sku: "20674" },
      { sku: "20675" },
      { sku: "20676" },
      { sku: "20677" },
      { sku: "20678" },
      { sku: "20679" },
      { sku: "20720" },
      { sku: "20721" },
      { sku: "20722" },
      { sku: "20723" },
      { sku: "20724" },
      { sku: "20214" },
      { sku: "20767" },
      { sku: "20759" },
      { sku: "20761" },
      { sku: "20766" },
      { sku: "20762" },
      { sku: "20764" },
      { sku: "20765" },
      { sku: "20760" },
      { sku: "20763" },
    ];
    for (let i = 0; i < skus.length; i++) {
      console.log(i, skus.length);
      const { sku } = skus[i];
      let [srcProductID, destProductID] = [0,0]
      try {
         [srcProductID, destProductID] = await getProductIds(
          sku,
          src,
          dest
        );
      } catch (err) {
        console.log(err);
        continue;
      }
      if(!srcProductID || !destProductID) {
        throw new Error("Expected an id for both src and dest product")
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
