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
exports.getMailchimpListMembers = void 0;
const axios_1 = __importDefault(require("axios"));
const getMailchimpList_1 = require("./getMailchimpList");
const vars_1 = require("./vars");
function getMailchimpListMembers(customParams) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const members = [];
                const ListData = yield (0, getMailchimpList_1.getMailchimpList)();
                const memberCount = ListData.stats.member_count;
                console.log(`there are ${memberCount} members in this list`);
                const offsetLimit = Math.ceil(memberCount / 1000);
                for (let i = 0; i < offsetLimit; i++) {
                    const rParams = Object.assign({ count: 1000, offset: i }, customParams);
                    console.clear();
                    console.log("members length", members.length);
                    console.log("fetching page ", i + 1);
                    const res = yield axios_1.default.get(`https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists/${vars_1.listId}/members`, {
                        headers: {
                            Authorization: "Basic " +
                                Buffer.from("anystring:" + process.env.MAILCHIMP_API_KEY).toString("base64"),
                        },
                        params: rParams,
                    });
                    console.clear();
                    const fetchedMembers = res.data.members;
                    members.push(...fetchedMembers);
                }
                resolve(members);
            }
            catch (err) {
                return reject(err);
            }
        });
    });
}
exports.getMailchimpListMembers = getMailchimpListMembers;
