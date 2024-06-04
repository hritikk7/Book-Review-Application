const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  genre: { type: String },
  averageRating: { type: Number, default: 0 },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = model("Book", BookSchema);
