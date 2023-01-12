import connection from "../database/database.js";
import { postNewCake } from "../repositories/cakes.repository.js";

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

export async function postCakes(req, res) {
  const { name, price, image, description } = req.body;

  if (!name || name.length < 2) {
    res.status(400).send("name incorreto");
    return;
  }

  if (await nameExist(name)) {
    res.status(409).send("nome ja existe");
    return;
  }

  if (!price || price <= 0) {
    res.status(400).send("price menor ou igual a zero");
  }

  if (typeof description !== "string") {
    res.status(400).send("description não é string");
  }

  //validar link com joi

  try {
    await postNewCake(name, price, image, description);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
