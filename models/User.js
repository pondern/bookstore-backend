import mongoose from "mongoose";

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    library: [{
        book: { type: Schema.Types.ObjectId, ref: 'Book' },
        stars: { type: Number, min: 1, max: 5 },
        comment: { type: String },
    }],
});

export default mongoose.model("users", UserSchema);