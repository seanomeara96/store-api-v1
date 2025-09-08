import { getAllProducts } from "./functions/products/getAllProducts";

require("./config/config").config("bf");

async function testMain() {
  try {

    const products = await getAllProducts()

    const culprits = products.filter(p => p.description.toLowerCase().includes("product name"))

    console.log(culprits.map(p =>p.name))

    // for(let i = 0; i < products.length; i++){
    //   console.log(i, products.length)
    //   const product = products[i]

    //   const videos = await getProductVideos(product.id)

    //   console.log(videos)


    // }
  } catch (err) {
    console.log(err);
  }
}
testMain();
