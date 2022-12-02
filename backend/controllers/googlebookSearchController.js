import yelp from 'yelp-fusion'
import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'

const client = yelp.client('1wlU5YQHyNhUchE04oorjxwgZMFenZJDInO5TzQP6dVNMSevR-0IiK0D5NbhfvewdjWArJ9DBvh5Kajp_XrqICOXLD9Y1GMBK-rMx2wlnQ_6PeeRTE6-TJPVX3NjYnYx')

export const findBookByKeyword = asyncHandler(async (req, res) => {
  const keyword = req.params['keyword']

  const books = await client.search({
    term: keyword,
    location: 'USA',
    limit: 5,
  })

  res.json(books.jsonBody)
  // const prettyJson = JSON.stringify(restaurants.jsonBody, null, 4)
})

export const findBookDetailByID = asyncHandler(async (req, res) => {
  const _id = req.params._id
  const book = await client.business(_id)

  res.json(book.jsonBody)
  // const prettyJson = JSON.stringify(restaurant.jsonBody, null, 4)
})


// @desc    Save a book from Google Books
// @route   POST /api/google/books
// @access  Public
export const saveGoogleBookBook = asyncHandler(async (req, res) => {
  const book = req.body
  const existed = await Book.findOne({ yelp_id: book.id })

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
    const createdBook = await Book.create({
      yelp_id: book.id,
      name: book.name,
      address: book.location.address1,
      image_url: book.image_url,
      is_closed: book.is_closed,
      rating: 0,
      reviews: [],
      stats: {
        numReviews: 0,
        likes: 0,
      },
    })
    res.status(201).json(createdBook)
  }

})
