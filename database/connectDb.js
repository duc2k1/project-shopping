const MongoClient = require("mongodb").MongoClient;
let db;
//---------------------------------------------------------------------------------------------------------------------------------------
const getDbConnection = () => {
  MongoClient.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
    .then((client) => {
      const DATABASE = "node-course";
      db = client.db(DATABASE);
    })
    .catch((err) => console.log(err));
};
const getDb = () => {
  if (db) return db;
};
//---------------------------------------------------------------------------------------------------------------------------------------
exports.getDbConnection = getDbConnection;
exports.getDb = getDb;
