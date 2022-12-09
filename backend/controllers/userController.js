import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import Book from '../models/bookModel.js'

// @desc    register new suer
// @routes  POST /api/users
// @access  public
export const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, location, role } = req.body
  const existUser = await User.findOne({ email })

  // check if user exists
  if (existUser) {
    console.log("reach here")
    res.status(400)
    throw new Error('User already exists')
  }

  const name = firstname + ' ' + lastname
  // if not exist, create a new user
  const user = await User.create({
    name,
    firstname,
    lastname,
    email,
    password,
    location,
    role,
    likedBooks: []
  })

  // response the new user data with token
  if (user) {
    res.status(201).json({
      ...formatUserResponse(user),
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Auth user and get token
// @routes   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // find user by email
  const user = await User.findOne({ email })

  // if user exists and password matches, return user data with token
  if (user && (await user.matchPassword(password))) {
    res.json(formatUserLoginResponse(user))
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Get user profile
// @routes   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is defined in authMiddleware
  const user = await User.findById(req.user._id)
  if (user) {
    res.json(formatUserResponse(user))
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @routes   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  // get user by id
  const user = await User.findById(req.user._id)
  // update the updated attributes
  if (user) {
    user.firstname = req.body.firstname || user.firstname
    user.lastname = req.body.lastname || user.lastname
    user.name = user.firstname + ' ' + user.lastname
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    user.bio = req.body.bio || user.bio
    user.location = req.body.location || user.location
    // save the updated user
    const updatedUser = await user.save()
    // return the updated user
    res.json(formatUserResponse(updatedUser))
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})

// @desc    Get user profile by id (only basic information)
// @routes   GET /api/users/profile/:id
// @access  Public
export const getUserProfileById = asyncHandler(async (req, res) => {
  // req.user is defined in authMiddleware
  const otherUser = await User.findById(req.params.id)
  if (otherUser) {
    res.json({
      _id: otherUser._id,
      name: otherUser.name,
      firstname: otherUser.firstname,
      lastname: otherUser.lastname,
      bio: otherUser.bio,
      location: otherUser.location,
      likedBooks: otherUser.likedBooks,
    })
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})

// @desc    like book
// @routes   PUT /api/users/book/:id
// @access  Private
export const likeBook = asyncHandler(async (req, res) => {
  // get user by id
  const user = await User.findById(req.user._id)
  let book = await Book.findById(req.params.id)
  // update user liked list
  if (user && book) {
    user.likedBooks.push({
      title: book.title,
      image_url: book.image_url,
      book: book._id
    })
    console.log(user.likedBooks)
    const updatedUser = await user.save()

    // add book likes
    book.liked.push(req.user._id.toString())
    console.log(book.liked)
    await book.save()

    res.json(formatUserResponse(updatedUser))
  } else if (!user) {
    res.status(401)
    throw new Error('User not found')
  } else if (!book) {
    res.status(401)
    throw new Error('Book not found')
  }
})

// @desc    unlike book
// @routes   DELETE /api/users/book/:id
// @access  Private
export const unlikeBook = asyncHandler(async (req, res) => {
  // get user by id
  const user = await User.findById(req.user._id)
  let book = await Book.findById(req.params.id)
  // const book = await Book.findById(req.book._id)
  // update user liked list
  if (user && book) {
    user.likedBooks = user.likedBooks.filter(
      (data) => !data.book.equals(book._id)
    )
    const updatedUser = await user.save()

    // add book likes
    book.liked = book.liked.filter(item => req.user._id.toString() !== item)
    console.log(book.liked, req.user._id)
    await book.save()

    res.json(formatUserResponse(updatedUser))
  } else if (!user) {
    res.status(401)
    throw new Error('User not found')
  } else if (!book) {
    res.status(401)
    throw new Error('Book not found')
  }
})

const formatUserResponse = (user) => {
  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio,
    location: user.location,
    likedBooks: user.likedBooks,
    ownedBooks: user.ownedBooks,
  }
}

const formatUserLoginResponse = (user) => {
  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    role: user.role,
    ownedBooks: user.ownedBooks,
    likedBooks: user.likedBooks,
  }
}
