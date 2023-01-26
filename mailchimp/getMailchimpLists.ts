import axios from "axios";
import { List } from "./List";



export function getMailchimpLists():Promise<List[]> {
  return new Promise(async function (resolve, reject) {
    try {
      const url = `https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists`;
      const response = await axios.get(url, {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from("anystring:" + process.env.MAILCHIMP_API_KEY).toString(
              "base64"
            ),
        },
      });
      const lists: List[] = response.data.lists;
      console.log(Object.keys(lists[0]));
      resolve(lists);
    } catch (err) {
      reject(err);
    }
  });
}
