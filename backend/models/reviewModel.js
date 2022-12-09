import mongoose from 'mongoose'

export const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false },
    rating: { type: Number, required: false },
    comment: { type: String, required: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Review = mongoose.model('Review', reviewSchema)
