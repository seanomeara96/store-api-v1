function isUrlInvalid(url: string) {
  return !url || typeof url !== "string";
}

const requestBody = (
  reject: (x: unknown) => void,
  oldUrl: string,
  newUrl: string,
  type = "url"
) => {
  const allowedValues = ["product", "brand", "category", "page", "post", "url"];

  if (isUrlInvalid(oldUrl) || isUrlInvalid(newUrl)) {
    return reject("check urls");
  }

  if (!allowedValues.includes(type)) {
    return reject("please provide a valid type");
  }

  return [
    {
      from_path: oldUrl,
      site_id: 1000, // appears this is the default number to use
      to: {
        type: type,
        entity_id: null, // null if url, must provide brand / category id otherwise
        url: newUrl,
      },
    },
  ];
};

export const updateRedirect = (fromPath: string, toPath: string) =>
  new Promise((resolve, reject) => {
    require("../../config/config")
      .store.put("/storefront/redirects", requestBody(reject, fromPath, toPath))
      .then((res: any) => {
        if (res.status === 200 || res.status === 201) {
          resolve(res.status);
        } else {
          reject(res.status);
        }
      })
      .catch(reject);
  });


