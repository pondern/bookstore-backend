import Library from "../models/Library.js";

export const getUserLibrary = async (req, res) => {
  try {
    const { userId } = req.params;
    const userLibrary = await Library.find({ userId: userId }).populate(
      "books.book"
    );

    if (userLibrary) {
      return res.json(userLibrary[0]);
    }

    res.status(404).json({ message: "Library not found!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

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

export const removeBookFromLibrary = async (req, res) => {
  try {
    const { libraryId, bookReviewId } = req.params;

    await Library.findByIdAndUpdate(libraryId, {
      $pull: { books: { _id: bookReviewId } },
    });

    res.status(201).json("Book removed from library successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const editBookInLibrary = async (req, res) => {
  try {
    const { libraryId, bookReviewId } = req.params;
    const { stars, comment } = req.body;

    await Library.findOneAndUpdate(
      { _id: libraryId, "books._id": bookReviewId },
      {
        $set: {
          "books.$.stars": stars,
          "books.$.comment": comment,
        },
      }
    );

    res.status(201).json("Book from library updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteLibrary = async (req, res) => {
  try {
    const { libraryId } = req.params;

    await Library.findByIdAndDelete(libraryId);

    res.status(201).json("Library deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllLibraries = async (req, res) => {
  try {
    const allLibraries = await Library.find().populate("books.book");

    res.status(200).json(allLibraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
