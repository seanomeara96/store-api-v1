const fs = require("fs");
const { getFirstProductImage } = require("../../functions/images/getFirstProductImage");
const {getAllProducts} = require("../../functions/products/getAllProducts")
const download = require("image-downloader");

const path = require("path")


require("../../config/config").config("bsk");

const products = [{"Product ID":536},
  {"Product ID":537},
  {"Product ID":538},
  {"Product ID":539},
  {"Product ID":540},
  {"Product ID":541},
  {"Product ID":542},
  {"Product ID":543},
  {"Product ID":544},
  {"Product ID":545},
  {"Product ID":546},
  {"Product ID":547},
  {"Product ID":548},
  {"Product ID":549},
  {"Product ID":550},
  {"Product ID":551}]
  
  // (await getAllProducts({brand_id: 21}).catch(console.log)).filter(product => product.inventory_level)


main("images");
async function main(folderName){
  


  const images = (await Promise.all(products.map(product => getFirstProductImage(product.id || product["Product ID"])))).filter(arr => arr.length).map(imageArr => imageArr[0].url_zoom);

  console.log(images)

  for (const image of images){
    const options = {
      url: image,
      dest: path.resolve(__dirname, folderName),
      extractFilename: true,
    }
    await download.image(options).catch(console.log)
  }
  
}

