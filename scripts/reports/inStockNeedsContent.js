const { stringify } = require("csv-stringify");
const {
  getAllProductImages,
} = require("../../functions/images/getAllProductImages");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const { allStores } = require("../../scripts/vars/allStores");

(async () => {
  const out = [];
  for (const store of allStores) {
    require("../../config/config").config(store);
    const products = await getAllProducts();
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

    out.push(
      products
        .filter(
          (p) =>
            (p.description === "" || !p.images.length) &&
            !p.is_visble &&
            p.inventory_level > 0
        )
        .map(({ id, name, sku, description, images, inventory_level }) => ({
          id,
          name,
          sku,
          needs_content: description.length ? "true" : "false",
          needs_images: images.length ? "true" : "false",
          inventory_level,
        }))
    );
  }

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
