import express from 'express'
import {
  loginUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  likeBook,
  unlikeBook,
  getUserProfileById
} from '../controllers/userController.js'
import { authToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)

router.route('/login').post(loginUser)

router.route('/profile/:id').get(getUserProfileById)

// authenticate user by token before getting/updating user profile
router.route('/profile')
  .get(authToken, getUserProfile)
  .put(authToken, updateUserProfile)

router.route('/book/:id')
  .delete(authToken, unlikeBook)
  .put(authToken, likeBook)


export default router