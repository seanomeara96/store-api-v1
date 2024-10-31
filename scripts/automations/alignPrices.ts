import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";

async function align() {
  try {
    require("../../config/config").config("bf");
    const src_product_variants = await getAllProductVariants()
    console.log(`fetched ${ src_product_variants.length } product variants from src`)

    require("../../config/config").config("px");
    const dest_product_variants = await getAllProductVariants()
    console.log(`fetched ${ src_product_variants.length } product variants from dest`)
    

    console.log("starting match search...")
    for (let i = 0; i < src_product_variants.length; i++) {
      const s = src_product_variants[i];
      for (let ii = 0; ii < dest_product_variants.length; ii++) {
        const d = dest_product_variants[ii];
        if (s.sku === d.sku) {

          console.log(`i:${i} & ii:${ii}`)

          console.log(`match found for SKU: ${s.sku}`);
          // found sku

          if(!s.price){
            console.log(`SKU ${s.sku} has no price`)
          }

          const salePriceMismatch = s.sale_price !== d.sale_price;
          const priceMismatch = s.price !== d.price;
          const costPriceMismatch = s.cost_price !== d.cost_price;
          const retailPriceMismatch = s.retail_price !== d.retail_price;
          if (
            salePriceMismatch ||
            priceMismatch ||
            costPriceMismatch ||
            retailPriceMismatch
          ) {

            

            try {
              await updateProductVariant(d.product_id, d.id, {
                sale_price: s.sale_price!,
                price: s.price!,
                retail_price: s.retail_price!,
                cost_price: s.cost_price,
              });

              console.log(`Updated product variant ${d.id} for product ${d.product_id}:`);
              if (priceMismatch) console.log(`Old price: ${d.price}, New price: ${s.price}`);
              if (salePriceMismatch) console.log(`Old sale price: ${d.sale_price}, New sale price: ${s.sale_price}`);
              if (retailPriceMismatch) console.log(`Old retail price: ${d.retail_price}, New retail price: ${s.retail_price}`);
              if (costPriceMismatch) console.log(`Old cost price: ${d.cost_price}, New cost price: ${s.cost_price}`);
              console.log("-------------------");

            } catch(err: any) {
              if(err.response.status == 422){
                continue
              }
              throw err
            }
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

align();
