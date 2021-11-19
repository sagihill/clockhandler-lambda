// import { knex as Knex } from "knex";

// const connection = {
//   ssl: { rejectUnauthorized: false },
//   host: "tradewatch-db.cluster-ckjhl9zn95xm.eu-central-1.rds.amazonaws.com",
//   user: "admin",
//   password: "sagi1991",
//   database: "tradewatch-db",
// };

// const knex = Knex({ client: "mysql", connection });

export function insertPrice(
  symbol: string,
  price: number
): void {
//   const res = await knex("Prices").insert({ symbol, price });
  console.log(symbol);
}
