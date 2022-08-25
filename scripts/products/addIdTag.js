require("../../config/config").config("bf");
const { addLine } = require("../../functions/content/addLine");
const { getProductsByCategory } = require("../../functions/products/getProductsByCategory");

const idString = `loreal-metal-detox`;
const catId = 704;



async function addIdTag() {
  const products = await getProductsByCategory(catId).catch(()=> {
    throw new Error("Cant get products in category")
  });

  const productsIds = products.map(p => ({id: p.id}))

  const script = `<!--start-${idString}--><script id="${idString}" type="text/javascript"></script><!--end-${idString}-->`;


  const promises = productsIds.map((p) => {
    return addLine(Object.values(p)[0], script);
  });
  const res = await Promise.allSettled(promises);
  const fulfilledReducer = (a, c) => (c.status === "fulfilled" ? a + 1 : a);
  const fulfilled = res.reduce(fulfilledReducer, 0);
  const status = `${fulfilled}/${res.length} ok`;
  console.log(status);
  if (fulfilled !== res.length) console.log(res);
}

addIdTag();
