/// need new in category id
let newInCategoryId = 0;
let nProducts = 10;
async function addProductsToNewInCat() {
  const products = await getAllProducts();
  let productsInCat = products.filter((product) =>
    product.categories.includes(newInCategoryId)
  );
  let productsInCatIds = productsInCat.map((product) => {
    return { id: product.id };
  });
  // empty the category
  await removeCategoryFromSpecificProducts(productsInCatIds,newInCategoryId)
  // need "n" the number of previously added products to go into the new in cat
  //then apply that category to the n products
  await addCategoryToSpecificProducts()
}
addProductsToNewInCat();




// then removing the categor from that product


