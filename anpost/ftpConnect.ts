import Client from "ftp";

const c = new Client();
c.on("ready", function () {
  c.list(function (err, list) {
    if (err) throw err;
    console.dir(list);
    c.end();
  });
});
// connect to localhost:21 as anonymous
c.connect({
    host: process.env.ANPOST_HOST,
    port: parseInt(process.env.ANPOST_PORT!),
    user: process.env.ANPOST_USER,
    password: process.env.ANPOST_PASSWORD
});
