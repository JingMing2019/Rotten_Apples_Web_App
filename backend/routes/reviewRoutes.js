import express from 'express'

const router = express.Router()
import {
    getReviewById, getReviews
} from '../controllers/reviewController.js'

router.route('/').get(getReviews)
router.route('/:id').get(getReviewById)


export default router