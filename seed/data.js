import db from "../db/connection.js";
import User from "../models/User.js";
import Book from "../models/Book.js";
import Library from "../models/Library.js";
import collections from "./books.json" assert { type: "json" };
import chalk from "chalk";
import bcrypt from "bcrypt";

const insertData = async () => {
  await db.dropDatabase();

  let scrubbedBooks = [];

  collections.forEach((collection) => {
    let splitName = collection.display_name.split(" ");
    let display_name = splitName[splitName.length - 1];

    collection.books.forEach((book) => {
      scrubbedBooks.push({
        display_name,
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

  await Book.create(scrubbedBooks);

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

  console.log(chalk.magenta("Books and Users created!"));

  await db.close();
};

insertData();
