import mongoose from "mongoose";

interface IOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connection(options: IOptions) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      console.log("Connected 👍");
      return true;
    } catch (error) {
      console.log("Connection failed to mongodb");
      throw error;
    }
  }
}
