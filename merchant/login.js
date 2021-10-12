const { google } = require("googleapis");
// const credentials = require("./service-account.json");
const login = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const auth = new google.auth.GoogleAuth({
        // Scopes can be specified either as an array or as a single, space-delimited string.
        scopes: ["https://www.googleapis.com/auth/content"],
      });

      // Acquire an auth client, and bind it to all future calls
      const authClient = await auth.getClient();
      google.options({ auth: authClient });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = login;
