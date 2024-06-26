import { createRedirect } from "../../functions/redirects/createRedirect";

require("../../config/config").config("ch");

const data = [
  {
    url: "/gold-rim-collection-for-hire",
    new_url: "https://caterhire.ie/products/crockery/gold-and-silver-rim/",
  },
  {
    url: "/apollo-white-crockery-for-hire/",
    new_url: "https://www.caterhire.ie/white-crockery/-and-silver-rim/",
  },
  {
    url: "/christian-lacroix-caribe-collection-for-hire/",
    new_url: "https://www.caterhire.ie/coloured-crockery-for-hire",
  },
  {
    url: "/carrara-marble-collection-for-hire",
    new_url: "https://www.caterhire.ie/coloured-crockery-for-hire",
  },
  {
    url: "/fiji-collection-for-hire",
    new_url: "https://www.caterhire.ie/coloured-crockery-for-hire",
  },
  {
    url: "/timeless-dinner-collection",
    new_url: "https://www.caterhire.ie/coloured-crockery-for-hire",
  },
  {
    url: "/venezia-collection",
    new_url: "https://www.caterhire.ie/coloured-crockery-for-hire",
  },
  {
    url: "/mediterranean-dinner-plate-collection",
    new_url: "https://www.caterhire.ie/coloured-crockery-for-hire",
  },
  {
    url: "/goa-white-gold-cutlery-collection",
    new_url: "https://www.caterhire.ie/coloured-cutlery/",
  },
  {
    url: "/goa-black-gold-cutlery-collection",
    new_url: "https://www.caterhire.ie/coloured-cutlery/",
  },
  {
    url: "/products/crockery-hire/transatlantica-collection",
    new_url: "https://www.caterhire.ie/coloured-crockery-for-hire",
  },
  {
    url: "/products/cutlery-hire/goa-pink-gold-cutlery-collection",
    new_url: "https://www.caterhire.ie/coloured-cutlery/",
  },
  {
    url: "/products/cutlery-hire/mother-of-pearl-collection-hire",
    new_url: "https://www.caterhire.ie/coloured-cutlery/",
  },
  {
    url: "/products/cutlery-hire/aqua-collection",
    new_url: "https://www.caterhire.ie/coloured-cutlery/",
  },
  {
    url: "/shop-by-category/black-matte-stoneware-collection-for-hire/",
    new_url: "https://www.caterhire.ie/coloured-crockery-for-hire",
  },
  {
    url: "/royal-doulton-white-crockery-for-hire",
    new_url: "https://www.caterhire.ie/white-crockery/-and-silver-rim/",
  },
  {
    url: "/kings-silver-cutlery-collection",
    new_url: "https://www.caterhire.ie/silver-cutlery/",
  },
  {
    url: "/arthur-price-silver-cutlery-collection",
    new_url: "https://www.caterhire.ie/silver-cutlery/",
  },
  {
    url: "/wedgwood-white-fine-china-for-hire",
    new_url: "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
  },
  {
    url: "/ascot-silver-cutlery-collection",
    new_url: "https://www.caterhire.ie/silver-cutlery/",
  },
  {
    url: "/victoria-gold-cutlery",
    new_url: "https://www.caterhire.ie/gold-cutlery/",
  },
  {
    url: "/regency-white-crockery-collection",
    new_url: "https://www.caterhire.ie/white-crockery/-and-silver-rim/",
  },
  {
    url: "/windsor-silver-cutlery",
    new_url: "https://www.caterhire.ie/silver-cutlery/",
  },
  {
    url: "/stoneware-dinner-plate-collection-for-hire",
    new_url: "https://www.caterhire.ie/coloured-crockery-for-hire",
  },
  {
    url: "/silver-rim-crockery-for-hire",
    new_url: "https://caterhire.ie/products/crockery/gold-and-silver-rim/",
  },
  {
    url: "/wedgwood-jasper-conran-chinoiserie-collection",
    new_url: "https://www.caterhire.ie/coloured-crockery-for-hire",
  },
];


(async () => {
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
})();
