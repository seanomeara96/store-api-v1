const fs = require("fs");
const { getFirstProductImage } = require("./functions/images/getFirstProductImage");
const {getAllProducts} = require("./functions/products/getAllProducts")
const download = require("image-downloader");

const path = require("path")


require("./config/config").config("bf");

async function test(){
  const products = (await getAllProducts({brand_id: 21}).catch(console.log)).filter(product => product.inventory_level)


  const images = (await Promise.all(products.map(product => getFirstProductImage(product.id)))).filter(arr => arr.length).map(imageArr => imageArr[0].url_zoom)
  console.log(images)

  for (const image of images){
    const options = {
      url: image,
      dest: path.resolve(__dirname, "images"),
      extractFilename: true,
    }
    await download.image(options).catch(console.log)
  }
  
}

test();