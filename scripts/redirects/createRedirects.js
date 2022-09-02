const { createRedirect } = require("../../functions/redirects/createRedirect");

require("../../config/config").config("pb");

const oldURLS = [
  "/brands/Daysy.html",
  "/brands/LadyComp.html",
  "/brands/Medela.html",
  "/moby/",
  "/brands/Pelvic-Toner.html",
  "/brands/Pogu.html",
  "/brands/Pre%252dConceive.html",
  "/brands/Respisense.html",
  "/solgar/",
  "/snuggle-me/",
  "/brands/Weleda.html",
];

const newURL = `/brands/`;

(async () => {
  for (const oldURL of oldURLS) {
    await createRedirect(oldURL, newURL).catch((err) => {
      throw new Error("Somethign went wrong");
    });
  }
  console.log("done")
})();
