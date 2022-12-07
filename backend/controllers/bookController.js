import asyncHandler from 'express-async-handler' // asyncHandler is a middleware that is used to wrap async functions
import Book from '../models/bookModel.js'
import { Review } from '../models/reviewModel.js'

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find()
  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  })
})

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  // CastError -> The problem is that its not a valid _id string.
  // It has to be either 12 byte binary string, or a 24 hex byte string.
  const book = await Book.findById(req.params.id)

  if (book) {
    res.json(book)
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Writer
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    await book.remove()
    res.json({ message: 'Book removed' })
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Writer
const createBook = asyncHandler(async (req, res) => {
  console.log(req.body)
  const book = req.body
  const createdBook = await Book.create({
    title: book.title,
    subtitle: book.subtitle,
    authors: book.authors,
    image_url: book.image_url,
    rating: book.image_url,
    reviews: book.reviews,
    stats: book.stats,
    description: book.description,
    published_date: book.published_date,
    page: book.page,
  })

  // const createdBook = await book.save()
  res.status(201).json(createdBook)
})

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Writer
const updateBook = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, address, image_url, is_closed, rating, stats } = req.body

  const book = await Book.findById(req.params.id)

  if (book) {
    book.name = name
    book.address = address
    book.image_url = image_url
    book.is_closed = is_closed
    book.rating = rating
    book.stats = stats

    const updatedBook = await book.save()
    res.json(updatedBook)
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Create a new review
// @route   POST /api/books/:id/reviews
// @access  Private/Reviewer
const createBookReview = asyncHandler(async (req, res) => {
  const { rating, comment, isAnonymous } = req.body

  const book = await Book.findById(req.params.id)
  if (book) {

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
      book: book._id,
      isAnonymous: isAnonymous
    }

    book.reviews.push(review)

    await Review.create(review)

    book.stats.numReviews = book.reviews.length
    book.rating =
      book.reviews.reduce((acc, curr) => {
        return acc + curr.rating
      }, 0) / book.reviews.length

    await book.save()
    res.status(201).json({ message: 'Review created' })
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Create a new review
// @route   POST /api/books/:id/reviews/:reviewId
// @access  Private/Reviewer
const deleteBookReview = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)
  if (book) {

    book.reviews = book.reviews.filter(review => !review._id.equals(req.params.reviewId))

    book.stats.numReviews = book.reviews.length || 0
    if (book.reviews.length !== 0) {
      book.rating =
        book.reviews.reduce((acc, curr) => {
          return acc + curr.rating
        }, 0) / book.reviews.length
    } else {
      book.rating = 0
    }


    await book.save()

    res.status(201).json({ message: 'Review created' })
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Get top rated books
// @route   GET /api/books/top
// @access  Public
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
  createBookReview,
  getTopBooks,
  getRecentReviewedBooks,
  deleteBookReview
}
