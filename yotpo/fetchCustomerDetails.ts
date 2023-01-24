const axios = require("axios");

export function fetchCustomerDetails(
  customer_email: string,
  defaultParams = {
    country_iso_code: null,
    with_referral_code: false,
    with_history: true,
  }
) {
  return new Promise(async function (resolve, reject) {
    try {
      const options = {
        headers: {
          accept: "application/json",
          "x-api-key": process.env.YOTPO_API_KEY,
          "x-guid": process.env.YOTPO_GUID,
        },
      };

      const res = await axios.get(
        "https://loyalty.yotpo.com/api/v2/customers",
        {
          params: {
            customer_email: customer_email,
            ...defaultParams,
          },
          headers: options.headers,
        }
      );
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
}
