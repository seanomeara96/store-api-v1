import express from "express"
import fs from "fs"
import path from "path"
import { getAllProducts } from "../functions/products/getAllProducts"
import { ProductImage } from "../functions/images/getProductImage";
import { getAllProductImages } from "../functions/images/getAllProductImages";
import { deleteProductImage } from "../functions/images/deleteProductImage";
const store = "bf";
let imagery:ProductImage[]
async function main(){
  try {
    require("./config/config").config(store)

    try {
      imagery = JSON.parse(fs.readFileSync(path.resolve(__dirname, `${store}-images.json`), {encoding: "utf-8"}))
    } catch {
      const products = await getAllProducts({brand_id: 18})
      imagery = []
      for(let i = 0; i < products.length; i++){
        console.log(i, products.length)
        imagery.push(...(await getAllProductImages(products[i].id)))
      }
      fs.writeFileSync(path.resolve(__dirname, `${store}-images-original.json`), JSON.stringify(imagery), {encoding: "utf-8"})
      fs.writeFileSync(path.resolve(__dirname, `${store}-images.json`), JSON.stringify(imagery), {encoding: "utf-8"})
    }
    const app = express()

    app.get("/",(req, res)=>{
      res.send(/*HTML*/`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body style="display: flex; flex-wrap: wrap; flex-grow: 1; flex-shrink:0;">
            ${
              imagery.map(img => /*HTML*/`<img
                hx-trigger="click"
                hx-post="/delete/${img.product_id}/${img.id}"
                hx-swap="outerHTML"
                style="width: 10%; flex-grow: 1; flex-shrink:0;" src="${img.url_zoom}">`).join("")
            }
            <script src="https://unpkg.com/htmx.org@2.0.4" integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+" crossorigin="anonymous"></script>
        </body>
        </html>`)
    })

    app.post(`/delete/:product_id/:image_id`, async (req, res)=>{
      const pID = parseInt(req.params.product_id)
      const ID = parseInt(req.params.image_id)
      await deleteProductImage(pID, ID)
      console.log(`deleted product ${req.params.product_id} image ${req.params.image_id}`)
      imagery = imagery.filter(img => !(img.id === ID && img.product_id === pID) )
      fs.writeFileSync(path.resolve(__dirname, `${store}-images.json`), JSON.stringify(imagery), {encoding: "utf-8"})
      res.send("")
    })

    app.listen(3000)

  } catch(err) {
    console.log(err)
  }
}
main()

