import yelp from 'yelp-fusion'
import asyncHandler from 'express-async-handler'
import Restaurant from '../models/restaurantModel.js'

const client = yelp.client('1wlU5YQHyNhUchE04oorjxwgZMFenZJDInO5TzQP6dVNMSevR-0IiK0D5NbhfvewdjWArJ9DBvh5Kajp_XrqICOXLD9Y1GMBK-rMx2wlnQ_6PeeRTE6-TJPVX3NjYnYx')

export const findResByKeyword = asyncHandler(async (req, res) => {
  const keyword = req.params['keyword']

  const restaurants = await client.search({
    term: keyword,
    location: 'USA',
    limit: 5,
  })

  res.json(restaurants.jsonBody)
  // const prettyJson = JSON.stringify(restaurants.jsonBody, null, 4)
})

export const findResDetailByID = asyncHandler(async (req, res) => {
  const _id = req.params._id
  const restaurant = await client.business(_id)

  res.json(restaurant.jsonBody)
  // const prettyJson = JSON.stringify(restaurant.jsonBody, null, 4)
})


// @desc    Save a restaurant from Yelp
// @route   POST /api/yelp/restaurants
// @access  Public
export const saveYelpRestaurant = asyncHandler(async (req, res) => {
  const restaurant = req.body
  const existed = await Restaurant.findOne({ yelp_id: restaurant.id })

  if (existed) {
    res.status(200).json({
      _id: existed._id,
      yelp_id: existed.yelp_id,
      name: existed.name,
      address: existed.address,
      image_url: existed.image_url,
      is_closed: existed.is_closed,
      rating: existed.rating,
      reviews: existed.reviews,
      stats: existed.stats,
    })
  } else {
    const createdRestaurant = await Restaurant.create({
      yelp_id: restaurant.id,
      name: restaurant.name,
      address: restaurant.location.address1,
      image_url: restaurant.image_url,
      is_closed: restaurant.is_closed,
      rating: 0,
      reviews: [],
      stats: {
        numReviews: 0,
        likes: 0,
      },
    })
    res.status(201).json(createdRestaurant)
  }

})
