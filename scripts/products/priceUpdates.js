const {
    updateProductVariant,
  } = require("../../functions/product-variants/updateProductVariant");
  const {
    getProductIdFromSku,
  } = require("../../functions/products/getProductIdFromSku");
  const {
    getProductVariants,
  } = require("../../functions/products/getProductVariants");
  const { updateProduct } = require("../../functions/products/updateProduct");
  
  require("./config/config").config("fs");
  const data = [
    {
      sku: "8053A",
      name: "Matchstick Monkey Dancing Monkey Teether Pink",
      cost: 9.614723779,
      retail_price: 17.99,
      sale_price: 16.99,
    },
    {
      sku: "9795",
      name: "Baby Vit D3 Pure Vitamin D Pump Drops 28ml",
      cost: 7.654487808,
      retail_price: 13.99,
      sale_price: 12.99,
    },
    {
      sku: "5936",
      name: "Baby Vit D (Vitamin D Drops)",
      cost: 7.127438286,
      retail_price: 12.99,
      sale_price: 11.99,
    },
    {
      sku: "5937",
      name: "Pregnacare Liquid 200ml",
      cost: 7.754110079,
      retail_price: 15.99,
      sale_price: 12.99,
    },
    {
      sku: "5938",
      name: "Pregnacare Original - 30 Tablets",
      cost: 4.744169611,
      retail_price: 9.99,
      sale_price: 8.99,
    },
    {
      sku: "4231",
      name: "Vitabiotics Pregnacare Plus 56 Tablets",
      cost: 13.08403361,
      retail_price: 27.99,
      sale_price: 22.99,
    },
    {
      sku: "7574",
      name: "Pregnacare Original 90 Tablets",
      cost: 12.11914507,
      retail_price: 25.99,
      sale_price: 19.99,
    },
    {
      sku: "40366",
      name: "Wellman Conception 30 Tablets",
      cost: 9.691725257,
      retail_price: 20.99,
      sale_price: 17.99,
    },
    {
      sku: "6505",
      name: "Vitabiotics Wellbaby Infant Liquid 4mth-4yr 150ml",
      cost: 7.021170131,
      retail_price: 14.99,
      sale_price: 12.99,
    },
    {
      sku: "43378",
      name: "Pregnacare Max",
      cost: 17.44892392,
      retail_price: 36.99,
      sale_price: 29.99,
    },
    {
      sku: "43379",
      name: "Vitabiotics Pregnacare New Mum",
      cost: 12.60115607,
      retail_price: 26.99,
      sale_price: 21.99,
    },
    {
      sku: "7466",
      name: "Vitabiotics Ultra Folic Acid - 60 Tablets",
      cost: 3.69953775,
      retail_price: 7.99,
      sale_price: 5.99,
    },
    {
      sku: "9075",
      name: "Vitabiotics Pregnacare Gummies 60's",
      cost: 13.21964529,
      retail_price: 22.99,
      sale_price: 21.99,
    },
  ];
  async function main() {
    // identify product ids
    // reduce to 15% margin
    // add to clearance sections
    for (const row of data) {
      try {
        console.log(`finding product id for sku: ${row.sku}...`);
        const p_id = await getProductIdFromSku(row.sku);
        const variants = await getProductVariants(p_id);
        
        if (variants.length === 1 && variants[0].sku_id === null) {
          console.log("only one base variant. updating product");
          // update product
          await updateProduct(p_id, {
            sale_price: row.sale_price,
            price: row.retail_price,
            retail_price: row.retail_price,
            cost_price: row.cost_price
          });
        } else {
          console.log("looking for variant");
          const variant = variants.find((v) => v.sku === row.sku);
          if (variant) {
            console.log("variant found");
            // update variant
            await updateProductVariant(p_id, variant.id, {
              sale_price: row.sale_price,
              price: row.retail_price,
              retail_price: row.retail_price,
              cost_price: row.cost_price
            });
          }
        }
        console.log(`updated product with sku: ${row.sku}`);
      } catch (err) {
        console.log(err);
        continue;
      }
    }
    console.log("done");
  }
  main();
  