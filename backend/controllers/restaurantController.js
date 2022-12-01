import asyncHandler from 'express-async-handler' // asyncHandler is a middleware that is used to wrap async functions
import Restaurant from '../models/restaurantModel.js'
import { Review } from '../models/reviewModel.js'

// @desc    Fetch all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find()
  res.status(200).json({
    success: true,
    count: restaurants.length,
    data: restaurants,
  })
})

// @desc    Fetch single restaurant
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = asyncHandler(async (req, res) => {
  // CastError -> The problem is that its not a valid _id string.
  // It has to be either 12 byte binary string, or a 24 hex byte string.
  const restaurant = await Restaurant.findById(req.params.id)

  if (restaurant) {
    res.json(restaurant)
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

// @desc    Delete a restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private/Owner
const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id)

  if (restaurant) {
    await restaurant.remove()
    res.json({ message: 'Restaurant removed' })
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

// @desc    Create a restaurant
// @route   POST /api/restaurants
// @access  Private/Owner
const createRestaurant = asyncHandler(async (req, res) => {
  const restaurant = new Restaurant({
    name: 'Sample name',
    address: 'Sample address',
    user: req.user._id,
    image_url: '/images/sample.jpg',
    is_closed: false,
    stats: {
      numReviews: 0,
      rating: 0,
      likes: 0,
    },
  })

  const createdRestaurant = await restaurant.save()
  res.status(201).json(createdRestaurant)
})

// @desc    Update a restaurant
// @route   PUT /api/restaurants/:id
// @access  Private/Owner
const updateRestaurant = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, address, image_url, is_closed, rating, stats } = req.body

  const restaurant = await Restaurant.findById(req.params.id)

  if (restaurant) {
    restaurant.name = name
    restaurant.address = address
    restaurant.image_url = image_url
    restaurant.is_closed = is_closed
    restaurant.rating = rating
    restaurant.stats = stats

    const updatedRestaurant = await restaurant.save()
    res.json(updatedRestaurant)
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

// @desc    Create a new review
// @route   POST /api/restaurants/:id/reviews
// @access  Private/Reviewer
const createRestaurantReview = asyncHandler(async (req, res) => {
  const { rating, comment, isAnonymous } = req.body

  const restaurant = await Restaurant.findById(req.params.id)
  if (restaurant) {

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
      restaurant: restaurant._id,
      isAnonymous: isAnonymous
    }

    restaurant.reviews.push(review)

    await Review.create(review)

    restaurant.stats.numReviews = restaurant.reviews.length
    restaurant.rating =
      restaurant.reviews.reduce((acc, curr) => {
        return acc + curr.rating
      }, 0) / restaurant.reviews.length

    await restaurant.save()
    res.status(201).json({ message: 'Review created' })
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

// @desc    Create a new review
// @route   POST /api/restaurants/:id/reviews/:reviewId
// @access  Private/Reviewer
const deleteRestaurantReview = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id)
  if (restaurant) {

    restaurant.reviews = restaurant.reviews.filter(review => !review._id.equals(req.params.reviewId))

    restaurant.stats.numReviews = restaurant.reviews.length || 0
    if (restaurant.reviews.length !== 0) {
      restaurant.rating =
        restaurant.reviews.reduce((acc, curr) => {
          return acc + curr.rating
        }, 0) / restaurant.reviews.length
    } else {
      restaurant.rating = 0
    }


    await restaurant.save()

    res.status(201).json({ message: 'Review created' })
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

// @desc    Get top rated restaurants
// @route   GET /api/restaurants/top
// @access  Public
const getTopRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({}).sort({ rating: -1 }).limit(3)

  res.json(restaurants)
})

// @desc    Get recent-reviewed restaurants
// @route   GET /api/restaurants/recent-reviewed
// @access  Public
const getRecentReviewedRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Review.find({})
    .sort({ createdAt: -1 })
    .populate('restaurant')
    .limit(3)

  res.json(restaurants)
})

export {
  getRestaurants,
  getRestaurantById,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
  createRestaurantReview,
  getTopRestaurants,
  getRecentReviewedRestaurants,
  deleteRestaurantReview
}
