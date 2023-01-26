require("./config/config");
import { getMailchimpListMembers } from "./mailchimp/getMailchimpListMembers";

getMailchimpListMembers().then(console.log)