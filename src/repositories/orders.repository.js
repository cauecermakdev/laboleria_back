import dayjs from "dayjs";
import connection from "../database/database.js";

export function postOrder(clientId, cakeId, quantity, totalPrice) {
  return connection.query(
    `INSERT INTO orders ("clientId", "cakeId",quantity,"totalPrice","createdAt") VALUES ($1,$2,$3,$4,$5)`,
    [clientId, cakeId, quantity, totalPrice, dayjs().format("YYYY-MM-DD HH:MM")]
  );
}

export function getOrder() {
  return connection.query(
    `
    SELECT 
      json_build_object('id',cl.id,'name',cl.name,'adress',cl.adress,'phone',cl.phone) AS "client",
      json_build_object('id',c.id,'name',c.name,'price',c.price,'description',c.description,'image',c.image) AS "cake",
      o.id as "orderId", o."createdAt", o.quantity, o."totalPrice"
    FROM orders o 
    JOIN clients cl ON o."clientId" = cl.id 
    JOIN cakes c on c."id" = o."cakeId" 
    GROUP BY cl.id, c.id, o.id
    `
  );
}

export function getIdOrder(id) {
  return connection.query(
    `
    SELECT 
      json_build_object('id',cl.id,'name',cl.name,'adress',cl.adress,'phone',cl.phone) AS "client",
      json_build_object('id',c.id,'name',c.name,'price',c.price,'description',c.description,'image',c.image) AS "cake",
      o.id as "orderId", o."createdAt", o.quantity, o."totalPrice"
    FROM orders o 
    JOIN clients cl ON o."clientId" = cl.id 
    JOIN cakes c on c."id" = o."cakeId" 
    WHERE o.id = $1
    GROUP BY cl.id, c.id, o.id
    `,
    [id]
  );
}
