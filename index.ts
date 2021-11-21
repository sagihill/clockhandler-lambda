const axios = require("axios").default;
type APIResponse = {
  optionChain: { result: [{ quote: { regularMarketPrice: number } }] };
};

type ClockHandlerEvent = {
  symbol: string;
};

exports.handler = async (event: ClockHandlerEvent) => {
  try {
    console.log("Started handling clock event: ", event);
    const price = await getPrice(event.symbol);
    const priceId = await insertPrice(event.symbol, price);
    console.log("Finished handling clock event...");
    return priceId;
  } catch (error) {
    console.log("Something went wrong handling event", [error, event]);
  }
};

async function getPrice(symbol: string): Promise<number> {
  console.log(`Started fetching price for "${symbol}"`);
  const options = {
    headers: {
      "x-api-key": "L5KARBpGqm6aQPrXPfwgl6E5Ild5pRBh8dG7cb6a",
    },
  };

  const resp = await axios.get(
    `https://yfapi.net/v7/finance/options/${symbol}`,
    options
  );

  const data: APIResponse = resp.data;

  const price = data.optionChain.result[0].quote.regularMarketPrice;

  console.log(`${symbol} price is: ${price}`);

  return price;
}

async function insertPrice(symbol: string, price: number): Promise<number> {
  console.log("Inserting price to database...");
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

  const res = await knex("Prices").insert({ symbol, price });
  console.log("Finished inserting price into the database...");
  return res[0];
}
