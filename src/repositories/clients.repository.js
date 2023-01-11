import connection from "../database/database.js";

export function postClient(name, address, phone) {
  return connection.query(
    "INSERT INTO clients (name,address,phone) VALUES ($1,$2,$3)",
    [name, address, phone]
  );
}
