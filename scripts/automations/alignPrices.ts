import { ProductVariant } from "../../functions/product-variants/ProductVariant";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getProductVariants } from "../../functions/products/getProductVariants";
async function align() {
  require("./config/config").config("bf");
  const src_products = await getAllProducts({ brand_id: 57 });
  const src_variants: ProductVariant[] = [];
  for (const p of src_products) {
    const vars = await getProductVariants(p.id);
    for (const v of vars) {
      src_variants.push(v);
    }
  }
  require("./config/config").config("ah");
  const dest_products = await getAllProducts({ brand_id: 57 });
  const dest_variants: ProductVariant[] = [];
  for (const p of dest_products) {
    const vars = await getProductVariants(p.id);
    for (const v of vars) {
      dest_variants.push(v);
    }
  }

  for (let i = 0; i < src_variants.length; i++) {
    const s = src_variants[i];
    for (let ii = 0; ii < dest_variants.length; ii++) {
      const d = dest_variants[ii];
      if (s.sku === d.sku) {
        const salePriceMismatch = s.sale_price != d.sale_price;
        const priceMismatch = s.price != d.price;
        const costPriceMismatch = s.cost_price != d.cost_price;
        const retailPriceMismatch = s.retail_price != d.retail_price;
        if (
          salePriceMismatch ||
          priceMismatch ||
          costPriceMismatch ||
          retailPriceMismatch
        ) {
          await updateProductVariant(d.product_id, d.id, {
            sale_price: s.sale_price,
            price: s.price,
            retail_price: s.retail_price,
            cost_price: s.cost_price,
          });
        }
      }
    }
  }
}

align();
