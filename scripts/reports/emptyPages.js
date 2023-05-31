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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var allStores_1 = require("../vars/allStores");
var getAllProducts_1 = require("../../functions/products/getAllProducts");
var getAllBrands_1 = require("../../functions/brands/getAllBrands");
var getAllCategories_1 = require("../../functions/categories/getAllCategories");
var csv_stringify_1 = require("csv-stringify");
var getSiteUrl_1 = require("../../functions/utils/getSiteUrl");
var getAllRedirects_1 = require("../../functions/redirects/getAllRedirects");
var sgMail = require("@sendgrid/mail");
function removeRedirectedUrls(pages, redirectFromPaths) {
    return pages.filter(function (page) { return !redirectFromPaths.includes(page.custom_url.url); });
}
function addDomainToSlugs(pags, site) {
    return pags.map(function (page) {
        var url = (0, getSiteUrl_1.getSiteUrl)(site.initial) + page.custom_url.url;
        page.url = url;
        return page;
    });
}
function getSiteEmptyPages(site) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var products, brands, categories, redirects, issues, productIsVisible, _loop_1, _i, brands_1, brand, _loop_2, _a, categories_1, category, pageSlugsExcludingRedirectedPages, fullNonRedirectedUrls, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    require("../../config/config").config(site.initial);
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    return [4 /*yield*/, (0, getAllProducts_1.getAllProducts)()];
                case 1:
                    products = _b.sent();
                    return [4 /*yield*/, (0, getAllBrands_1.getAllBrands)()];
                case 2:
                    brands = _b.sent();
                    return [4 /*yield*/, (0, getAllCategories_1.getAllCategories)()];
                case 3:
                    categories = _b.sent();
                    return [4 /*yield*/, (0, getAllRedirects_1.getAllRedirects)()];
                case 4:
                    redirects = (_b.sent()).map(function (i) { return i.from_path; });
                    issues = [];
                    productIsVisible = function (product) {
                        return (product.inventory_level > 0 && product.is_visible) ||
                            (product.is_visible && product.inventory_tracking === "none");
                    };
                    _loop_1 = function (brand) {
                        brand.type = "brand";
                        var brandProducts = products.filter(function (product) { return product.brand_id === brand.id; });
                        var visibleProducts = brandProducts.filter(productIsVisible);
                        if (!visibleProducts.length)
                            issues.push(brand);
                    };
                    // added the bit about inventory tracking but not sure about it
                    for (_i = 0, brands_1 = brands; _i < brands_1.length; _i++) {
                        brand = brands_1[_i];
                        _loop_1(brand);
                    }
                    _loop_2 = function (category) {
                        category.type = "category";
                        var categoryProducts = products.filter(function (product) {
                            return product.categories.includes(category.id);
                        });
                        var visibleProducts = categoryProducts.filter(productIsVisible);
                        if (!visibleProducts.length && category.is_visible)
                            issues.push(category);
                    };
                    for (_a = 0, categories_1 = categories; _a < categories_1.length; _a++) {
                        category = categories_1[_a];
                        _loop_2(category);
                    }
                    pageSlugsExcludingRedirectedPages = removeRedirectedUrls(issues, redirects);
                    fullNonRedirectedUrls = addDomainToSlugs(pageSlugsExcludingRedirectedPages, site);
                    resolve({
                        name: site.name,
                        emptyPages: fullNonRedirectedUrls
                    });
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _b.sent();
                    reject(err_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
}
/**
 *
 * @returns Promise<{
 *  name: string;
 *  emptyPages: string[];
 * }[]>
 */
function getAllEmptyPages() {
    return __awaiter(this, void 0, void 0, function () {
        var emptyPages, _i, allStores_2, store, pages, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emptyPages = [];
                    _i = 0, allStores_2 = allStores_1.allStores;
                    _a.label = 1;
                case 1:
                    if (!(_i < allStores_2.length)) return [3 /*break*/, 6];
                    store = allStores_2[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, getSiteEmptyPages(store)];
                case 3:
                    pages = _a.sent();
                    if (pages.emptyPages.length)
                        emptyPages.push(pages);
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, emptyPages];
            }
        });
    });
}
function renderEmail(emptyStorePages) {
    return emptyStorePages
        .map(function (_a) {
        var name = _a.name, emptyPages = _a.emptyPages;
        return /*html*/ "\n      <div>\n        <h2>".concat(name, "</h2>\n        <ul>\n          ").concat(emptyPages
            .map(function (page) {
            return /*html*/ "\n              <li>\n                <a href=\"".concat(page.url, "\">").concat(page.type, ": ").concat(page.name, "</a>\n              </li>\n            ");
        })
            .join(""), "\n        </ul>\n      </div>\n    ");
    })
        .join("");
}
function convertToCsvCompatibleFormat(emptyStorePages) {
    return emptyStorePages
        .map(function (store) {
        return store.emptyPages.map(function (page) { return ({
            store: store.name,
            id: page.id,
            name: page.name,
            type: page.type,
            url: page.url
        }); });
    })
        .flat();
}
var emptyPages = function () {
    var emails = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        emails[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var emptyPages_1, email_1, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getAllEmptyPages()];
                case 1:
                    emptyPages_1 = _a.sent();
                    email_1 = renderEmail(emptyPages_1);
                    (0, csv_stringify_1.stringify)(convertToCsvCompatibleFormat(emptyPages_1), { header: true }, function (err, out) {
                        if (err)
                            return console.log(err);
                        var attachment = Buffer.from(out).toString("base64");
                        sgMail.send({
                            to: emails,
                            from: "sean@beautyfeatures.ie",
                            subject: "Empty Categories and Brands Report",
                            text: out,
                            html: email_1,
                            attachments: [
                                {
                                    content: attachment,
                                    filename: "empty-pages.csv",
                                    type: "text/csv",
                                    disposition: "attachment"
                                },
                            ]
                        });
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    if (err_3.response) {
                        if (err_3.response.body) {
                            console.log(err_3.response.body);
                            sgMail.send({
                                to: emails,
                                from: "sean@beautyfeatures.ie",
                                subject: "Error in Empty Categories and Brands Report",
                                text: JSON.stringify(err_3.response.body)
                            });
                            return [2 /*return*/];
                        }
                    }
                    console.log(err_3);
                    sgMail.send({
                        to: emails,
                        from: "sean@beautyfeatures.ie",
                        subject: "Error in Empty Categories and Brands Report",
                        text: JSON.stringify(err_3.toString())
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.emptyPages = emptyPages;
