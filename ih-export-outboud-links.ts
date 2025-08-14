import { Database } from "sqlite3";
import { getAllProducts } from "./functions/products/getAllProducts";
import { JSDOM } from "jsdom";
import express from "express";
import fs from "fs";
import path from "path";
import { parse } from "tldts";
import { output } from "./scripts/utils/output";

async function main() {
  try {
    require("./config/config").config("ih");
    const outBoundDomains: { [key: string]: number[] } = {};
    const products = await getAllProducts();
    products.forEach((p) => {
      const wrappedDescription = wrap(p.description);
      const dom = new JSDOM(wrappedDescription);
      const document = dom.window.document;
      const domains = getDomainsFromDocument(document);
      domains.forEach((domain) => {
        if (!outBoundDomains[domain]) outBoundDomains[domain] = [];
        outBoundDomains[domain].push(p.id);
      });
    });
    console.log();
    const outputData: { [key: string]: number } = {};
    const domains = Object.keys(outBoundDomains);
    for (const domain of domains) {
      outputData[domain] = outBoundDomains[domain].length;
    }
    console.log(`found ${domains.length} outbound domains`);
    await output(
      path.resolve(__dirname, "inhealth-outbound-domains.csv"),
      [outputData],
      true
    );
    for (const domain of domains) {
      console.log(domain, outBoundDomains[domain].length);
    }
  } catch (err) {
    console.log(err);
  }
}
main();

function getDomainsFromDocument(document: Document) {
  return Array.from(document.querySelectorAll("a"))
    .map((a) => a.href)
    .filter((url) => !url.includes("%%GLOBAL_ShopPathSSL%%"))
    .map((url) => getDomain(url));
}

function wrap(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    ${content}
</body>
</html>`;
}
function removeUTMParams(url: string) {
  try {
    const parsedUrl = new URL(url);
    const params = parsedUrl.searchParams;

    // Delete all parameters that start with "utm_"
    [...params.keys()].forEach((key) => {
      if (key.toLowerCase().startsWith("utm_")) {
        params.delete(key);
      }
    });

    // Rebuild and return the cleaned URL
    return (
      parsedUrl.origin +
      parsedUrl.pathname +
      (params.toString() ? "?" + params.toString() : "") +
      parsedUrl.hash
    );
  } catch (e) {
    console.error("Invalid URL:", e);
    return url;
  }
}

function getDomain(url: string): string {
  try {
    return parse(url).domain || "";
  } catch (e) {
    throw new Error("Invalid URL:", { cause: e });
  }
}
