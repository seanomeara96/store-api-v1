import { getBpProductDetails } from "../../brightpearl/getBpProductDetails";
import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";
require("../../config/config").config("px");
async function main() {
  try {
    const products = await getAllProducts();
    console.log(products.length)
    for (let i = 0; i < products.length; i++) {
      console.log(`Updating product ${i + 1} of ${products.length}`);
      const product = products[i];

      try {
        const vars = await getProductVariants(product.id);

        console.log(`Found ${vars.length} variants for ${product.name}`);

        if (!vars.length) {
          throw "No Variants";
        }

        if (vars.length === 1) {
          try {
            const bpProductDetails = await getBpProductDetails(product.sku);
            await updateProduct(product.id, {
              upc: bpProductDetails.barcode,
              gtin: bpProductDetails.barcode,
              mpn: bpProductDetails.barcode,
            });
            console.log(
              `Updated barcode for sku ${product.sku} : ${product.name}`
            );
          } catch (err) {
            console.log(`Error while updating barcode for sku: ${product.sku}`);
            console.log(err);
          }
        }

        if (vars.length > 1) {
          for (let ii = 0; ii < vars.length; ii++) {
            console.log(`Updating variant ${ii + 1} of ${vars.length}`);
            const variant = vars[ii];
            try {
              const bpProductDetails = await getBpProductDetails(variant.sku);
              await updateProductVariant(product.id, variant.id, {
                gtin: bpProductDetails.barcode,
                mpn: bpProductDetails.barcode,
                upc: bpProductDetails.barcode,
              });
              console.log(
                `Updated barcode for sku ${variant.sku} a variant of ${product.name}`
              );
            } catch (err) {
              console.log(
                `Error while updating for sku: ${variant.sku} a variant of ${product.name}`
              );
              console.log(err);
            }
          }
        }
      } catch (err: any) {
        console.log(`Error fetching variants`);
        console.log(err);
        if (err.response) {
          if (err.response.status == 503) {
            await new Promise((res) => setTimeout(res, 30 * 1000));
            i--;
            continue;
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}
main();
