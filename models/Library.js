import mongoose from "mongoose";

const Schema = mongoose.Schema;

let LibrarySchema = new Schema({
  books: [
    {
      book: { type: Schema.Types.ObjectId, ref: "books" },
      stars: { type: Number, min: 1, max: 5 },
      comment: { type: String },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "users" },
});

export default mongoose.model("libraries", LibrarySchema);
