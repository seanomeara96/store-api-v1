
require("./config/config").config("bf")
const { getAllRedirects } = require("./redirects/getAllRedirects");

async function main (){
  const redirects = await getAllRedirects()
  console.log(redirects.filter(i => i.from_path.includes("christmas-g")))
}

main()