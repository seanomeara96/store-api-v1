const store = require("../../config/axios-config");
const { getProductsByBrand } = require("../../products/getProductsByBrand");
const addLine = (productId, lineToAdd) =>
  new Promise(async (resolve, reject) => {
    validateParams(productId, lineToAdd, reject);
    try {
      const productDescription = await getProductDescription(productId);
      const updatedProductDescription = lineToAdd + productDescription;
      await updateProductDescription(productId, updatedProductDescription);
      resolve("Line added");
    } catch (err) {
      reject(err);
    }
  });

const removeLine = (productId, lineToRemove) =>
  new Promise(async (resolve, reject) => {
    validateParams(productId, lineToRemove, reject);
    try {
      const productDescription = await getProductDescription(productId);
      console.log(productDescription);
      const updatedProductDescription = productDescription.replace(
        lineToRemove,
        ""
      );
      await updateProductDescription(productId, updatedProductDescription);
      if (productDescription == updatedProductDescription)
        return reject("no change was made");
      resolve();
    } catch (err) {
      reject(err);
    }
  });

const addLineToMany = (productIds, lineToAdd) =>
  new Promise((resolve, reject) => {
    let promises = [];
    productIds.forEach((product) => {
      const idKey = Object.keys(product)[0];
      promises.push(addLine(product[idKey], lineToAdd));
    });
    Promise.allSettled(promises)
      .then((results) => resolve(results))
      .catch(reject);
  });
/**
 * 
 * @param {string} brandName 
 * @param {string} lineToAdd 
 * @returns adds string to beginning of content
 */
const addLineToBrandProducts = (brandName, lineToAdd) =>
  new Promise((resolve, reject) => {
    let promises = [];
    getProductsByBrand(brandName)
      .then((products) => {
        products.forEach(({ id }) => {
          promises.push(addLine(id, lineToAdd));
        });
        Promise.allSettled(promises)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });

  const removeLineFromBrandProducts = (brandName, lineToRemove) =>
  new Promise((resolve, reject) => {
    let promises = [];
    getProductsByBrand(brandName)
      .then((products) => {
        products.forEach(({ id }) => {
          promises.push(removeLine(id, lineToRemove));
        });
        Promise.allSettled(promises)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });

const removeLineFromMany = (productIds, lineToRemove) =>
  new Promise((resolve, reject) => {
    let promises = [];
    productIds.forEach((product) => {
      const idKey = Object.keys(product)[0];
      promises.push(removeLine(product[idKey], lineToRemove));
    });
    Promise.allSettled(promises)
      .then((res) => resolve(res))
      .catch(reject);
  });
exports.addLine = addLine;
exports.addLineToMany = addLineToMany;
exports.removeLine = removeLine;
exports.removeLineFromMany = removeLineFromMany;
exports.addLineToBrandProducts = addLineToBrandProducts;
exports.removeLineFromBrandProducts = removeLineFromBrandProducts;
function getProductDescription(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await store.get(`/catalog/products/${id}`);
      const productDescription = product.data.data.description;
      resolve(productDescription);
    } catch (err) {
      reject(err);
    }
  });
}

function updateProductDescription(productId, updatedProductDescription) {
  return new Promise((resolve, reject) => {
    store
      .put(`/catalog/products/${productId}`, {
        description: updatedProductDescription,
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

function validateParams(numero, sentence, reject) {
  if (typeof sentence !== "string") reject("lineToAdd must be a string");
  if (typeof numero !== "number") reject("product id must be a number");
}
