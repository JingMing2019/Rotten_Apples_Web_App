// Find more information about this `googleapis` library at
// https://github.com/googleapis/google-api-nodejs-client
import { google } from 'googleapis'
import asyncHandler from 'express-async-handler'
import * as BookDao from "../daos/bookDao.js";

const booksClient = google.books({
  version: "v1",
  auth: process.env.GOOGLE_API_KEY,
})

// @desc    find book with keyword in title from Google Books V1 API
// @route   Get /api/google/books/:keyword
// @access  Public
// Search for Google books volumes that contain this keyword string in title.
// Ref: https://developers.google.com/books/docs/v1/using#WorkingVolumes
export const findBookByKeyword = asyncHandler(async (req, res) => {
  const keyword = req.params.keyword;

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

})

// @desc    find book by google id from Google Books V1 API
// @route   Get /api/google/books/:id
// @access  Public
// get book detail by its volume ID in google books V1 API
// Ref: https://developers.google.com/books/docs/v1/using#ids-on-google-books-site
export const findBookDetailByID = asyncHandler(async (req, res) => {
  const book_id = req.params._id;

  const book = await booksClient.volumes.get({
    // ISO-3166-1 code to override the IP-based location. Default is your IP-based location.
    // country: 'US',
    // ID of volume to retrieve.
    volumeId: book_id,
  });
  res.json(book);
})

// @desc    Save a book from Google Books
// @route   PUT /api/google/books
// @access  Public
export const saveGoogleBook = asyncHandler(async (req, res) => {
  const googleBook = req.body;

  let newBook = {
    google_id: googleBook.id,
    title: googleBook.volumeInfo.title,
    subtitle: googleBook.volumeInfo.subtitle,
    authors: googleBook.volumeInfo.authors,
    image_url: googleBook.volumeInfo.imageLinks.thumbnail,
    description: googleBook.volumeInfo.description,
    published_date: googleBook.volumeInfo.publishedDate,
    page: googleBook.pageCount,
  }

  // const existed = await Book.findOne({google_id: googleBook.id})
  const existed = await BookDao.findBookByGoogleId(googleBook.id)

  if (existed) {
    const updatedBook = await BookDao.updateBookByGoogleId(googleBook.id, newBook)
    res.json(updatedBook)
  } else {
    // Create Book under BookSchema using Google Books API information
    newBook = {
      ...newBook,
      rating: 0,
      liked: [],
      stats: {
        numReviews: 0,
        likes: 0,
      }
    }
    const createdBook = await BookDao.createBook(newBook)
    res.json(createdBook)
  }
})
