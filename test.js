const api = require("./config/config");
api.config("ih",2);
const { getAll } = require("./utils/getAll");
const fs = require("fs")
const getAllCoupons = getAll("/coupons");

getAllCoupons()
  .then((res) => {
      console.log(res.length)
      let noExpires = res.filter(({expires, enabled}) => expires === "" && enabled === true)
      console.log(noExpires)
      console.log(noExpires.length)
      fs.writeFile("./output.txt", noExpires.map(coupon => `${coupon.name}\t${coupon.num_uses}\t${coupon.date_created}`).join("\n"), {} ,(err) => {
          if(err) console.log(err);
          console.log("done")
      })
  })
  .catch((err) => console.log(err));
