const { getAllCoupons } = require("../functions/coupons/getAllCoupons");
const { updateCoupon } = require("../functions/coupons/updateCoupon");

require("../config/config").config("bf", 2);
async function applyCouponRestriction() {
  /**
   * const coupons = await getAllCoupons().catch((err) => {
    throw new Error(err);
  });
   */
  let applies_to = {
    entity: "categories",
    ids: [
      11, 12, 13, 15, 16, 20, 276, 409, 410, 411, 412, 413, 414, 419, 423, 425,
      426, 456, 458, 459, 460, 507, 510, 514, 515, 517, 518, 519, 528, 530, 536,
      562, 563, 583, 584, 587, 589, 590, 591, 592, 593, 595, 596, 597, 598, 599,
      606, 607, 608, 612, 614, 618, 621, 622, 623, 624, 625, 626, 627, 638,
    ],
  };
  let influencerCodes = [
    { "Influencer Codes": 22573 },
    { "Influencer Codes": 20349 },
    { "Influencer Codes": 20715 },
    { "Influencer Codes": 10436 },
    { "Influencer Codes": 17965 },
    { "Influencer Codes": 17859 },
    { "Influencer Codes": 19133 },
    { "Influencer Codes": 18032 },
    { "Influencer Codes": 16204 },
    { "Influencer Codes": 16714 },
    { "Influencer Codes": 15992 },
    { "Influencer Codes": 15876 },
    { "Influencer Codes": 18936 },
    { "Influencer Codes": 15814 },
    { "Influencer Codes": 22044 },
    { "Influencer Codes": 18254 },
    { "Influencer Codes": 20541 },
    { "Influencer Codes": 15875 },
    { "Influencer Codes": 17990 },
    { "Influencer Codes": 15755 },
    { "Influencer Codes": 22916 },
    { "Influencer Codes": 15815 },
    { "Influencer Codes": 15355 },
    { "Influencer Codes": 16307 },
    { "Influencer Codes": 18286 },
    { "Influencer Codes": 22054 },
    { "Influencer Codes": 18196 },
    { "Influencer Codes": 15414 },
    { "Influencer Codes": 19207 },
    { "Influencer Codes": 19116 },
    { "Influencer Codes": 20776 },
  ];

  const res = await Promise.allSettled(
    influencerCodes.map((code) =>
      updateCoupon(code["Influencer Codes"], { applies_to }).catch((err) => {
        throw new Error(err);
      })
    )
  ).catch((err) => {
    throw new Error(err);
  });
  console.log("updated", res);
}
applyCouponRestriction();
