require("./config/config");
const { getMailchimpSegment } = require("./mailchimp/getMailchimpSegment");
const { getMailchimpSegmentMembers } = require("./mailchimp/getMailchimpSegmentMembers");
const { getMailchimpSegments } = require("./mailchimp/getMailchimpSegments");

getMailchimpSegment(203).then(JSON.stringify).then(console.log)

return


getMailchimpSegmentMembers(203).then(console.log)