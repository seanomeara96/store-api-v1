const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const config = {
  fs_xAuthTokenHeader: returnTokenHeader(process.env.FS_XAUTHTOKEN),
  bf_xAuthTokenHeader: returnTokenHeader(process.env.BF_XAUTHTOKEN),
  huk_xAuthTokenHeader: returnTokenHeader(process.env.HUK_XAUTHTOKEN),
  bf: process.env.BF_STORE_HASH,
  bsk: process.env.BSK_STORE_HASH,
  bs: process.env.BS_STORE_HASH,
  ah: process.env.AH_STORE_HASH,
  fs: process.env.FS_STORE_HASH,
  huk: process.env.HUK_STORE_HASH
};
function returnTokenHeader(authToken){
  return { "x-auth-token": authToken }
}
module.exports = config;
