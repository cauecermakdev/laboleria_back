import connection from "../database/database.js";
import { postClient } from "../repositories/clients.repository.js";

export async function postClientsController(req, res) {
  const { name, address, phone } = req.body;

  if (phone.length !== 10 && phone.legnth != 11) {
    res.status(400).send("phone deve ter entre 10 e 11 caracteres");
    return;
  }

  try {
    postClient(name, address, phone);
    res.status(201).send("SUCESSO na Inserção de clients");
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function existIdTable(id, table) {

  const list = await connection.query(
    `SELECT * FROM ${table} t WHERE t.id = ($1)`,
    [id]
  );

  const exist = list.rows[0];

  if (exist) {
    return true;
  } else {
    return false;
  }
}

export async function getClientOrdersController(req, res) {
  const clientId = req.params.id;

  if (!(await existIdTable(clientId, "clients"))) {
    res.status(404).send("client doesnt exist");
    return;
  }

  try {
    const result = await getClientOrder(clientId);
    res.status(201).send(result.rows);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

export function getClientOrder(clientId) {
  return connection.query(
    `
      SELECT 
        o.id as "orderId", o."createdAt", o.quantity, o."totalPrice", 
        c.name as "cakeName"
      FROM orders o
      JOIN cakes c
      ON o."clientId" = $1
      WHERE c.id  = o."cakeId"
      GROUP BY o.id, c.name
      `,
    [clientId]
  );
}
