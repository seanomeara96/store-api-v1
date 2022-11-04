/**
 *
 * @param {string} sku
 * @returns product object
 */
 export const getProductBySKU = (sku: string) =>
 new Promise((resolve, reject) =>
   require("../../config/config")
     .store.get(`/catalog/products/`,{
        params: {
            sku
        }
     })
     .then((response: any) => resolve(response.data.data))
     .catch((ex: any) => reject(ex.response))
 );
