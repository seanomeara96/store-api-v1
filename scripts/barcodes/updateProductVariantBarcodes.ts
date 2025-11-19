import { getBpProductDetails } from "../../brightpearl/getBpProductDetails";
import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";

async function main() {
  const stores = ["bf", "ah", "bsk", "ih", "pb", "bs"];

  for (const store of stores) {
    require("../../config/config").config(store);

    try {
      const products = await getAllProducts();

      for (let i = 0; i < products.length; i++) {
        console.log(i, products.length);
        const product = products[i];

        try {
          const vars = await getProductVariants(product.id);

          console.log(`Found ${vars.length} variants for ${product.name}`);

          if (vars.length === 0) {
            throw new Error("No Variants");
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
                `Updated barcode for sku ${product.sku} : ${product.name}`,
              );
            } catch (err) {
              console.error(
                `Error while updating barcode for sku: ${product.sku}`,
                err,
              );
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
                  `Updated barcode for sku ${variant.sku} a variant of ${product.name}`,
                );
              } catch (err) {
                console.error(
                  `Error while updating for sku: ${variant.sku} a variant of ${product.name}`,
                  err,
                );
              }
            }
          }
        } catch (err: any) {
          console.error(`Error fetching variants`, err);
          if (
            err.response &&
            (err.response.status === 503 || err.response.status === 429)
          ) {
            await new Promise((res) => setTimeout(res, 30 * 1000));
            i--;
            continue;
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}

main();
