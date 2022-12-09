import {Review} from "../models/reviewModel.js";


export const findReviews = () => Review.find().sort({createdAt: 1})

export const findReviewsByBookId = (bid) => Review.find({book: bid})

export const findReviewById = (rid) => Review.findById(rid)

export const deleteReview = (rid) => Review.deleteOne({_id: rid})

export const createReview = (review) => Review.create(review)

export const updateReview = (rid, review) => Review.findByIdAndUpdate(rid, {...review}, {new : true})
