import express from 'express'

const router = express.Router()
import {
  getRestaurantById,
  deleteRestaurant,
  updateRestaurant,
  createRestaurantReview,
  getTopRestaurants,
  getRecentReviewedRestaurants,
  deleteRestaurantReview,
} from '../controllers/restaurantController.js'
import {
  authOwner,
  authToken,
} from '../middlewares/authMiddleware.js'

router.get('/top', getTopRestaurants)
router.get('/recent-reviewed', getRecentReviewedRestaurants)
router.route('/:id/reviews/:reviewId').delete(authToken, deleteRestaurantReview)
router.route('/:id/reviews').post(authToken, createRestaurantReview)
router
  .route('/:id')
  .get(getRestaurantById)
  .delete(authToken, authOwner, deleteRestaurant)
  .put(authToken, authOwner, updateRestaurant)

export default router
