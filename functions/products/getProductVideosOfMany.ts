import { getProductVideos } from "./getProductVideos";
export const getProductVideosOfMany = async (
  productIds: { [key: string]: number }[],
) => {
  try {
    const promises = productIds.map((productId) => {
      const id = Object.values(productId)[0];
      return getProductVideos(id);
    });
    const responses = await Promise.allSettled(promises);
    const fulfilledResponses = responses.filter(
      (response: PromiseSettledResult<any>) => response.status === "fulfilled",
    ) as PromiseFulfilledResult<any>[];
    const productVideos = fulfilledResponses.map(
      (response: PromiseFulfilledResult<any>) => response.value,
    );
    return productVideos;
  } catch (err) {
    throw err;
  }
};
