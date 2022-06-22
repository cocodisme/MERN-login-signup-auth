const mongoose = require("mongoose")
const uri = process.env.MONGO_URI

const connectDB = ()=>{
  mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
  const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully");
});

}
module.exports = connectDB