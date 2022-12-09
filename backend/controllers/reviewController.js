import asyncHandler from 'express-async-handler' // asyncHandler is a middleware that is used to wrap async functions
import * as ReviewDao from "../daos/ReviewDao.js";

// @desc    Fetch all Reviews
// @route   GET /api/Reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
    const reviews = await ReviewDao.findReviews()

    res.json({
        success: true,
        count: reviews.length,
        data: reviews,
    })
})

// @desc    Fetch single Review
// @route   GET /api/Reviews/:id
// @access  Public
const getReviewById = asyncHandler(async (req, res) => {
    const review = await ReviewDao.findReviewById(req.params.id)

    res.json(review)
})

export {
    getReviews,
    getReviewById,
}