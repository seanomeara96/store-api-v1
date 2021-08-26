require("./config/config").config("ih")
const { getAllCategories} = require("./categories/getAllCategories")
async function main (){
  let cats = await getAllCategories();
  
  let catsWithImageCount = cats.filter(({image_url}) => image_url !== "")
  console.log(cats.length)
  console.log(catsWithImageCount)
}
main()