import axios from "axios";
import { getMailchimpList } from "./getMailchimpList";
import { listId } from "./vars";
import { Member } from "./Member";
const dParams = {
  fields: [],
  exclude_fields: [],
  count: 1000,
  offset: 0,
  email_type: "",
  status: "",
  since_timestamp_opt: "",
  before_timestamp_opt: "",
  since_last_changed: "",
  before_last_changed: "",
  unique_email_id: "",
  vip_only: false,
  interest_category_id: "",
  interest_ids: "",
  interest_match: "all",
  sort_field: "",
  sort_dir: "",
  since_last_campaign: false,
  unsubscribed_since: "",
};

export function getMailchimpListMembers(
  defaultParams = dParams
): Promise<Member[]> {
  return new Promise(async function (resolve, reject) {
    try {
      const members: Member[] = [];
      const ListData = await getMailchimpList();
      const memberCount = ListData.stats.member_count;
      const offsetLimit = Math.ceil(memberCount / 1000);
      for (let i = 0; i < offsetLimit; i++) {
        console.clear();
        console.log("members length", members.length);
        console.log("fetching page ", i + 1);
        const res = await axios.get(
          `https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists/${listId}/members`,
          {
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(
                  "anystring:" + process.env.MAILCHIMP_API_KEY
                ).toString("base64"),
            },
            params: { count: defaultParams.count, offset: i },
          }
        );
        console.clear();
        const fetchedMembers = res.data.members;
        members.push(...fetchedMembers);
        resolve(members);
      }
    } catch (err) {
      reject(err);
    }
  });
}
