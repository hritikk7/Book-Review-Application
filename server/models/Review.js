const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
  });
  
module.exports = model('Review', ReviewSchema);