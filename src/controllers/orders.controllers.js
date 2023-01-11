import { postOrder,getIdOrder,getOrder } from "../repositories/orders.repository.js";


  async function existIdTable (id,table){
    console.log("exist")
    
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


export async function postOrderController(req, res){
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    if(!await existIdTable(clientId,"clients")){
      res.status(404).send("client doesnt exist");
      return;
    }
  
    if(!await existIdTable(cakeId,"cakes")){
      res.status(404).send("cake doesnt exist");
      return;
    }
  
    if(typeof(quantity) !== "number" || quantity <= 0 || quantity >= 5){
      res.status(400).send("erro na insercao de quantity");
      return;
    }
  
    try{
        await postOrder(clientId,cakeId,quantity,totalPrice);
        res.status(201).send("order inserted");
      }catch (err) {
        res.status(400).send(err.message);
      }
  

}


export async function getOrderController(req, res){

let date = req.query.date;
let result = {};

try{
   result =  await getOrder();

  //ajusta a data TIMESTAMP to YYYY-MM-DD HH:mm
  const tam = result.rows.length;
  for(let i = 0; i < tam;i++){
    result.rows[i].createdAt = dayjs(result.rows[i].createdAt).format("YYYY-MM-DD HH:mm");
  }

//filtra datas
  let list  = result.rows;
  if(date){
     list = list.filter((o)=> {
      const dateDayjs = dayjs(o.createdAt).format("YYYY-MM-DD");
      return(dateDayjs == date);
    });
  }

res.status(201).send(list);

  }catch (err) {
    res.status(400).send(err.message);
}

}

export async function getIdOrderController(req, res){
const id = req.params.id;
let result = {};
 
 
   result  = getIdOrder(id);
   
   //ajusta a data TIMESTAMP to YYYY-MM-DD HH:mm
   const tam = result.rows.length;
   for(let i = 0; i < tam;i++){
     result.rows[i].createdAt = dayjs(result.rows[i].createdAt).format("YYYY-MM-DD HH:mm");
   }
 
   if(result.rows.length <= 0 ){
    res.status(404).send("id não existe!")
   }
 
   res.status(200).send(result.rows);


}