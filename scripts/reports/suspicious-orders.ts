import { stringify } from "csv-stringify";
import { Order } from "../../functions/orders/Order";
import { getAllOrders } from "../../functions/orders/getAllOrders";

import sgMail from "@sendgrid/mail";

interface OrderWithStoreInitials extends Order {
  store_initials: string;
}
const possiblyFraudulentOrders: OrderWithStoreInitials[] = [];

async function test() {
  try {
    const stores = [
      "bf",
      "ah",
      "bsk",
      "ih",
      "pb",
      "bs",
      "hie",
      "stie",
      "ds",
      "px",
    ];
    // get all suspicious orders
    for (const store of stores) {
      require("./config/config").config(store, 2);
      // Current date (today)
      const today = new Date();
      // Date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const orders = await getAllOrders({
        min_date_created: sevenDaysAgo.toISOString(),
        max_date_created: today.toISOString(),
      });

      for (const order of orders) {
        let possiblyFraudulent = false;
        let orderCountry = order.billing_address.country;
        let billingAddressNotIreland = orderCountry.toLowerCase() !== "ireland";
        let geoIPNotIreland = order.geoip_country.toLowerCase() !== "ireland";
        let stripe = "Stripe (Credit Card)";
        let paymentMethodIsStripe = order.payment_method === stripe;
        let orderIsShipped = order.custom_status === "Shipped";
        let processing = "Order Received / Processing";
        let orderIsProcessing = order.custom_status === processing;
        let orderIsShippedOrProcessing = orderIsShipped || orderIsProcessing;

        if (
          (billingAddressNotIreland || geoIPNotIreland) &&
          paymentMethodIsStripe &&
          orderIsShippedOrProcessing
        ) {
          possiblyFraudulent = true;
        }

        if (possiblyFraudulent) {
          (order as OrderWithStoreInitials).store_initials = store;
          possiblyFraudulentOrders.push(order as OrderWithStoreInitials);
        }
      }
    }

    if (!possiblyFraudulentOrders.length) {
      console.log("no orders found to be suspicious");
      return;
    }

    // format csv data
    const csvData = possiblyFraudulentOrders.map(function (order) {
      const { first_name } = order.billing_address;
      const { last_name } = order.billing_address;
      const fullName = first_name + " " + last_name;
      const key = order.store_initials.toUpperCase() + "_STORE_HASH";
      const storeHash = process.env[key];
      return {
        store: order.store_initials,
        order_number: order.id,
        customer_name: fullName,
        order_total: order.total_inc_tax,
        geoip_country: order.geoip_country,
        billing_address_country: order.billing_address.country,
        order_status: order.custom_status,
        link: `https://store-${storeHash}.mybigcommerce.com/manage/orders?viewId=${order.id}&orderTo=${order.id}&orderFrom=${order.id}`,
      };
    });

    // format email html
    let html = ``;
    for (const order of csvData) {
      html += /*HTML*/ `<div style="border-bottom: 1px solid grey; padding-bottom: 10px; margin-bottom: 40px">
        Order: <a href="${order.link}">#${order.order_number}</a> <br>
        Order Total: ${order.order_total} <br>
        IP Country: ${order.geoip_country} <br>
        Billing Coutry: ${order.billing_address_country} <br>
        Customer Name: ${order.customer_name}
    </div>`;
    }

    const csvStringified = (await new Promise((resolve, reject) =>
      stringify(csvData, { header: true }, (err, out) =>
        err ? reject(err) : resolve(out)
      )
    )) as string;

    const attachmentBuffer = Buffer.from(csvStringified).toString("base64");
    const attachment = {
      content: attachmentBuffer,
      filename: "suspicious-orders.csv",
      type: "text/csv",
      disposition: "attachment",
    };


    const attachments = [attachment];
    const msg = {
      to: [
        "sean@beautyfeatures.ie",
        "daryl@beautyfeatures.ie",
        "john@beautyfeatures.ie",
      ],
      from: "sean@beautyfeatures.ie",
      subject: `${possiblyFraudulentOrders.length} Suspicious Orders To Check`,
      html,
      attachments,
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    await sgMail.send(msg);
    console.log("email sent");
  } catch (err) {
    console.log(err);
  }
}
test();
