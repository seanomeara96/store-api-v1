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
exports.fetchCustomerDetails = void 0;
const axios = require("axios");
function fetchCustomerDetails(customer_email, defaultParams = {
    country_iso_code: null,
    with_referral_code: false,
    with_history: true,
}) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    headers: {
                        accept: "application/json",
                        "x-api-key": process.env.YOTPO_API_KEY,
                        "x-guid": process.env.YOTPO_GUID,
                    },
                };
                const res = yield axios.get("https://loyalty.yotpo.com/api/v2/customers", {
                    params: Object.assign({ customer_email: customer_email }, defaultParams),
                    headers: options.headers,
                });
                resolve(res.data);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.fetchCustomerDetails = fetchCustomerDetails;
