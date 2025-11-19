import { createRedirect } from "../../functions/redirects/createRedirect";

require("../../config/config").config("ch");

async function processRedirects() {
  const data = [
    "/products/buffet-display/chafers/?dir=asc&limit=all&order=name&page=3",
    "/products/coloured-napkins/",
    "/products/speciality-unique-plates/vintage-crockery-for-hire/?limit=all&mode=grid&page=2",
    "/products/lounge-furniture-hire/?limit=all&mode=list&page=4",
    "/products/lounge-furniture-hire/?limit=all&mode=list&page=2",
    "/products/crockery/fine-dining-373/wedgwood-bone-china.html",
    "/products/glassware/water-and-juice-glasses/",
    "/products/table-linen-chair-covers.html",
    "/goa-pink-gold-cutlery/",
    "/products/crockery/charger-plates-base-plates.html",
    "/products/chairs-stools/wedding-chairs.html",
    "/table-linen-for-sale/",
    "/products/kitchen-equipment/cooking-equipment/deep-fat-fryers/?dir=asc&limit=all&mode=list&order=price&page=3",
    "/products/kitchen-equipment/cooking-equipment/deep-fat-fryers/?dir=asc&limit=all&mode=list&order=price&page=2",
  ].map(function (url) {
    return { url: url.trim(), new_url: "/" };
  });

  for (const { url, new_url } of data) {
    try {
      await createRedirect(url, new_url);
      console.log(`created redirect from ${url} to ${new_url}`);
    } catch (err: any) {
      console.log(err.response.data ? err.response.data : err);
      break;
    }
  }
  console.log("done");
}

processRedirects();
