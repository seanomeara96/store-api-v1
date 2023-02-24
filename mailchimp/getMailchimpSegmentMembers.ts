import axios from "axios";
import { getMailchimpSegment } from "./getMailchimpSegment";
import { Member } from "./Member";
import { listId } from "./vars";

type EmailListParams = {
  fields?: string[];
  excludeFields?: string[];
  count?: number;
  offset?: number;
  includeCleaned?: boolean;
  includeTransactional?: boolean;
  includeUnsubscribed?: boolean;
};

export function getMailchimpSegmentMembers(
  segmentId: number,
  customParams: EmailListParams
): Promise<Member[]> {
  return new Promise(async function (resolve, reject) {
    try {
      const members: any[] = [];
      const segment: any = await getMailchimpSegment(segmentId);
      const memberCount = segment.member_count;
      const offsetLimit = Math.ceil(memberCount / 1000);
      const url = `https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists/${listId}/segments/${segmentId}/members`;
      for (let i = 0; i < offsetLimit; i++) {
        console.clear();
        console.log("members length", members.length);
        console.log("fetching page ", i + 1);
        const res = await axios.get(url, {
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(
                "anystring:" + process.env.MAILCHIMP_API_KEY
              ).toString("base64"),
          },
          params: {
            count: 1000,
            offset: i,
            includeCleaned: true,
            includeTransactional: true,
            includeUnsubscribed: true,
            ...customParams,
          },
        });
        const data = res.data.members;
        members.push(...data);
      }
      console.clear();
      resolve(members);
    } catch (err) {
      reject(err);
    }
  });
}
