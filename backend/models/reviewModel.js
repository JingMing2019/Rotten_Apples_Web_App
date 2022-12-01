import mongoose from 'mongoose'

export const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Review = mongoose.model('Review', reviewSchema)
