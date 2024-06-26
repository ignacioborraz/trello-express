import "dotenv/config.js";
import faker from "@faker-js/faker"
import connectToMongo from "../src/utils/mongo.util.js";
import Card from "../src/dao/mongo/Card.model.js";

const card = {
    title: faker.lorem.words({ min: 1, max: 10 }),
    description: faker.lorem.text(),
    list_id: "123456"
  };

async function createData() {
  try {
    await connectToMongo(process.env.MONGO_URI);
    for (let i =1 ; i<=10 ; i++) {
      await Card.insertOne(card);
    }    
    console.log("done!");
  } catch (error) {
    console.log(error);
  }
}

createData();
