// 🚨 Validación de entorno

import { envs, MongoDatabase } from "../config";
import { CategoryModel, ProductModel, UserModel } from "../models";
import { seedData } from "./data";

if (!envs.NODE_ENV) {
  console.error("❌ NODE_ENV is not defined. Aborting seed");
  process.exit(1);
}
if (envs.NODE_ENV !== "development") {
  console.error("❌ The seed can only be executed in development mode.");
  process.exit(1);
}

(async () => {
  await MongoDatabase.connected({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  await MongoDatabase.disconnect();
})();

const randomBetween0AndX = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {
  //1. Delete all data
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  //2. Create users
  const users = await UserModel.insertMany(seedData.users);

  //3. Create categories

  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => ({
      ...category,
      user: users[randomBetween0AndX(seedData.users.length - 1)]._id,
    })),
  );

  //4. Create products
  const products = await ProductModel.insertMany(
    seedData.products.map((product) => ({
      ...product,
      user: users[randomBetween0AndX(seedData.users.length - 1)]._id,
      category:
        categories[randomBetween0AndX(seedData.categories.length - 1)]._id,
    })),
  );

  console.log("SEEDED");
}
