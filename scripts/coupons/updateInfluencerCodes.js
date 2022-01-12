const { getAllCoupons } = require("./functions/coupons/getAllCoupons");
const { updateCoupon } = require("./functions/coupons/updateCoupon");

require("./config/config").config("bf", 2);

async function updateInfluencerCodes() {
  const coupon = await getAllCoupons().catch(console.log);

  const influencers = [
    "ALLY",
    "ALI",
    "CHARLEEN",
    "GRACEY",
    "IZZY",
    "KARLA",
    "KATIE",
    "LAURA",
    "LAURAMUA",
    "LISA",
    "MARK",
    "PAMELA",
    "SALLYBF",
    "SUSAN",
    "TARA",
  ];

  const lowerCaseInfluencers = influencers.map((i) => i.toLowerCase());

  const toUpdate = coupon.filter((coupon) =>
    lowerCaseInfluencers.includes(coupon.code.toLowerCase())
  );

  const responses = await Promise.allSettled(
    toUpdate.map(({ id }) =>
      updateCoupon(id, { expires: "Fri, 30 Dec 2022 23:00:00 +0000" })
    )
  ).catch(console.log);

  console.log(responses)
}

updateInfluencerCodes();