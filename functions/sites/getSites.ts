export function getSites() {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("./config/config").store.get("/sites");
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}

function getXSiteId(siteUrl: string) {
  return async function () {
    try {
      const sites = (await getSites()) as any[];
      const id = sites.find(function (site: any) {
        return site.url === siteUrl;
      })?.id;
      if (id) {
        return id;
      }
      throw new Error("no id");
    } catch (err) {
      throw err;
    }
  };
}

export const getBeautyFeaturesId = getXSiteId("https://www.beautyfeatures.ie");

export const getInhealthId = getXSiteId("https://www.inhealth.ie");
