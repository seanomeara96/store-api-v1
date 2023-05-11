const dotenv = require("dotenv");
dotenv.config();
// Import the package and create a new client
const twilio = require("twilio");
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Set the phone number you want to send the SMS from and the phone number you want to send it to
const from = "+16506403437";
const recipients = ["+353857195619", "+353851066003", "+353851675518"];

// Set the message you want to send
const message = "Hello, this is a bulk test message from Sean@beautyfeatures";

const messages = [];

const promises = recipients.map((to) =>
  client.messages
    .create({
      body: message,
      from: from,
      to: to,
    })
    .then((message) => messages.push(message.sid))
);

Promise.allSettled(promises)
  .then(console.log)
  .then(() => console.log(messages));
