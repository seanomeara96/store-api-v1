const { stringify } = require("csv-stringify");
const {
  getAllProductImages,
} = require("../../functions/images/getAllProductImages");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const { allStores } = require("../../scripts/vars/allStores");

(async () => {
  const out = [];
  for (const x of allStores) {
    const store = x.initial;
    require("../../config/config").config(store);
    const products = await getAllProducts().catch(console.log);
    if (!products) continue;
    const batches = [];
    const batch_size = 100;
    for (let i = 0; i < products.length; i += batch_size) {
      batches.push(products.slice(i, i + batch_size));
    }

    for (const batch of batches) {
      const promises = batch.map((product) =>
        getAllProductImages(product.id).then(
          (res) => (product.images = res.images)
        )
      );
      await Promise.all(promises);
      console.log(
        `batch ${batches.indexOf(batch) + 1} / ${batches.length} complete`
      );
    }
    const needsContentIsInstockAndNotLive = (p) =>
      (p.description === "" || !p.images.length) &&
      !p.is_visble &&
      p.inventory_level > 0;

    const spreadsheetFormat = (p) => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      needs_content: description.length ? "false" : "true",
      needs_images: images.length ? "false" : "true",
      inventory_level: p.inventory_level,
    });

    

    const relevantProducts = products.filter(needsContentIsInstockAndNotLive);

    console.log(relevantProducts);
    
    const outputData = relevantProducts.map(spreadsheetFormat);

    out.push(outputData);
  }
  return;
  stringify({ header: true }, out.flat(), (err, csv) => {
    if (err) throw new Error(err);
    const attachment = Buffer.from(csv).toString("base64");
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const subj = `New Product Images & Content Report`;
    const msg = {
      to: ["sean@beautyfeatures.ie", "john@beautyfeatures.ie"],
      from: "sean@beautyfeatures.ie",
      subject: subj,
      text: subj,
      attachments: [
        {
          content: attachment,
          filename: `product-content-images.csv`,
          type: "text/csv",
          disposition: "attachment",
        },
      ],
    };
    function logErrResponseBody(err) {
      return console.log(err.response.body);
    }
    sgMail.send(msg).catch(logErrResponseBody);
  });
})();
