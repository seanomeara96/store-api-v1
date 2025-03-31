export interface CustomField {
  id: number;
  name: string;
  value: string;
}

export interface NewCustomField {
  name: string;
  value: string;
}

/**
 * gets filters of a product by id
 * @param {number} productId
 * @returns
 */
export function getCustomFields(productId: number): Promise<CustomField[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await require("../../config/config").store.get(
        `/catalog/products/${productId}/custom-fields`
      );
      resolve(response.data.data);
    } catch (err) {
      reject(err);
    }
  });
}
