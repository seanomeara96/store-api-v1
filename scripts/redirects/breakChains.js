const { getAllRedirects } = require("../../functions/redirects/getAllRedirects")

require("../../config/config").config("ah")

async function main(){
    getAllRedirects()
}