// Find more information about this `googleapis` library at
// https://github.com/googleapis/google-api-nodejs-client
import { google } from 'googleapis'
import Book from '../models/bookModel.js'

const booksClient = google.books({
  version: "v1",
  auth: process.env.GOOGLE_API_KEY,
})

// Search for Google books volumes that contain this keyword string in title.
// Ref: https://developers.google.com/books/docs/v1/using#WorkingVolumes
export const findBookByKeyword = async (req, res, next) => {
  const keyword = req.params.keyword;

  try {
    // Find a list of english books that contains keyword in title.
    // The list is ordered by the books' publish date.
    const books = await booksClient.volumes.list({
      // Case1: search keyword in all texts
      // q: keyword,
      // Case2: search one word in title AND one word in authors
      // q: "intitle:flowers+inauthor:keyes",
      // Case3: search keyword only in title
      q: "intitle:" + keyword,
      // Return results in order of most recently to least recently published.
      orderBy: "newest",
      // Return english books.
      langRestrict: "en",
      // Return just books.
      // printType: "books",
      // Only returns results where all the text is viewable
      // filter: "full",
      // Start from index 0, the list will contain `maxResults` items. If not specified, the list contains 10 items.
      // startIndex: 0,
      // maxResults: 5,
    });
    res.json(books);
  } catch(error) {
    next(error);
  }
}

// get book detail by its volume ID in google books V1 API
// Ref: https://developers.google.com/books/docs/v1/using#ids-on-google-books-site
export const findBookDetailByID = async (req, res, next) => {
  const book_id = req.params._id;

  try {
    const book = await booksClient.volumes.get({
      // ISO-3166-1 code to override the IP-based location. Default is your IP-based location.
      // country: 'US',
      // ID of volume to retrieve.
      volumeId: book_id,
    });
    res.json(book);
  } catch(error) {
    // pass an error to next() to let it be handled by the built-in error handler
    next(error);
  }
}

// @desc    Save a book from Google Books
// @route   PUT /api/google/books
// @access  Public
export const saveGoogleBook = async (req, res, next) => {
  const book = req.body;

  try {
    const existed = await Book.findOne({google_id: book.id})

    if (existed) {
      res.status(200).json({
        _id: existed._id,
        google_id: existed.google_id,
        title: existed.title,
        subtitle: existed.subtitle,
        authors: existed.authors,
        image_url: existed.image_url,
        rating: existed.rating,
        reviews: existed.reviews,
        stats: existed.stats,
        description: existed.description,
        published_date: existed.published_date,
        page: existed.page,
      })
    } else {
      // Create Book under BookSchema using Google Books API information
      const createdBook = await Book.create({
        google_id: book.id,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        authors: book.volumeInfo.authors,
        image_url: book.volumeInfo.imageLinks.thumbnail,
        rating: 0,
        reviews: [],
        stats: {
          numReviews: 0,
          likes: 0,
        },
        description: book.volumeInfo.description,
        published_date: book.volumeInfo.publishedDate,
        page: book.pageCount,
      })
      res.status(201).json(createdBook)
    }
  } catch(error) {
    next(error)
  }
}
