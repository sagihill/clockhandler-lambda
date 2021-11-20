const https = require("https");
const axios = require("axios").default;
type APIResponse = {
  optionChain: { result: [{ quote: { regularMarketPrice: number } }] };
};

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = async (event) => {
  try {
    const options = {
      // method: "get",
      headers: {
        "x-api-key": "L5KARBpGqm6aQPrXPfwgl6E5Ild5pRBh8dG7cb6a",
      },
    };

    const resp = await axios.get(
      `https://yfapi.net/v7/finance/options/${event.symbol}`,
      options
    );

    const data: APIResponse = resp.data;

    const price = data.optionChain.result[0].quote.regularMarketPrice;
    await insertPrice(event.symbol, price);
    return true;
  } catch (error) {
    console.log(error);
  }
};

// import { knex as Knex } from "knex";

const connection = {
  ssl: { rejectUnauthorized: false },
  host: "tradewatch-1.ckjhl9zn95xm.eu-central-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "sagi1991",
  database: "TradeWatch",
};
const knex = require("knex")({
  client: require("knex/lib/dialects/mysql"),
  connection,
});

async function insertPrice(symbol: string, price: number): Promise<void> {
  const res = await knex("Prices").insert({ symbol, price });
  return res;
}
