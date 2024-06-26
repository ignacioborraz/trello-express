import { connect } from "mongoose";

async function connectToMongo(uri) {
  try {
    await connect(uri);
    console.log("connected to mongo database");
  } catch (error) {
    console.log(error);
  }
}

export default connectToMongo;
