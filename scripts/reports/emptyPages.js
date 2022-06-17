const allStores = [
  { initial: "bf", name: "BeautyFeatures" },
  { initial: "bsk", name: "BeautySkincare" },
  { initial: "ah", name: "AllHair" },
  { initial: "pb", name: "Pregnancy&Baby" },
  { initial: "ih", name: "InHealth" },
  { initial: "bs", name: "BabySafety" },
  { initial: "huk", name: "Haakaa Uk" },
  { initial: "hie", name: "Haakaa Ireland" },
  { initial: "ds", name: "DogSpace" },
  { initial: "stie", name: "Sleepytot IE" },
  { initial: "beuk", name: "BeautiEdit UK" },
];
const { getAllProducts } = require("../../functions/products/getAllProducts");
const { getAllBrands } = require("../../functions/brands/getAllBrands");
const {
  getAllCategories,
} = require("../../functions/categories/getAllCategories");

const { getSiteUrl } = require("../../functions/utils/getSiteUrl");

function getSiteEmptyPages(site) {
  return new Promise(async (resolve, reject) => {
    require("../../config/config").config(site);
    const products = await getAllProducts().catch(reject);

    const brands = await getAllBrands().catch(reject);

    const categories = await getAllCategories().catch(reject);

    const issues = [];

    const productIsVisible = (product) =>
      product.inventory_level > 0 && product.is_visible;

    for (const brand of brands) {
      const brandProducts = products.filter(
        (product) => product.brand_id === brand.id
      );

      const visibleProducts = brandProducts.filter(productIsVisible);

      if (!visibleProducts.length) issues.push(brand);
    }

    for (const category of categories) {
      const categoryProducts = products.filter((product) =>
        product.categories.includes(category.id)
      );

      const visibleProducts = categoryProducts.filter(productIsVisible);

      if (!visibleProducts.length && category.is_visible) issues.push(category);
    }

    resolve({
      site: site.toUpperCase(),
      emptyPages: issues.map((page) => getSiteUrl(site) + page.custom_url.url),
    });
  });
}

async function getAllEmptyPages(){
  const emptyPages = []
  for (const store of allStores){
    const pages = await getSiteEmptyPages(store.initial).catch((err) => {
      throw new Error(err)
    });
    emptyPages.push(pages)
  }
  return emptyPages;
}


(async function(){
  const emptyPages  = await getAllEmptyPages();
  console.log(emptyPages)
})()