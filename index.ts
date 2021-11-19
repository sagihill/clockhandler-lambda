
const https = require("https");
type APIResponse = { optionChain: { result: [{ quote: { bid: number } }] } };

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = async (event: { symbol: string }, context, callback) => {
  const options = {
    method: "get",
    hostname: "yfapi.net",
    path: "https://yfapi.net/v7/finance/options/" + event.symbol,
    headers: {
      "x-api-key": "L5KARBpGqm6aQPrXPfwgl6E5Ild5pRBh8dG7cb6a",
    },
  };

  const req = https.request(options, (res) => {
    let body = "";
    let response: APIResponse = null;
    res.on("data", (chunk) => (body += chunk));
    res.on("end", async () => {
      console.log("Successfully processed HTTPS response");
      // If we know it's JSON, parse it
      if (res.headers["content-type"] === "application/json") {
        body = JSON.parse(body);
        response = body as unknown as APIResponse;
      }
      const price = response.optionChain.result[0].quote.bid;
      console.log(price)
      // await insertPrice(event.symbol, price);
    });
  });
  callback(null, true);
  req.on("error", callback);
  req.end();
};


// import * as AWS from "aws-sdk";
// import { Context } from "aws-lambda";
// import { knex as Knex } from "knex";
// AWS.config.update({ region: "eu-central-1" });

// const connection = {
//   ssl: { rejectUnauthorized: false },
//   host: "tradewatch-db.cluster-ckjhl9zn95xm.eu-central-1.rds.amazonaws.com",
//   user: "admin",
//   password: "sagi1991",
//   database: "tradewatch-db",
// };

// const knex = Knex({ client: "mysql", connection });

// export async function insertPrice(
//   symbol: string,
//   price: number
// ): Promise<void> {
//   const res = await knex("Prices").insert({ symbol, price });
//   console.log(res);
// }
