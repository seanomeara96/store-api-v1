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
exports.getMailchimpSegmentMembers = void 0;
const axios_1 = __importDefault(require("axios"));
const getMailchimpSegment_1 = require("./getMailchimpSegment");
const vars_1 = require("./vars");
function getMailchimpSegmentMembers(segmentId, defaultParams = {
    fields: [],
    excludeFields: [],
    count: 1000,
    offset: 0,
    includeCleaned: true,
    includeTransactional: true,
    includeUnsubscribed: true,
}) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const members = [];
                const segment = yield (0, getMailchimpSegment_1.getMailchimpSegment)(segmentId);
                const memberCount = segment.member_count;
                const offsetLimit = Math.ceil(memberCount / 1000);
                const url = `https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists/${vars_1.listId}/segments/${segmentId}/members`;
                for (let i = 0; i < offsetLimit; i++) {
                    console.clear();
                    console.log("members length", members.length);
                    console.log("fetching page ", i + 1);
                    const res = yield axios_1.default.get(url, {
                        headers: {
                            Authorization: "Basic " +
                                Buffer.from("anystring:" + process.env.MAILCHIMP_API_KEY).toString("base64"),
                        },
                        params: Object.assign(Object.assign({}, defaultParams), { offset: i }),
                    });
                    const data = res.data.members;
                    members.push(...data);
                }
                console.clear();
                resolve(members);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.getMailchimpSegmentMembers = getMailchimpSegmentMembers;
