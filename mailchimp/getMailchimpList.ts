import axios from "axios";
import { List } from "./List";
import { listId } from "./vars";

export async function getMailchimpList(
  defaultParams = {
    fields: [],
    exclude_fields: [],
    include_total_contacts: true,
  },
): Promise<List> {
  try {
    const response = await axios.get(
      `https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists/${listId}`,
      {
        params: defaultParams,
        headers: {
          Authorization:
            "Basic " +
            Buffer.from("anystring:" + process.env.MAILCHIMP_API_KEY).toString(
              "base64",
            ),
        },
      },
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}
