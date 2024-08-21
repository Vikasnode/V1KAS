const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient("mongodb://localhost:27017").connect();

async function dbConnect(){
   const connect =await client;
   const db =await connect.db("DI");
   const collection =await db.collection("Products");
   return collection;
}
// dbConnect();

module.exports = dbConnect;