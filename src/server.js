/*
import express from "express";
import pg from "pg";
import cors from "cors";
import route from "./indexRoutes.js";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
const { Pool } = pg;

const connection = new Pool({
  user: "caue",
  host: "localhost",
  port: 5432,
  database: "laboleria_bd",
  password: "ra-16180339887",
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(route);

/*
async function nameExist(name) {
  console.log("nameExist function");

  const nameList = await connection.query(
    "SELECT * FROM cakes c WHERE c.name = ($1)",
    [name]
  );

  const nameExist = nameList.rows[0];

  console.log("nameExist ", nameExist);
  if (nameExist) {
    return true;
  } else {
    return false;
  }
}


async function existIdTable(id, table) {
  console.log("exist");

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

app.post("/order", async (req, res) => {
  console.log("entra order");
  /*
  {
    "clientId": 1,
    "cakeId": 1,
    "quantity": 2,
    "totalPrice": 26.00
}*/
/*
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  if (!(await existIdTable(clientId, "clients"))) {
    res.status(404).send("client doesnt exist");
    return;
  }

  if (!(await existIdTable(cakeId, "cakes"))) {
    res.status(404).send("cake doesnt exist");
    return;
  }

  if (typeof quantity !== "number" || quantity <= 0 || quantity >= 5) {
    res.status(400).send("erro na insercao de quantity");
    return;
  }

  await connection.query(
    `INSERT INTO orders ("clientId", "cakeId",quantity,"totalPrice","createdAt") VALUES ($1,$2,$3,$4,$5)`,
    [clientId, cakeId, quantity, totalPrice, dayjs().format("YYYY-MM-DD HH:MM")]
  );

  res.status(201).send("order inserted");
});

app.get("/orders", async (req, res) => {
  /* [
    {
       "client": {
           "id": 1,
           "name": "Fulana",
           "address": "Rua tal",
           "phone": "2199999999"
       },
       "cake": {
           "id": 1
           "name": "Bolo de pote",
           "price": "13.00",
           "description": "Bolo de chocolate com recheio de leite ninho",
           "image": "encurtador.com.br/iDIX0"
       },
       "orderId": 1,
       "createdAt": "2022-03-16 10:30",
       "quantity": 2,
       "totalPrice": 26.00
     }
 ]*/

 /*
  //const date = dayjs(req.query.date).format("YYYY-MM-DD HH:MM");
  let date = req.query.date;
  let result = {};

  result = await connection.query(
    `
    SELECT 
      json_build_object('id',cl.id,'name',cl.name,'address',cl.address,'phone',cl.phone) AS "client",
      json_build_object('id',c.id,'name',c.name,'price',c.price,'description',c.description,'image',c.image) AS "cake",
      o.id as "orderId", o."createdAt", o.quantity, o."totalPrice"
    FROM orders o 
    JOIN clients cl ON o."clientId" = cl.id 
    JOIN cakes c on c."id" = o."cakeId" 
    GROUP BY cl.id, c.id, o.id
    `
  );

  //ajusta a data TIMESTAMP to YYYY-MM-DD HH:mm
  const tam = result.rows.length;
  for (let i = 0; i < tam; i++) {
    result.rows[i].createdAt = dayjs(result.rows[i].createdAt).format(
      "YYYY-MM-DD HH:mm"
    );
  }

  //filtra datas
  let list = result.rows;
  if (date) {
    list = list.filter((o) => {
      const dateDayjs = dayjs(o.createdAt).format("YYYY-MM-DD");
      return dateDayjs == date;
    });
  }

  res.status(201).send(list);
});

app.get("/:id/orders", async (req, res) => {
  //const date = dayjs(req.query.date).format("YYYY-MM-DD HH:MM");

  const id = req.params.id;
  let result = {};

  result = await connection.query(
    `
     SELECT 
       json_build_object('id',cl.id,'name',cl.name,'address',cl.address,'phone',cl.phone) AS "client",
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

  //ajusta a data TIMESTAMP to YYYY-MM-DD HH:mm
  const tam = result.rows.length;
  for (let i = 0; i < tam; i++) {
    result.rows[i].createdAt = dayjs(result.rows[i].createdAt).format(
      "YYYY-MM-DD HH:mm"
    );
  }

  if (result.rows.length <= 0) {
    res.status(404).send("id não existe!");
  }

  res.status(200).send(result.rows);
});

app.get("/clients/:id/orders", async (req, res) => {
  const clientId = req.params.id;
  let result = {};

  result = await connection.query(
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

  res.send(result.rows);
  return;

  //ajusta a data TIMESTAMP to YYYY-MM-DD HH:mm
  const tam = result.rows.length;
  for (let i = 0; i < tam; i++) {
    result.rows[i].createdAt = dayjs(result.rows[i].createdAt).format(
      "YYYY-MM-DD HH:mm"
    );
  }

  if (result.rows.length <= 0) {
    res.status(404).send("id não existe!");
  }

  res.status(200).send(result.rows);
});

app.post("/urls/shorten", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const { url } = req.body;

  if (!authorization) {
    res.status(401).send("header não enviado");
    return;
  } else if (!(await authorizationValidated(token))) {
    res.status(401).send("Token inválido");
    return;
  }

  if (!token) {
    res.send(401).status("Sem token!");
    return;
  }

  if (!url) {
    res.status(422).send("Sem url!");
    return;
  }

  if (url.substring(0, 8) !== "https://" && url.substring(0, 7) !== "http://") {
    res.status(422).send("Url não começa com https:// ou http://");
    return;
  }

  const result = await connection.query(
    `SELECT s.email FROM session s WHERE s.token = $1`,
    [token]
  );

  const email = result.rows[0].email;
  if (!email) {
    res.status(422).send("Token inválido!");
  }

  //preciso buscar email, original link e shortly link
  //inserir na tabela link

  const shortUrl = nanoid(8);

  await connection.query(
    `INSERT INTO link ("email","originalLink","shortUrl") VALUES($1,$2,$3)`,
    [email, url, shortUrl]
  );

  res.status(201).send({ shortUrl: shortUrl });
});

app.get("/urls/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).send("Não tem id");
    return;
  }

  const result = await connection.query(`SELECT * FROM link l WHERE l.id =$1`, [
    id,
  ]);

  const link = result.rows[0];
  if (!link) {
    res.status(404).send("Id não existente na base de dados");
    return;
  }

  const objGetUrl = {
    id: link.id,
    shotUrl: link.shortUrl,
    url: link.originalLink,
  };

  res.send(objGetUrl);
});

app.get("/urls/open/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl;

  if (!shortUrl) {
    res.status(404).send("Não tem shortUrl");
    return;
  }

  const result = await connection.query(
    `SELECT l."originalLink" FROM link l WHERE l."shortUrl" =$1`,
    [shortUrl]
  );

  const url = result.rows[0].originalLink;

  if (!url) {
    res.status(404).send("url não existe");
    return;
  }

  await connection.query(
    `UPDATE link l SET "visitCount" = "visitCount"+1 WHERE l."shortUrl" = $1`,
    [shortUrl]
  );

  res.redirect(`${url}`);
  return;
  //res.send(objGetUrl)
});

async function deleteUrl(id) {
  await connection.query(`DELETE FROM link l WHERE l.id =$1`, [id]);
}

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
*/