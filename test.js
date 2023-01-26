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
require("./config/config");
const getMailchimpSegmentMembers_1 = require("./mailchimp/getMailchimpSegmentMembers");
const fetchCustomerDetails_1 = require("./yotpo/fetchCustomerDetails");
const simplePrint_1 = require("./scripts/utils/simplePrint");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield (0, getMailchimpSegmentMembers_1.getMailchimpSegmentMembers)(203);
        const memberdetails = [];
        for (const m of members) {
            const res = yield (0, fetchCustomerDetails_1.fetchCustomerDetails)(m.email_address);
            memberdetails.push(res);
            console.clear();
            console.log(res);
        }
        (0, simplePrint_1.simplePrint)(JSON.stringify(memberdetails));
    }
    catch (err) {
        console.log(err);
    }
}))();
