import Library from "../models/Library.js";

export const addBookToLibrary = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const { stars, comment } = req.body;

    // Check if the book already exists in the library
    const existingBook = await Library.findOne({
      userId: userId,
      "books.book": bookId,
    });

    if (existingBook) {
      // If the book already exists, update the stars and comment
      await Library.updateOne(
        { userId: userId, "books.book": bookId },
        {
          $set: {
            "books.$.stars": stars,
            "books.$.comment": comment,
          },
        }
      );
    } else {
      // If the book doesn't exist, add a new entry
      await Library.updateOne(
        { userId: userId },
        {
          $push: {
            books: { book: bookId, stars: stars, comment: comment },
          },
        },
        { upsert: true } // Creates the document if it doesn't exist
      );
    }

    res.status(201).json("Book added to library successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
