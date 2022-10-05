/**
 * updates a product. must supply a valid field
 * @param {number} productId
 * @param {object} fieldToUpdate
 * @returns promise
 */
 export const updateBrand = (brandId: number, fieldToUpdate: any) =>
 new Promise((resolve, reject) => {
   if (typeof brandId !== "number")
     return reject("product id must be a number");

   if (typeof fieldToUpdate !== "object")
     return reject("field to update must be an object");

   require("../../config/config")
     .store.put(`/catalog/brands/${brandId}`, {
       ...fieldToUpdate,
     })
     .then((res: any) => resolve(res.data.data))
     .catch((err:any) => reject(err.response.data));
 });

