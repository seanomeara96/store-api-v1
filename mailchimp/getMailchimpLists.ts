import axios from "axios";

export function getMailchimpLists() {
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
      const { lists } = response.data;
      console.log(Object.keys(lists[0]));
      const str = lists.map((list: any) => ({ id: list.id, name: list.name }));
      resolve(str);
    } catch (err) {
      reject(err);
    }
  });
}
