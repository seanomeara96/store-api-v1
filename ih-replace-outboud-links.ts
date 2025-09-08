import { getAllProducts } from "./functions/products/getAllProducts";
import { JSDOM } from "jsdom";
import { parse } from "tldts";
import { updateProduct } from "./functions/products/updateProduct";

function checkIsLinkInternal(href: string, shopDomain: string): boolean {
  return (
    href.includes("%%GLOBAL_ShopPathSSL%%") ||
    href.toLowerCase().includes(shopDomain.toLowerCase())
  );
}

async function main() {
  try {
    require("./config/config").config("ih");
    const products = await getAllProducts();
    products.reverse();
    for (let i = 0; i < products.length; i++) {
      console.log(i, products.length);
      const p = products[i];
      const wrappedDescription = wrap(p.description);
      const dom = new JSDOM(wrappedDescription);
      const document = dom.window.document;

      const anchors = document.querySelectorAll("a");
      let toUpdate = false;
      for (const anchor of anchors) {
        const isNotInternalLink = !checkIsLinkInternal(
          anchor.href,
          "inhealth.ie"
        );
        if (isNotInternalLink && anchor.href.includes("utm_source=openai")) {
          const fragment = document
            .createRange()
            .createContextualFragment(anchor.innerHTML);
          anchor.replaceWith(fragment);
          toUpdate = true;
        }
      }

      if (toUpdate) {
        await updateProduct(p.id, {
          description: document.body.innerHTML.replace(
            /\(([^)\s]+(\.[^)\s]+)+[^\s)]*)\)/g,
            ""
          ),
        });
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
