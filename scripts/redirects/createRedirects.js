const { createRedirect } = require("../../functions/redirects/createRedirect");

require("../../config/config").config("ds");

const oldURLS = [
  '/babydan/',
  '/dreambaby/',
  '/scandinavian-pet-design/',
  '/safetots/',
  '/kidkusion/',
  '/fred/',
  '/bettacare/'
];

const newURL = `/`;

(async () => {
  for (const oldURL of oldURLS) {
    await createRedirect(oldURL, "https://www.babysafety.ie"+oldURL).catch((err) => {
      throw new Error("Somethign went wrong");
    });
  }
  console.log("done")
})();
