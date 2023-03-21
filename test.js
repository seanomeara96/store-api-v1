const { getProductsByBrand } = require("./functions/products/getProductsByBrand");
const { getAllRedirects } = require("./functions/redirects/getAllRedirects");
const { deleteRedirect } = require("./functions/redirects/deleteRedirect");



(async () => {
  require("./config/config").config("pb");
  const brandProducts = await getProductsByBrand(`Zita West`)
  const redirects = await getAllRedirects();
  for(const product of brandProducts){
    const productUrl = product.custom_url.url
    const matchingRedirect = redirects.find(r => r.from_path === productUrl)
    if(matchingRedirect){
      console.log(matchingRedirect)
      try {
        await deleteRedirect(matchingRedirect.id)
        console.log("deleted redirect")
      } catch (err) {
        console.log(err)
      }
    }
  }
})();
