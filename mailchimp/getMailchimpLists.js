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
exports.getMailchimpLists = void 0;
const axios_1 = __importDefault(require("axios"));
function getMailchimpLists() {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists`;
                const response = yield axios_1.default.get(url, {
                    headers: {
                        Authorization: "Basic " +
                            Buffer.from("anystring:" + process.env.MAILCHIMP_API_KEY).toString("base64"),
                    },
                });
                const { lists } = response.data;
                console.log(Object.keys(lists[0]));
                const str = lists.map((list) => ({ id: list.id, name: list.name }));
                resolve(str);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.getMailchimpLists = getMailchimpLists;
