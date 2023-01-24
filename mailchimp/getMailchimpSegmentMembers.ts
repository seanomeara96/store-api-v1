import axios from "axios";
import { getMailchimpSegment } from "./getMailchimpSegment";
import { listId } from "./vars";

export function getMailchimpSegmentMembers(
  segmentId: number,
  defaultParams = {
    fields: [],
    excludeFields: [],
    count: 1000,
    offset: 0,
    includeCleaned: true,
    includeTransactional: true,
    includeUnsubscribed: true,
  }
) {
  return new Promise(async function (resolve, reject) {
    try {
      const members:any[] = [];
      const segment: any = await getMailchimpSegment(segmentId);
      const memberCount = segment.member_count;
      const offsetLimit = Math.ceil(memberCount / 1000);
      const url = `https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists/${listId}/segments/${segmentId}/members`;
      for (let i = 0; i < offsetLimit; i++) {
        const res = await axios.get(url, {
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(
                "anystring:" + process.env.MAILCHIMP_API_KEY
              ).toString("base64"),
          },
          params: { ...defaultParams, offset: i },
        });
        const members = res.data.members
        members.push(members)
      }
      resolve(members)
    } catch (err) {
      reject(err);
    }
  });
}
