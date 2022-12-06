export function getCategory(category_id: number) {
  return new Promise((resolve, reject) => {
    if (typeof category_id !== "number") return reject("supply a number");
    require("../../config/config")
      .store.get(`/catalog/categories/${category_id}`)
      .then((response: any) => resolve(response.data.data))
      .catch((err: any) => reject(err.response));
  });
}
