import { getAllProducts } from "./functions/products/getAllProducts";
import { JSDOM } from "jsdom";
import { parse } from "tldts";
import { updateProduct } from "./functions/products/updateProduct";
const inhealthBlacklistedDomainMap: { [key: string]: string } = {
  "babyaccessories.ie": "pregnancyandbaby.ie",
  "all4baby.ie": "pregnancyandbaby.ie",
  "tonykealys.com": "pregnancyandbaby.ie",
  "bellababy.ie": "pregnancyandbaby.ie",
  "mamasandpapas.ie": "pregnancyandbaby.ie",
  "traleenurserysupplies.com": "pregnancyandbaby.ie",
  "babydocshop.ie": "pregnancyandbaby.ie",
  "babasafe.ie": "babysafety.ie",
  "hickeyspharmacies.ie": "pregnancyandbaby.ie",
  "mambaby.com": "pregnancyandbaby.ie",
  "boots.ie": "pregnancyandbaby.ie",
  "mccabespharmacy.com": "pregnancyandbaby.ie",
  "smythstoys.com": "pregnancyandbaby.ie",
  "motherandbaby.ie": "pregnancyandbaby.ie",
};

function replaceBlacklistedUrls(
  domainMap: { [key: string]: string },
  content: string
) {
  return content.replace(/https?:\/\/([^\/"\s]+)/gi, (match, domain) => {
    const lowerDomain = domain.toLowerCase();
    if (domainMap[lowerDomain]) {
      // Replace the whole URL (domain + path) with just the replacement domain
      const prefix = match.startsWith("https://") ? "https://" : "http://";
      return prefix + domainMap[lowerDomain];
    }
    return match;
  });
}

async function main() {
  try {
    require("./config/config").config("ih");
    const products = await getAllProducts();
    for(let i= 0; i< products.length;i++){
      console.log(i,products.length)
      const p = products[i]
      const wrappedDescription = wrap(p.description);
      const dom = new JSDOM(wrappedDescription);
      const document = dom.window.document;
      const domains = getDomainsFromDocument(document);
      let containsBlackListedDomains = false;
      for (const domain of domains) {
        if (inhealthBlacklistedDomainMap[domain]) {
          containsBlackListedDomains = true;
          break;
        }
      }
      if (containsBlackListedDomains) {
        const updatedContent = replaceBlacklistedDomains(
          document,
          inhealthBlacklistedDomainMap
        );
        await updateProduct(p.id,{description: updatedContent})
      }
    }
  } catch (err) {
    console.log(err);
  }
}
main();

function replaceBlacklistedDomains(
  document: Document,
  domainMap: { [key: string]: string }
): string {
  for (const blacklistedDomain in domainMap) {
    const links = document.querySelectorAll("a");
    for (const link of links) {
      if (link.href.includes(blacklistedDomain)) {
        link.href = "https://" + domainMap[blacklistedDomain];
        if (link.textContent?.includes(blacklistedDomain)) {
          link.textContent = link.textContent.replace(
            blacklistedDomain,
            domainMap[blacklistedDomain]
          );
        }
      }
    }
  }
  return document.body.innerHTML;
}

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


function getDomain(url: string): string {
  try {
    return parse(url).domain || "";
  } catch (e) {
    throw new Error("Invalid URL:", { cause: e });
  }
}
