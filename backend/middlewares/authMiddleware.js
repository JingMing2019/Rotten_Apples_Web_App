import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { USER_ROLE_ADMIN, USER_ROLE_OWNER } from '../constants/userConstant.js'

// authenticate user by token before getting user profile
export const authToken = expressAsyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // token: 'Bearer <token string>', split by space and take the second part
      token = req.headers.authorization.split(' ')[1]
      // decoded: { id: 'xxx', iat: 123, exp: 123}
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // get the user data but exclude the password and add to attribute req.user
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }

})

export const authAdmin = (req, res, next) => {
  if (req.user && req.user.type === USER_ROLE_ADMIN) {
    next()
  } else {
    res.status(401)
    throw new Error('User is not an admin')
  }
}

export const authOwner = (req, res, next) => {
  if (req.user && req.user.type === USER_ROLE_OWNER) {
    next()
  } else {
    res.status(401)
    throw new Error('User is not a owner')
  }
}

