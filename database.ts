import * as AWS from "aws-sdk";
import { Context } from "aws-lambda";
import { knex as Knex } from "knex";
AWS.config.update({ region: "eu-central-1" });

const connection = {
  ssl: { rejectUnauthorized: false },
  host: "tradewatch-db.cluster-ckjhl9zn95xm.eu-central-1.rds.amazonaws.com",
  user: "admin",
  password: "sagi1991",
  database: "tradewatch-db",
};

const knex = Knex({ client: "mysql", connection });

export async function insertPrice(
  symbol: string,
  price: number
): Promise<void> {
  const res = await knex("Prices").insert({ symbol, price });
  console.log(res);
}
