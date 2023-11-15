import mongoose from "mongoose";

const Schema = mongoose.Schema;

let BookSchema = new Schema({
  title: { type: String },
  author: { type: String },
  book_image: { type: String },
  publisher: { type: String },
  description: { type: String },
  buy_links: [
    {
      name: { type: String },
      url: { type: String },
    },
  ],
  rank: { type: Number },
  weeks_on_list: { type: Number },
  display_name: { type: String },
});

export default mongoose.model("books", BookSchema);
