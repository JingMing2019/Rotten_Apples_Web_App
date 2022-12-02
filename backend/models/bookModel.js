import mongoose from 'mongoose'
import { reviewSchema } from './reviewModel.js'

export const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    google_id: { type: String, default: '' },
    author: { type: String, required: true },
    image_url: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    stats: {
      numReviews: {
        type: Number,
        required: true,
        default: 0,
      },
      likes: {
        type: Number,
        default: 0,
      },
    },
    description : {type: String, required: true},
    publish_date: {type: Date, required: false},
    page: {type: Number, required: false},
    language: {type: String, required: false},
  },
  {
    timestamps: true,
  }
)

const Book = mongoose.model('Book', bookSchema);

export default Book;