const puppeteer = require("puppeteer");
const { URL } = require("url");
import axios from "axios";
import { output } from "../utils/output";
import path from "path";
import fs from "fs";

const urls = [
  "https://beautyfeatures.ie",
  "https://inhealth.ie",
  "https://beautyskincare.ie",
  "https://allhair.ie",
  "https://pregnancyandbaby.ie",
  "https://babysafety.ie",
  "https://pixieloves.ie",
  "https://sleepytot.ie",
];

async function test() {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${urls[1]}`
    );
    fs.writeFileSync(
      path.resolve(__dirname, "res.json"),
      JSON.stringify(res.data),
      { encoding: "utf-8" }
    );
  } catch (err) {
    console.log(err);
  }
}

test();
