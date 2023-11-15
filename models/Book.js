import mongoose from "mongoose";

const Schema = mongoose.Schema;

let BookSchema = new Schema({
  title: { type: String },
  author: { type: String },
  image: { type: String },
  publisher: { type: String },
  description: { type: String },
  buy_links: [{ type: String }],
  rank: { type: String },
  weeks_on_list: { type: String },
  display_name: { type: String },
});

export default mongoose.model("books", BookSchema);
