"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const allStores_1 = require("../vars/allStores");
const getAllProducts_1 = require("../../functions/products/getAllProducts");
const getAllBrands_1 = require("../../functions/brands/getAllBrands");
const getAllCategories_1 = require("../../functions/categories/getAllCategories");
const csv_stringify_1 = require("csv-stringify");
const getSiteUrl_1 = require("../../functions/utils/getSiteUrl");
const getAllRedirects_1 = require("../../functions/redirects/getAllRedirects");
const sgMail = require("@sendgrid/mail");
function removeRedirectedUrls(pages, redirectFromPaths) {
    return pages.filter((page) => !redirectFromPaths.includes(page.custom_url.url));
}
function addDomainToSlugs(pags, site) {
    return pags.map((page) => {
        const url = (0, getSiteUrl_1.getSiteUrl)(site.initial) + page.custom_url.url;
        page.url = url;
        return page;
    });
}
function getSiteEmptyPages(site) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            require("../../config/config").config(site.initial);
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const products = yield (0, getAllProducts_1.getAllProducts)();
            const brands = yield (0, getAllBrands_1.getAllBrands)();
            const categories = yield (0, getAllCategories_1.getAllCategories)();
            const redirects = (yield (0, getAllRedirects_1.getAllRedirects)()).map((i) => i.from_path);
            const issues = [];
            const productIsVisible = (product) => product.inventory_level > 0 && product.is_visible;
            for (const brand of brands) {
                brand.type = "brand";
                const brandProducts = products.filter((product) => product.brand_id === brand.id);
                const visibleProducts = brandProducts.filter(productIsVisible);
                if (!visibleProducts.length)
                    issues.push(brand);
            }
            for (const category of categories) {
                category.type = "category";
                const categoryProducts = products.filter((product) => product.categories.includes(category.id));
                const visibleProducts = categoryProducts.filter(productIsVisible);
                if (!visibleProducts.length && category.is_visible)
                    issues.push(category);
            }
            const pageSlugsExcludingRedirectedPages = removeRedirectedUrls(issues, redirects);
            const fullNonRedirectedUrls = addDomainToSlugs(pageSlugsExcludingRedirectedPages, site);
            resolve({
                name: site.name,
                emptyPages: fullNonRedirectedUrls,
            });
        }
        catch (err) {
            reject(err);
        }
    }));
}
/**
 *
 * @returns Promise<{
 *  name: string;
 *  emptyPages: string[];
 * }[]>
 */
function getAllEmptyPages() {
    return __awaiter(this, void 0, void 0, function* () {
        const emptyPages = [];
        for (const store of allStores_1.allStores) {
            try {
                const pages = yield getSiteEmptyPages(store);
                if (pages.emptyPages.length)
                    emptyPages.push(pages);
            }
            catch (err) {
                console.log(err);
                continue;
            }
        }
        return emptyPages;
    });
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
function convertToCsvCompatibleFormat(emptyStorePages) {
    return emptyStorePages
        .map((store) => store.emptyPages.map((page) => ({
        store: store.name,
        id: page.id,
        name: page.name,
        type: page.type,
        url: page.url,
    })))
        .flat();
}
const emptyPages = function (...emails) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const emptyPages = yield getAllEmptyPages();
            const email = renderEmail(emptyPages);
            (0, csv_stringify_1.stringify)(convertToCsvCompatibleFormat(emptyPages), { header: true }, (err, out) => {
                if (err)
                    return console.log(err);
                const attachment = Buffer.from(out).toString("base64");
                const msg = {
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
                };
                sgMail.send(msg);
            });
        }
        catch (err) {
            if (err.response) {
                if (err.response.body) {
                    console.log(err.response.body);
                    return;
                }
            }
            console.log(err);
        }
    });
};
exports.emptyPages = emptyPages;
