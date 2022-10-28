(async () => {
  const axios = require("axios");
  const dotenv = require("dotenv");
  dotenv.config();
  const DATACENTER = process.env.BP_DATACENTER;
  const ACCOUNT = process.env.BP_ACCOUNT;
  const IDSET = "0-199";

  let sumThis = [];

  let count = 0;

  for (let i = 0; i < 7500; i += 500) {
    const e = await axios
      .get(
        `https://${DATACENTER}.brightpearlconnect.com/public-api/${ACCOUNT}` +
          `/product-service/product-search`,
        {
          headers: {
            "brightpearl-app-ref": process.env.BP_APP_REF,
            "brightpearl-staff-token": process.env.BP_STAFF_TOKEN,
          },
          params: {
            productId: `${i}-${i + 500}`,
          },
        }
      )
      .catch((err) => console.log(err));
      //console.log("i", i)
    count += e.data.response.results.length;
    //console.log(count)
    sumThis.push(...e.data.response.results);
  }
  const barcodes = sumThis.map(i => i[3]);
  console.log(barcodes.length)
  console.log("final sum", barcodes.includes('3598381955905'));
})();
