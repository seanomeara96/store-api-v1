const createRelevantRedirect = (product) => new Promise(async (resolve, reject) => {
    if(product.brand_id){
        const brand = await getBrandById(product.brand_id).catch(reject)
        await createRedirect()
    }
})

const deleteProduct = (id) =>
  new Promise(async (resolve, reject) => {
    const product = await getProductById(id).catch(reject);
    await require("../../config/config").store.delete(`/catalog/products/${id}`).catch(reject)
    await createRelevantRedirect(product).catch(reject);
    resolve(`Successfully deleted ${product.name}`)
  });


  exports.deleteProduct = deleteProduct;