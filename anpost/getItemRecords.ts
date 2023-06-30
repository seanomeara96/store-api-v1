import Client from "ssh2-sftp-client";
import { parseFileContents } from "./parseFileContents";

export async function getItemRecords() {
  let sftp = new Client();

  const config: Client.ConnectOptions = {
    host: process.env.ANPOST_HOST!,
    port: parseInt(process.env.ANPOST_PORT!),
    username: process.env.ANPOST_USER!,
    password: process.env.ANPOST_PASSWORD!,
    algorithms: {
      kex: [
        "diffie-hellman-group14-sha1",
        "diffie-hellman-group-exchange-sha1",
      ],
      serverHostKey: ["ssh-dss"],
    },
  };

  try {
    await sftp.connect(config);
    const files = await sftp.list(".");
    const data = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`file ${i + 1} of ${files.length}`);
      const buffer = await sftp.get(file.name);
      const fileString = buffer.toString("utf-8").trim();
      const { itemRecords } = parseFileContents(fileString);
      data.push(...itemRecords);
    }
    sftp.end();
    return data;
  } catch (err) {
    throw err;
  }
}
