const { getMailchimpSegmentMembers } = require("./mailchimp/getMailchimpSegmentMembers");


require("./config/config");

getMailchimpSegmentMembers(219).then(console.log)