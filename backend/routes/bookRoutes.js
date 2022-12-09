import express from 'express'

const router = express.Router()
import {
  getBookById,
  deleteBook,
  updateBook,
  createBookReview,
  getTopBooks,
  getRecentReviewedBooks,
  deleteBookReview, createBook, getBooks
} from '../controllers/bookController.js'
import {
  authWriter,
  authToken,
  authAdmin, authAdminAndWriter
} from '../middlewares/authMiddleware.js'

router.route('/')
    .get(getBooks)
    .post(authToken, authWriter, createBook)

router.get('/top', getTopBooks)
router.get('/recent-reviewed', getRecentReviewedBooks)

router.route('/:id/reviews').post(authToken, createBookReview)
router.route('/:id/reviews/:reviewId').delete(authToken, deleteBookReview)


router.route('/:id')
    .get(getBookById)
    .delete(authToken, authAdminAndWriter, deleteBook)
    .put(authToken, authWriter, updateBook)

export default router
