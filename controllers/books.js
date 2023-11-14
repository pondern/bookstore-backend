import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getBook = async (req, res) => {
  try {
    const { title } = req.params;
    const book = await Book.findBookByTitle(title);

    if (book) {
      return res.json(book);
    }

    res.stauts(404).json({ message: "Book not found!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title } = req.params;
    const book = await Book.findByTitleAndUpdate(title, req.body);

    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { title } = req.params;
    const deleted = await Book.findByTitleAndDelete(title);

    if (deleted) {
      return res.status(200).send("Book deleted!");
    }

    throw new Error("Book not found!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};