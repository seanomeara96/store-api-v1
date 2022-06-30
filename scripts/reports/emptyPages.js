const allStores = [
  { initial: "bf", name: "BeautyFeatures" },
  { initial: "bsk", name: "BeautySkincare" },
  /**
   * { initial: "ah", name: "AllHair" },
  { initial: "pb", name: "Pregnancy&Baby" },
  { initial: "ih", name: "InHealth" },
  { initial: "bs", name: "BabySafety" },
  { initial: "huk", name: "Haakaa Uk" },
  { initial: "hie", name: "Haakaa Ireland" },
  { initial: "ds", name: "DogSpace" },
  { initial: "stie", name: "Sleepytot IE" },
  { initial: "beuk", name: "BeautiEdit UK" },
   */
];
const { getAllProducts } = require("../../functions/products/getAllProducts");
const { getAllBrands } = require("../../functions/brands/getAllBrands");
const {
  getAllCategories,
} = require("../../functions/categories/getAllCategories");
const { stringify } = require("csv-stringify");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");

const sgMail = require("@sendgrid/mail");

function getSiteEmptyPages(site) {
  return new Promise(async (resolve, reject) => {
    require("../../config/config").config(site.initial);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const products = await getAllProducts().catch(reject);

    const brands = await getAllBrands().catch(reject);

    const categories = await getAllCategories().catch(reject);

    const issues = [];

    const productIsVisible = (product) =>
      product.inventory_level > 0 && product.is_visible;

    for (const brand of brands) {
      const brandProducts = products.filter(
        (product) => product.brand_id === brand.id
      );

      const visibleProducts = brandProducts.filter(productIsVisible);

      if (!visibleProducts.length) issues.push(brand);
    }

    for (const category of categories) {
      const categoryProducts = products.filter((product) =>
        product.categories.includes(category.id)
      );

      const visibleProducts = categoryProducts.filter(productIsVisible);

      if (!visibleProducts.length && category.is_visible) issues.push(category);
    }

    resolve({
      name: site.name,
      emptyPages: issues.map(
        (page) => getSiteUrl(site.initial) + page.custom_url.url
      ),
    });
  });
}

/**
 *
 * @returns Promise<{
 *  name: string;
 *  emptyPages: string[];
 * }[]>
 */
async function getAllEmptyPages() {
  const emptyPages = [];
  for (const store of allStores) {
    const pages =
      (await getSiteEmptyPages(store).catch(console.log)) || undefined;
    pages && emptyPages.push(pages);
  }
  return emptyPages;
}

function renderEmail(emptyStorePages) {
  return emptyStorePages
    .map(({ name, emptyPages }) => {
      return /*html*/ `
      <div>
        <h2>${name}</h2>
        <ul>
          ${emptyPages
            .map((page) => {
              return /*html*/ `
              <li>
                <a href="${page}">${page}</a>
              </li>
            `;
            })
            .join("")}
        </ul>
      </div>
    `;
    })
    .join("");
}

function convertToCsvCompatibleFormat(emptyStorePages) {
  return emptyStorePages
    .map((store) =>
      store.emptyPages.map((page) => ({
        store: store.name,
        page,
      }))
    )
    .flat();
}

(async function () {
  const emptyPages = await getAllEmptyPages();
  const email = renderEmail(emptyPages);
  stringify(convertToCsvCompatibleFormat(emptyPages), (err, out) => {
    if (err) return;
    const attachment = Buffer.from(out).toString("base64");

    const msg = {
      to: "sean@beautyfeatures.ie",
      from: "sean@beautyfeatures.ie",
      subject: `Empty Categories and Brands Report`,
      text: out,
      html: email,
      attachments: [
        {
          content: attachment,
          filename: "empty-pages.csv",
          type: "text/csv",
          disposition: "attachment",
        },
      ],
    };
    sgMail.send(msg).catch((err) => console.log(err.response.body));
  });
})();
