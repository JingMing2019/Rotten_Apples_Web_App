import mongoose from 'mongoose'
import { reviewSchema } from './reviewModel.js'

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    yelp_id: { type: String, default: '' },
    address: { type: String, required: true },
    image_url: { type: String, required: true },
    is_closed: { type: Boolean, required: true },
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
  },
  {
    timestamps: true,
  }
)

const Book = mongoose.model('Book', bookSchema)

export default Book