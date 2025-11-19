function isUrlInvalid(url: string) {
  return !url || typeof url !== "string";
}

function requestBody(
  reject: (x: unknown) => void,
  oldUrl: string,
  newUrl: string,
  type = "url",
) {
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
}

export async function updateRedirect(fromPath: string, toPath: string) {
  try {
    const config = require("../../config/config");
    const res = await config.store.put(
      "/storefront/redirects",
      requestBody(Promise.reject, fromPath, toPath),
    );
    if (res.status === 200 || res.status === 201) {
      return res.status;
    } else {
      throw new Error(String(res.status));
    }
  } catch (error) {
    throw error;
  }
}
