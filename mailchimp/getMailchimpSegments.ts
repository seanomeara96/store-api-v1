import axios from "axios";
import { listId } from "./vars";

export function getMailchimpSegments() {
  return new Promise(async function (resolve, reject) {
    try {
      const url = `https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists/${listId}/segments?count=100`;
      const response = await axios.get(url, {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from("anystring:" + process.env.MAILCHIMP_API_KEY).toString(
              "base64"
            ),
        },
      });
      const { segments } = response.data;
      console.log(segments.length);
      console.log(Object.keys(segments[0]));
      const str = segments.map((s: any) => {
        delete s._links;
        delete s.options;
        return s;
      });
      resolve(str);
    } catch (err) {
      reject(err);
    }
  });
}
