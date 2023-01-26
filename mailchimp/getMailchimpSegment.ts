import axios from "axios";
import { listId } from "./vars";

export function getMailchimpSegment(
  segmentId: number,
  defaultParams = {
    fields: [],
    excludeFields: [],
    includeCleaned: true,
    includeTransactional: true,
    includeUnsubscribed: true,
  }
): Promise<Segment.RootObject> {
  return new Promise(async function (resolve, reject) {
    try {
      const url = `https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists/${listId}/segments/${segmentId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from("anystring:" + process.env.MAILCHIMP_API_KEY).toString(
              "base64"
            ),
        },
        params: defaultParams,
      });
      const data = response.data;
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
