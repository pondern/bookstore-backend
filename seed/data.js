import db from "../db/connection.js";
import User from "../models/User.js";
import Book from "../models/Book.js";
import User from "./users.json" assert {type: "json"};
import books from "./books.json" assert {type: "json"};
import chalk from "chalk";
import User from "../models/User.js";
import Book from "../models/Book.js";

const insertData = async () => {
    // Reset Database
    await db.dropDatabase();

    // Insert Data
    await Book.create(books);
    await User.create(users);

    console.log(chalk.magenta("Books and Users creates!"));
    
    // Close DB Connection
    await db.close();
}

insertData()