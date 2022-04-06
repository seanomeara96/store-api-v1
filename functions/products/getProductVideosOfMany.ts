import { getProductVideos } from "./getProductVideos";
export const getProductVideosOfMany = (
  productIds: { [key: string]: number }[]
) =>
  new Promise((resolve, reject) => {
    const promises = productIds.map((productId) => {
      const id = Object.values(productId)[0];
      return getProductVideos(id);
    });
    Promise.allSettled(promises)
      .then((responses) => {
        const fulfilledResponses = responses.filter(
          (response: PromiseSettledResult<any>) =>
            response.status === "fulfilled"
        ) as PromiseFulfilledResult<any>[];
        const productVideos = fulfilledResponses.map(
          (response: PromiseFulfilledResult<any>) => response.value
        );
        resolve(productVideos);
      })
      .catch((err) => reject(err));
  });
