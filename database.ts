const knex = require("knex");
const connection = {
  ssl: { rejectUnauthorized: false },
  host: "tradewatch-db.cluster-ckjhl9zn95xm.eu-central-1.rds.amazonaws.com",
  user: "admin",
  password: "sagi1991",
  database: "tradewatch-db",
};

const knexjs = knex({ client: "pg", connection });

export async function insertPrice(
  symbol: string,
  price: number
): Promise<void> {
  //   const res = await knex("Prices").insert({ symbol, price });
  console.log("HI");
}
