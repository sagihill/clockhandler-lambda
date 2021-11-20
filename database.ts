const connect = {
  ssl: { rejectUnauthorized: false },
  host: "tradewatch-1.ckjhl9zn95xm.eu-central-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "sagi1991",
  database: "TradeWatch",
};
const knexjs = require("knex")({
  client: require("knex/lib/dialects/mysql"),
  connect,
});

async function insertPrices(
  symbol: string,
  price: number
): Promise<number> {
  const res = await knexjs("Prices").insert({ symbol, price });
  return res[0];
}

module.exports = {
  insertPrices,
};
