import dotenv from "dotenv";
dotenv.config();
import pg from "pg";

const { Pool } = pg;


const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

/*
const connection = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "laboleria_bd",
  password: "rainbow123",
});
*/

export default connection;
