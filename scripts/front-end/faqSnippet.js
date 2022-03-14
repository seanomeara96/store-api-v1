const productContent = document.querySelector(
  ".productView-description-tabContent"
).textContent;
const productTitle = document
  .querySelector(".productView-title")
  .textContent.trim();
const obj = (items) =>
  `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${items.join(
    ",\n"
  )}]}`;
if (productContent.toLowerCase().includes("faq")) {
  const questions = productContent.match(/Q:\s(.|\n)*?\?/g);
  const answers = productContent.match(/A:\s(.|\n)*?\n/g);
  const items = [];
  for (let i = 0; i < questions.length; i++) {
    items.push(
      `{"@type":"Question","name": "${questions[i]
        .substring(3)
        .trim()}","acceptedAnswer":{"@type":"Answer","text": "${answers[i]
        .substring(3)
        .trim()}"}}`
    );
  }
  document
    .querySelector("head")
    .insertAdjacentHTML(
      "beforeend",
      `<script type="application/ld+json">${obj(items)}</script>`
    );
}
