import { NewImageParams } from "../products/createProduct";
import FormData from "form-data"
/**
 * copied to client.ts
 * @param product_id 
 * @param params 
 * @returns 
 */
export function createProductImage(
  product_id: number,
  params: NewImageParams
): Promise<undefined> {
  return new Promise(async function (resolve, reject) {
    try {
      await require("../../config/config").store.post(
        `/catalog/products/${product_id}/images`,
        params
      );
      resolve(undefined);
    } catch (err) {
      reject(err);
    }
  });
}


/*example 

        import FormData = require("form-data");
        const formData = new FormData();
        formData.append(
                  "image_file", 
                  fs.createReadStream(imagePaths[j]), 
                  `beautyfeatures brush lifestyle image ${j+1}`
                );
        formData.append('is_thumbnail', 'true')
        formData.append('sort_order', '0')

        await createProductImageFromFile(product.id, formData);
        
*/
export function createProductImageFromFile(
  product_id: number,
  formData: FormData
): Promise<undefined> {
  return new Promise(async function (resolve, reject) {
    try {
      await require("../../config/config").store.post(
        `/catalog/products/${product_id}/images`,
        formData,{
          headers: formData.getHeaders()
        }
      );
      resolve(undefined);
    } catch (err) {
      reject(err);
    }
  });
}
