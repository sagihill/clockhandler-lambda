const https = require("https");
type APIResponse = { optionChain: { result: [{ quote: { bid: number } }] } };

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = (event, context, callback) => {
  try {
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
      res.on("end", () => {
        console.log("Successfully processed HTTPS response");
        // If we know it's JSON, parse it
        if (res.headers["content-type"] === "application/json") {
          body = JSON.parse(body);
          response = body as unknown as APIResponse;
        }
        const price = response.optionChain.result[0].quote.bid;
        console.log(price);
        insertPrice(event.symbol, price);
        // insertPrice(event.symbol, price).then((res) => {
        //   console.log(res);
        // });
      });
    });
    callback(null, true);
    req.on("error", callback);
    req.end();
  } catch (error) {
    console.log(error);
  }
};

// import { knex as Knex } from "knex";

const connection = {
  ssl: { rejectUnauthorized: false },
  host: "tradewatch-db.cluster-ckjhl9zn95xm.eu-central-1.rds.amazonaws.com",
  port: "3306",
  user: "RDSUser",
  password: "S1A2gi34",
  database: "tradewatch-db",
};
const knex = require("knex")({
  client: require("knex/lib/dialects/mysql"),
  connection
});

async function insertPrice(symbol: string, price: number): Promise<void> {
  const res = await knex("Prices").insert({ symbol, price });
  console.log(symbol);
}
