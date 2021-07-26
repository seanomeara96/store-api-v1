<<<<<<< HEAD
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
=======
const axios = require("axios")

axios.get("https://www.beautyfeatures.ie/fitflop-superchelsea-suede-boots-with-studs/").then(res => console.log("res", res)).catch(err => console.log("err"))

>>>>>>> 5e8b176faf432e55635951e3d507eb9522c071d3
