import mongoose from "mongoose";

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true,},
    email: { type: String, required: true, },
    password_digest: { type: String, required: true, select: false },
    library: [{
        book: { type: Schema.Types.ObjectId, ref: 'Book' },
        stars: { type: Number, min: 1, max: 5 },
        comment: { type: String },
    
    }],
    
    display_name: { type: String}
});

export default mongoose.model("users", UserSchema);