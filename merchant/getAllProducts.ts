import { google } from "googleapis";
const content = google.content("v2.1");

export function getAllProducts(merchantId: string) {
  return new Promise(async function (resolve, reject) {
    try {
      let nextPageToken: string | null | undefined;
      const products = [];
      while (true) {
        const res = await content.products.list({
          // The maximum number of products to return in the response, used for paging.
          maxResults: 250,
          // The ID of the account that contains the products. This account cannot be a multi-client account.
          merchantId,
          // The token returned by the previous request.
          pageToken: nextPageToken ? nextPageToken : undefined,
        });

        nextPageToken = res.data.nextPageToken;

        if (res.data.resources) {
          products.push(...res.data.resources);

          if (res.data.resources.length !== 250) {
            resolve(products);
            return;
          }
        }
      }
    } catch (err) {
      reject(err);
    }
  });
}
