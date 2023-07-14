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
  return function () {
    return new Promise(async (resolve, reject) => {
      try {
        const sites = (await getSites()) as any[];
        const id = sites.find((site: any) => site.url === siteUrl)?.id;
        if (id) {
          resolve(id);
          return;
        }
        reject("no id");
      } catch (err) {
        reject(err);
      }
    });
  };
}

export const getBeautyFeaturesId = getXSiteId("https://www.beautyfeatures.ie");

export const getInhealthId = getXSiteId("https://www.inhealth.ie");
