/**
 * updates a category. must supply a valid field
 * @param {number} catId
 * @param {object} fieldToUpdate
 * @returns promise
 */
 export const updateBrand = (catId: number, fieldToUpdate: any) =>
 new Promise((resolve, reject) => {
   if (typeof catId !== "number")
     return reject("product id must be a number");

   if (typeof fieldToUpdate !== "object")
     return reject("field to update must be an object");

   require("../../config/config")
     .store.put(`/catalog/categories/${catId}`, {
       ...fieldToUpdate,
     })
     .then((res: any) => resolve(res.data.data))
     .catch((err:any) => reject(err.response.data));
 });

