import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") })
export function credentials(initials: string){
    return {
        storeHash: process.env[`${initials.toLocaleUpperCase()}_STORE_HASH`] || "",
        accessToken: process.env[`${initials.toLocaleUpperCase()}_XAUTHTOKEN`] || "",
      }
}