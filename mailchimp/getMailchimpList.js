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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailchimpList = void 0;
const axios_1 = __importDefault(require("axios"));
const vars_1 = require("./vars");
function getMailchimpList(defaultParams = {
    fields: [],
    exclude_fields: [],
    include_total_contacts: true,
}) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists/${vars_1.listId}`, {
                    params: defaultParams,
                    headers: {
                        Authorization: "Basic " +
                            Buffer.from("anystring:" + process.env.MAILCHIMP_API_KEY).toString("base64"),
                    },
                });
                resolve(response.data);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.getMailchimpList = getMailchimpList;
