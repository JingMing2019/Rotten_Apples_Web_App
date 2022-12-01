import express from 'express'

const router = express.Router()
import {
  getBookById,
  deleteBook,
  updateBook,
  createBookReview,
  getTopBooks,
  getRecentReviewedBooks,
  deleteBookReview,
} from '../controllers/bookController.js'
import {
  authOwner,
  authToken,
} from '../middlewares/authMiddleware.js'

router.get('/top', getTopBooks)
router.get('/recent-reviewed', getRecentReviewedBooks)
router.route('/:id/reviews/:reviewId').delete(authToken, deleteBookReview)
router.route('/:id/reviews').post(authToken, createBookReview)
router
  .route('/:id')
  .get(getBookById)
  .delete(authToken, authOwner, deleteBook)
  .put(authToken, authOwner, updateBook)

export default router
