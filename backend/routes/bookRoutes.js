import express from 'express'

const router = express.Router()
import {
  getBookById,
  deleteBook,
  updateBook,
  createBookReview,
  getTopBooks,
  getRecentReviewedBooks,
  deleteBookReview, createBook, getBooks,
} from '../controllers/bookController.js'
import {
  authWriter,
  authToken,
  authAdmin,
} from '../middlewares/authMiddleware.js'

router.get('/top', getTopBooks)
router.get('/recent-reviewed', getRecentReviewedBooks)
router.route('/:id/reviews/:reviewId').delete(authToken, deleteBookReview)
router.route('/:id/reviews').post(authToken, createBookReview)
router.route('/:id')
  .get(getBookById)
  .delete(authToken, authWriter, deleteBook)
  .put(authToken, authWriter, updateBook)
router.post("/", createBook)

router.get('/', getBooks)
export default router
