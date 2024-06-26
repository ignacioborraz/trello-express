import "dotenv/config.js";
import connectToMongo from "../src/utils/mongo.util.js";
import User from "../src/dao/mongo/User.model.js";

const users = [
  {
    email: "igna@mh.com",
    password: "hola1234",
    age: 33,
  },
  {
    email: "ayma@mh.com",
    password: "hola1234",
    age: 30,
  },
];

async function createData() {
  try {
    await connectToMongo(process.env.MONGO_URI);
    await User.insertMany(users);
    console.log("done!");
  } catch (error) {
    console.log(error);
  }
}

createData();
