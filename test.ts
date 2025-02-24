import { getAllProductImages, ProductImage } from "./functions/images/getAllProductImages";
import { getAllProducts } from "./functions/products/getAllProducts";
import { getProductById } from "./functions/products/getProductById";
import { getProductBySku } from "./functions/products/getProductBySKU";
import { Product } from "./functions/products/Product";
import { updateProduct } from "./functions/products/updateProduct";

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

async function test() {
  try {
    

    for(let  i = 17; i < skus.length; i++){
      console.log(i, skus.length)
      require("./config/config").config("ch");
      const product = await getProductBySku(skus[i].sku)
      if(!product) {
        console.log(`no product for ${skus[i].sku}`)
        continue
      }

      const relatedProductSKUs: string[] = []
      for(let j = 0; j  < product.related_products.length; j++){
        const relatedProduct = await getProductById(product.related_products[j])
        relatedProductSKUs.push(relatedProduct.sku)
      }
      
      require("./config/config").config("ha");
      const destinationProduct = await getProductBySku(skus[i].sku)
      if(!destinationProduct) {
        console.log(`no destination product for ${skus[i].sku}`)
        continue
      }
      destinationProduct.related_products = []

      for(let k = 0; k < relatedProductSKUs.length; k++){
        const relatedProduct = await getProductBySku(relatedProductSKUs[k])
        if(!relatedProduct) {
          console.log(`no related product for ${relatedProductSKUs[k]}`)
          continue
        }

        destinationProduct.related_products.push(relatedProduct.id)
      }

      await updateProduct(destinationProduct.id, {related_products: destinationProduct.related_products})


    }

  } catch (err) {
    console.log(err);
  }
}
test();
