const express = require("express");
const paypal = require("paypal-rest-sdk");
const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
//--
exports.pay = asyncMiddleware(async (req, res, next) => {
  const { price } = req.query;
  paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
      "AXvfrDsXiASY9lWMSC8xKOlrxLsLLDrX23Nux0mk4G5kh8-Sa3u7jLjMJZXrV-bXzTZZ29nyAtnk0xPo",
    client_secret:
      "ED9wndKtY8y6ggE8ymqB6Jw4SyzNHmMTBegEaOwZ2IVRWiaDG8JX0dZR0fwm1s0UGNu15Gc5P5I32OUF",
  });
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://localhost:5000/api/v1/pay/success?price=${price}`,
      cancel_url: "http://localhost:5000/api/v1/pay/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "item",
              sku: "item",
              price,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: price,
        },
        description: "hat for duc",
      },
    ],
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url")
          res.redirect(payment.links[i].href);
      }
    }
  });
});
exports.success = asyncMiddleware(async (req, res, next) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: req.query.price,
        },
      },
    ],
  };
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
        res.send("success");
      }
    }
  );
});
exports.cancel = asyncMiddleware(async (req, res, next) => {
  res.send("canceled");
});
