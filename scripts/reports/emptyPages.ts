import { allStores, Store } from "../vars/allStores";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getAllBrands } from "../../functions/brands/getAllBrands";
import { getAllCategories } from "../../functions/categories/getAllCategories";
import { stringify } from "csv-stringify";
import { getSiteUrl } from "../../functions/utils/getSiteUrl";
import { getAllRedirects } from "../../functions/redirects/getAllRedirects";
import { Product } from "../../functions/products/Product";
import sgMail from "@sendgrid/mail";


function removeRedirectedUrls(pages: any[], redirectFromPaths: string[]) {
  return pages.filter(
    (page) => !redirectFromPaths.includes(page.custom_url.url)
  );
}

function addDomainToSlugs(pags: any[], site: Store) {
  return pags.map((page) => {
    const url = getSiteUrl(site.initial) + page.custom_url.url;
    page.url = url;
    return page;
  });
}

function getSiteEmptyPages(site: Store): Promise<{
  name: string;
  emptyPages: any[];
}> {
  return new Promise(async (resolve, reject) => {
    try {
      require("../../config/config").config(site.initial);
      sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
      const products = await getAllProducts() as any[];

      const brands = (await getAllBrands()) as any[];

      const categories = await getAllCategories() as any[]

      const redirects = (await getAllRedirects()).map((i) => i.from_path);

      const issues = [];

      const productIsVisible = (product: Product) =>
        (product.inventory_level > 0 && product.is_visible) ||
        (product.is_visible && product.inventory_tracking === "none");

      // added the bit about inventory tracking but not sure about it

      for (const brand of brands) {
        brand.type = "brand";
        const brandProducts = products.filter(
          (product: Product) => product.brand_id === brand.id
        );

        const visibleProducts = brandProducts.filter(productIsVisible);

        if (!visibleProducts.length) issues.push(brand);
      }

      for (const category of categories) {
        category.type = "category";
        const categoryProducts = products.filter((product: Product) =>
          product.categories.includes(category.id)
        );

        const visibleProducts = categoryProducts.filter(productIsVisible);

        if (!visibleProducts.length && category.is_visible)
          issues.push(category);
      }

      const pageSlugsExcludingRedirectedPages = removeRedirectedUrls(
        issues,
        redirects
      );

      const fullNonRedirectedUrls = addDomainToSlugs(
        pageSlugsExcludingRedirectedPages,
        site
      );

      resolve({
        name: site.name,
        emptyPages: fullNonRedirectedUrls,
      });
    } catch (err) {
      reject(err);
    }
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
    try {
      const pages = await getSiteEmptyPages(store);
      if (pages.emptyPages.length) emptyPages.push(pages);
    } catch (err) {
      console.log(err);
      continue;
    }
  }
  return emptyPages;
}

function renderEmail(
  emptyStorePages: {
    name: string;
    emptyPages: any[];
  }[]
) {
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
                <a href="${page.url}">${page.type}: ${page.name}</a>
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

function convertToCsvCompatibleFormat(
  emptyStorePages: {
    name: string;
    emptyPages: any[];
  }[]
): any[] {
  return emptyStorePages
    .map((store: { name: string; emptyPages: any[] }) =>
      store.emptyPages.map((page: any) => ({
        store: store.name,
        id: page.id,
        name: page.name,
        type: page.type,
        url: page.url,
      }))
    )
    .flat();
}

export async function emptyPages (...emails: string[]) {
  try {
    const emptyPages = await getAllEmptyPages();
    const email = renderEmail(emptyPages);
    stringify(
      convertToCsvCompatibleFormat(emptyPages),
      { header: true },
      (err, out) => {
        if (err) return console.log(err);

        const attachment = Buffer.from(out).toString("base64");

        sgMail.send({
          to: emails,
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
        });
      }
    );
  } catch (err: any) {
    if (err.response) {
      if (err.response.body) {
        console.log(err.response.body);
        sgMail.send({
          to: emails,
          from: "sean@beautyfeatures.ie",
          subject: `Error in Empty Categories and Brands Report`,
          text: JSON.stringify(err.response.body),
        });
        return;
      }
    }
    console.log(err);
    sgMail.send({
      to: emails,
      from: "sean@beautyfeatures.ie",
      subject: `Error in Empty Categories and Brands Report`,
      text: JSON.stringify(err.toString()),
    });
  }
};


