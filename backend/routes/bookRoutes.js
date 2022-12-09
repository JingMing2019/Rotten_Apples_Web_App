import express from 'express'

const router = express.Router()
import {
  getBooks,
  getBookById,
  deleteBook,
  updateBook,
  createBook,
  getReviewsByBookId,
  createBookReview,
  getTopBooks,
  getRecentReviewedBooks,
  deleteBookReview
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

router.route('/:id/reviews')
    .post(authToken, createBookReview)
    .get(getReviewsByBookId)
router.route('/:id/reviews/:reviewId').delete(authToken, deleteBookReview)


router.route('/:id')
    .get(getBookById)
    .delete(authToken, authAdminAndWriter, deleteBook)
    .put(authToken, authWriter, updateBook)

export default router
