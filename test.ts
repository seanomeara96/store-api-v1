import axios from "axios";
import { JSDOM } from "jsdom";
async function test() {
  try {
    const res = await axios.get(
      "https://www.anpost.com/Commerce/Track/History?item=CE182530708IE"
    );
    const { document } = new JSDOM(res.data).window;
    console.log(document.querySelector("body")?.textContent)


  } catch (err) {
    console.log(err);
  }
}
test();
