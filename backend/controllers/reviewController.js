import asyncHandler from 'express-async-handler' // asyncHandler is a middleware that is used to wrap async functions
import * as ReviewDao from "../daos/reviewDao.js";
import * as BookDao from "../daos/bookDao.js";
import {USER_ROLE_ADMIN} from "../constants/userConstant.js";

// @desc    Fetch all Reviews
// @route   GET /api/reviews
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
// @route   GET /api/reviews/:id
// @access  Public
const getReviewById = asyncHandler(async (req, res) => {
    const review = await ReviewDao.findReviewById(req.params.id)

    res.json(review)
})

// @desc    Fetch list of Reviews
// @route   GET /api/reviews/book/:bid
// @access  Public
const getReviewsByBookId = asyncHandler(async (req, res) => {
    const reviews = await ReviewDao.findReviewsByBookId(req.params.bid)

    res.json({
        success: true,
        count: reviews.length,
        data: reviews,
    })
})

const calculateRatingAndCount = (reviews) => {
    let cumRating = 0
    let count = 0
    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].rating !== -1) {
            cumRating += reviews[i].rating
            count += 1
        }
    }
    
    return { "cumRating" : cumRating, "count" : count }
}

// @desc    Create a new review
// @route   POST /api/reviews/book/:bid
// @access  Private/loggedIn user
// TODO: update existing review
const createBookReview = asyncHandler(async (req, res) => {
    const { rating, comment, isAnonymous } = req.body
    // get book
    const book = await BookDao.findBookById(req.params.bid)
    // generate new review
    const review = {
        name: req.user.name,
        rating: rating ? Number(rating) : -1,
        comment: comment,
        user: req.user._id,
        book: req.params.bid,
        isAnonymous: isAnonymous
    }

    // Save to reviews
    await ReviewDao.createReview(review)
    // calculate book new rating
    const reviews = await ReviewDao.findReviewsByBookId(req.params.bid)
    let { cumRating, count } = calculateRatingAndCount(reviews)
    book.stats.numReviews = count
    book.rating = cumRating / count
    await book.save()

    res.status(201).json({ message: 'Review created' })
})

// @desc    Create a new review
// @route   POST /api/reviews/book/:bid/:rid
// @access  Private/Reviewer
const deleteBookReview = asyncHandler(async (req, res) => {
    const review = await ReviewDao.findReviewById(req.params.rid)

    if (req.user.role === USER_ROLE_ADMIN || req.user._id.equals(review.user)) {
        // delete certain review
        await ReviewDao.deleteReview(req.params.rid)
        // get book
        const book = await BookDao.findBookById(req.params.bid)
        // calculate new rating
        const reviews = await ReviewDao.findReviewsByBookId(req.params.bid)
        let { cumRating, count } = calculateRatingAndCount(reviews)
        // update book attribute value and save
        book.stats.numReviews = count
        book.rating = cumRating / count
        await book.save()

        res.status(200).json({message: 'Review deleted'})
    } else {
        res.status(400)
        throw new Error("Book can only be deleted by admin or review's owner")
    }
})

export {
    getReviews,
    getReviewById,
    getReviewsByBookId,
    createBookReview,
    deleteBookReview
}