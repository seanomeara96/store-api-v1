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
export async function getCustomFields(
  productId: number,
): Promise<CustomField[]> {
  try {
    const response = await require("../../config/config").store.get(
      `/catalog/products/${productId}/custom-fields`,
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
}
