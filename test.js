require("./config/config");

const { output } = require("./scripts/utils/output");

async function searchList() {
  const toSubscribe = [`lucybondi2016@gmail.com`];

  const axios = require("axios");

  /*type SearchMembersParams = {
    fields?: string[],
    exclude_fields?: string[],
    query?: string,
    list_id?: string,
  }*/
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(
        "bf_sean:" + process.env.MAILCHIMP_API_KEY.replace("-us5", "")
      ).toString("base64"),
  };

  const query = "lucybondi2016@gmail.com";

  const url = `https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/search-members`;

  axios
    .get(url, {
      headers,
      params: {
        query,
        list_id: "a7fba6d981",
      },
    })
    .then((response) => {
      const member = response.data.exact_matches.members[0];
      console.log(member);
      console.log(
        "#####" + JSON.stringify(member.marketing_permissions) + "#####"
      );
      const updateLinkData = member._links.find(
        (link) => link.rel === "update"
      );
      const updateLink = updateLinkData.href;
      const updated_marketing_permissions = structuredClone(
        member.marketing_permissions
      );
      updated_marketing_permissions[0].enabled = true;
      console.log(
        "#####" + JSON.stringify(updated_marketing_permissions) + "#####"
      );
      axios
        .patch(updateLink, {
          user: {
            username: "anystring",
            password: process.env.MAILCHIMP_API_KEY,
          },
          body: {
            status: "subscribed",
            marketing_permissions: updated_marketing_permissions,
          },
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response.data));
    })
    .catch((error) => {
      if (error.response?.data) {
        console.error(error.response.data);
        return;
      }
      console.log(error);
    });
}
searchList();
