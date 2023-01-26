require("./config/config");
import { getMailchimpSegmentMembers } from "./mailchimp/getMailchimpSegmentMembers";
import { fetchCustomerDetails } from "./yotpo/fetchCustomerDetails";
import {simplePrint} from "./scripts/utils/simplePrint"
(async () => {
  try {
    const members = await getMailchimpSegmentMembers(203);
    const memberdetails = []
    for (const m of members) {
      const res = await fetchCustomerDetails(m.email_address);
      memberdetails.push(res)
      console.clear()
      console.log(res)
    }
    simplePrint(JSON.stringify(memberdetails))
  } catch (err) {
    console.log(err);
  }
})();
