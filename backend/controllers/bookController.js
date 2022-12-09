import asyncHandler from 'express-async-handler' // asyncHandler is a middleware that is used to wrap async functions
import Book from '../models/bookModel.js'
import { Review } from '../models/reviewModel.js'
import * as BookDao from "../daos/bookDao.js";
import {authAdmin, authWriter} from "../middlewares/authMiddleware.js";
import * as ReviewDao from "../daos/reviewDao.js";
import {USER_ROLE_ADMIN} from "../constants/userConstant.js";

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await BookDao.findBooks()

  res.json({
    success: true,
    count: books.length,
    data: books,
  })
})

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await BookDao.findBookById(req.params.id)

  res.json(book)
})

// @desc    Admin Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin and Private/Writer
// writer can only delete his own book
// admin can delete any books
const deleteBook = asyncHandler(async (req, res) => {
  if (authAdmin) {
    await BookDao.deleteBook(req.params.id)
    return res.sendStatus(200)
  } else if (authWriter && req.user.ownedBooks.includes(req.params.id)) {
    await BookDao.deleteBook(req.params.id)
    return res.sendStatus(200)
  } else {
    res.status(401)
    throw new Error('Not authorized')
  }

})

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Writer
const createBook = asyncHandler(async (req, res) => {
  const book = req.body

  const existed = await BookDao.checkBookExistsByItem(book.title, book.subtitle, book.authors, book.published_date)

  if (!existed) {
    const newBook = {
      title: book.title,
      subtitle: book.subtitle,
      authors: book.authors,
      image_url: book.image_url,
      rating: 0,
      reviews: [],
      liked: [],
      stats: {
        numReviews: 0,
        likes: 0,
      },
      description: book.description,
      published_date: book.published_date,
      page: book.page,
    }
    const createdBook = await BookDao.createBook(newBook)

    return res.status(201).json(createdBook)
  } else {
    res.status(400)
    throw new Error('Book already exists')
  }
})

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Writer
const updateBook = asyncHandler(async (req, res) => {
  if(req.user.ownedBooks.includes(req.params.id)) {
    const book = req.body

    await BookDao.findBookById(req.params.id)

    const updatedBook = await BookDao.updateBook(req.params.id, book)
    res.json(updatedBook)
  } else {
    res.status(400)
    throw new Error("Book can only be updated by the owner")
  }
})

// @desc    Fetch list of Reviews
// @route   GET /api/books/:bid/reviews
// @access  Public
const getReviewsByBookId = asyncHandler(async (req, res) => {
  const review = await ReviewDao.findReviewsByBookId(req.params.id)

  res.json(review)
})

// @desc    Create a new review
// @route   POST /api/books/:id/reviews
// @access  Private/loggedIn user
// TODO: update existing review
const createBookReview = asyncHandler(async (req, res) => {
  const { rating, comment, isAnonymous } = req.body

  const book = await BookDao.findBookById(req.params.id)

  const review = {
    name: req.user.name,
    rating: rating ? Number(rating) : -1,
    comment: comment,
    user: req.user._id,
    book: book._id,
    isAnonymous: isAnonymous
  }

  // Save to reviews
  const createdReview = await ReviewDao.createReview(review)
  // Save to books
  book.reviews.push(createdReview._id)

  const reviews = await ReviewDao.findReviewsByBookId(book._id)

  // Save book's review to this book
  let cumRating = 0
  let count = 0
  for (let i = 0; i < reviews.length; i++) {
    if (!book.reviews.includes(reviews[i]._id)) {
      book.reviews.push(reviews[i]._id)
    }
    if (reviews[i].rating !== -1) {
      cumRating += reviews[i].rating
      count += 1
    }
  }

  book.stats.numReviews = book.reviews.length
  book.rating = cumRating / count

  await book.save()
  res.status(201).json({ message: 'Review created' })
})

// @desc    Create a new review
// @route   POST /api/books/:id/reviews/:reviewId
// @access  Private/Reviewer
const deleteBookReview = asyncHandler(async (req, res) => {
  const review = await ReviewDao.findReviewById(req.params.reviewId)
  console.log(review, req.user)

  if (req.user.role === USER_ROLE_ADMIN || req.user._id.equals(review.user)) {
    const book = await BookDao.findBookById(req.params.id)

    book.reviews = book.reviews.filter(reviewId => !reviewId.equals(req.params.reviewId))
    await ReviewDao.deleteReview(req.params.reviewId)

    book.stats.numReviews = book.reviews.length || 0
    if (book.reviews.length !== 0) {
      const reviews = await ReviewDao.findReviewsByBookId(book._id)

      let cumRating = 0
      let count = 0
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].rating !== -1) {
          cumRating += reviews[i].rating
          count += 1
        }
      }
      book.rating = cumRating / count
      // book.rating = reviews.reduce((acc, curr) => {return acc + curr.rating}, 0) / reviews.length
    } else {
      book.rating = 0
    }

    await book.save()


    res.status(200).json({message: 'Review deleted'})
  } else {
    res.status(400)
    throw new Error("Book can only be deleted by admin or review's owner")
  }
})

// @desc    Get top rated books
// @route   GET /api/books/top
// @access  Public
// TODO: next
const getTopBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).sort({ rating: -1 }).limit(3)

  res.json(books)
})

// @desc    Get recent-reviewed books
// @route   GET /api/books/recent-reviewed
// @access  Public
const getRecentReviewedBooks = asyncHandler(async (req, res) => {
  const books = await Review.find({})
    .sort({ createdAt: -1 })
    .populate('book')
    .limit(3)

  res.json(books)
})

export {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  getReviewsByBookId,
  createBookReview,
  getTopBooks,
  getRecentReviewedBooks,
  deleteBookReview
}
