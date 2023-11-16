import mongoose from "mongoose";
import chalk from "chalk";

const connectionString =
  process.env.DB_URL || "mongodb://127.0.0.1:27017/bookstore-api";

mongoose.set("returnOriginal", false);

mongoose.connect(connectionString).catch((err) => {
  console.log(`Error connection go MongoDB: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(chalk.bold("Disconnected from MongoDB!!"));
});

mongoose.connection.on("error", (err) => {
  console.log(chalk.red(`MongoDB connection error: ${err}`));
});

export default mongoose.connection;
