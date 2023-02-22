import mongoose from "mongoose";

async function connectDatabase(url: string) {
  mongoose.connect(url, (error) => {
    if (error) {
      console.log("⚡️[database]: Connect database failed!");
      return;
    }
    console.log("⚡️[database]: Connect database success!");
  });
}

export default connectDatabase;
