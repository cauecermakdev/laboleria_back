import connection from "../database/database.js";

export function postNewCake(name, price, image, description) {
  return connection.query(
    `INSERT INTO cakes ("name", "price", "image", "description") 
          VALUES ($1,$2,$3,$4)`,
    [name, price, image, description]
  );
}
