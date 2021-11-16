const getSites = () =>
  new Promise((resolve, reject) => {
    require("./config/config")
      .store.get("/sites")
      .then(({ data }) => resolve(data.data))
      .catch(reject);
  });
exports.getSites = getSites;
const getXSiteId = (siteUrl) => () =>
  new Promise(async (resolve, reject) => {
    let sites;
    try {
      sites = await getSites();
    } catch (err) {
      return reject(err);
    }
    return resolve(sites.find(({ url }) => url === siteUrl).id);
  });

const getBeautyFeaturesId = getXSiteId("https://www.beautyfeatures.ie");
exports.getBeautyFeaturesId = getBeautyFeaturesId;
const getInhealthId = getXSiteId("https://www.inhealth.ie");
exports.getInhealthId = getInhealthId;
