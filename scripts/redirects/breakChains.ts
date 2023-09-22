import { createRedirect } from "../../functions/redirects/createRedirect";
import { deleteRedirect } from "../../functions/redirects/deleteRedirect";
import { getAllRedirects } from "../../functions/redirects/getAllRedirects";

require("../../config/config").config("ds");

async function main() {
  const redirects = await getAllRedirects();

  const urlRedirects = redirects.filter(
    (redirect) => redirect.to.type == "url"
  );

  for (const redirect of urlRedirects) {
    for (const otherRedirect of urlRedirects) {
      if (redirect.to.url === otherRedirect.from_path) {
        try {
          console.log(
            `old: ${redirect.from_path} => ${redirect.to.url} => ${otherRedirect.from_path} => ${otherRedirect.to.url}`
          );
          await deleteRedirect(redirect.id);
          console.log(`new: ${redirect.from_path} => ${otherRedirect.to.url}`);
          await createRedirect(redirect.from_path, otherRedirect.to.url);
        } catch (err: any) {
          console.log(err.response.statusText);
          continue;
        }
      }
    }
  }
}

main();
