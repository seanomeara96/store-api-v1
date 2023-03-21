export function deleteRedirect(id: number) {
  return new Promise(function (resolve, reject) {
    
    require("../../config/config")
      .store.delete(`/storefront/redirects`, {
        params: {
          "id:in": id,
          site_id: 1000,
        },
      })
      .then((res: any) => resolve(res.data.data))
      .catch((err: any) => reject(err.response.data));
  });
}
