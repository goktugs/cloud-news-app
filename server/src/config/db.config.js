import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
console.log("im here ", uri);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

export default db;
