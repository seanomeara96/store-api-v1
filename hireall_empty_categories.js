const {getAllCategories} = require("./functions/categories/getAllCategories");
const {getAllProducts} = require("./functions/products/getAllProducts");
const {output} = require("./scripts/utils/output");
require("./config/config").config("ha");
(async () => {
  const [categories, products] = await Promise.all([getAllCategories(), getAllProducts()]);

  for(const cat of categories){
    cat.productCount = products.filter(p => p.categories.includes(cat.id)).length;
  }

  const to_output = categories.filter(c => c.productCount < 1).map(c => ({
    id: c.id,
    name: c.name,
    "product count": c.productCount,
    "is visible": c.is_visible ? "true" : "false",
    url: "https://hireall.ie" + c.custom_url.url,
  }))

  output("ha-emptycategories", to_output)
})()