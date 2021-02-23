const mongoose = require("mongoose");
//---------------------------------------------------------------------------------------------------------------------------------------
class ConnectMongo {
  constructor() {
    this.gfs = null;
  }
  static getConnect() {
    mongoose
      .connect("mongodb://localhost:27017/node-course", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => console.log("db is connected"));
    const conn = mongoose.connection;
    conn.once("open", () => {
      this.gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: process.env.MONGO_BUCKET,
      });
    });
  }
}
//---------------------------------------------------------------------------------------------------------------------------------------
exports.ConnectMongo = ConnectMongo;
