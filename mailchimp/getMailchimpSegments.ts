import axios from "axios";
import { listId } from "./vars";

export async function getMailchimpSegments(): Promise<Segment.RootObject[]> {
  try {
    const url = `https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists/${listId}/segments?count=100`;
    const response = await axios.get(url, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from("anystring:" + process.env.MAILCHIMP_API_KEY).toString(
            "base64",
          ),
      },
    });
    const segments: Segment.RootObject[] = response.data.segments;
    console.log(segments.length);
    console.log(Object.keys(segments[0]));
    return segments;
  } catch (err) {
    throw err;
  }
}
