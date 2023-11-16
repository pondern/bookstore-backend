import db from "../db/connection.js";
import User from "../models/User.js";
import Book from "../models/Book.js";
import Library from "../models/Library.js";
import collections from "./books.json" assert { type: "json" };
import chalk from "chalk";
import bcrypt from "bcrypt";
let scrubbedBooks = [];
const insertData = async () => {
  try {
    await db.dropDatabase();

    collections.forEach((collection) => {
      collection.books.forEach((book) => {
        scrubbedBooks.push({
          display_name: collection.display_name,
          title: book.title,
          author: book.author,
          book_image: book.book_image,
          publisher: book.publisher,
          description: book.description,
          buy_links: book.buy_links,
          rank: book.rank,
          weeks_on_list: book.weeks_on_list,
        });
      });
    });

    const titleSet = new Set();
    scrubbedBooks = scrubbedBooks.filter((book) => {
      const isDuplicate = titleSet.has(book.title);
      titleSet.add(book.title);
      return !isDuplicate;
    });
    await Book.create(scrubbedBooks);

    console.log(chalk.green("Database seeded successfully"));

    const user1 = new User({
      username: "mike",
      email: "mike@super.gmail.com",
      password_digest: await bcrypt.hash("xyz123", 11),
    });

    await user1.save();

    const user1Library = new Library({
      books: [],
      userId: user1._id,
    });

    await user1Library.save();

    const user2 = new User({
      username: "raul",
      email: "ra@super.gmail.com",
      password_digest: await bcrypt.hash("xyz123", 11),
    });
    await user2.save();

    const user2Library = new Library({
      books: [],
      userId: user2._id,
    });

    await user2Library.save();

    const user3 = new User({
      username: "enzo",
      email: "enzo@super.gmail.com",
      password_digest: await bcrypt.hash("xyz123", 11),
    });
    await user3.save();

    const user3Library = new Library({
      books: [],
      userId: user3._id,
    });

    await user3Library.save();

    await db.close();
  } catch (error) {
    console.error(chalk.red(`Error seeding database: ${error.message}`));
  }
};

insertData();
