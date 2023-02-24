import axios from "axios";
import { getMailchimpList } from "./getMailchimpList";
import { listId } from "./vars";
import { Member } from "./Member";
type EmailQueryParams = {
  fields?: string[],
  exclude_fields?: string[],
  count?: number,
  offset?: number,
  email_type?: string,
  status?: string,
  since_timestamp_opt?: string,
  before_timestamp_opt?: string,
  since_last_changed?: string,
  before_last_changed?: string,
  unique_email_id?: string,
  vip_only?: boolean,
  interest_category_id?: string,
  interest_ids?: string,
  interest_match?: string,
  sort_field?: string,
  sort_dir?: string,
  since_last_campaign?: boolean,
  unsubscribed_since?: string,
}


export function getMailchimpListMembers(customParams: EmailQueryParams): Promise<Member[]> {
  return new Promise(async function (resolve, reject) {
    try {
      const members: Member[] = [];
      const ListData = await getMailchimpList();
      const memberCount = ListData.stats.member_count;
      console.log(`there are ${memberCount} members in this list`);
      const offsetLimit = Math.ceil(memberCount / 1000);
      for (let i = 0; i < offsetLimit; i++) {
        const rParams: EmailQueryParams = {
          count: 1000,
          offset: i,
          ...customParams,
        };
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
            params: rParams,
          }
        );
        console.clear();
        const fetchedMembers = res.data.members;
        members.push(...fetchedMembers);
      }
      resolve(members);
    } catch (err) {
      return reject(err);
    }
  });
}
