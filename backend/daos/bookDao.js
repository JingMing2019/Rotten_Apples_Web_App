import Book from '../models/bookModel.js'

export const findBooks = () => Book.find()
export const findBookById = (bid) => Book.findById(bid)
export const findBookByGoogleId = (gid) => Book.findOne({google_id: gid})

export const checkBookExistsByItem = (title, subtitle, authors, published_date) => Book.exists({title: title, subtitle: subtitle, authors: authors,  published_date: published_date})

export const findBooksInTopLikedOrder = () => Book.find().sort({'stats.likes' : -1})

export const deleteBook = (bid) => Book.deleteOne({_id: bid})

export const createBook = (book) => Book.create(book)

export const updateBook = (bid, book) => Book.findByIdAndUpdate(bid, {...book}, {new : true})


// Update the book and return updated book
export const updateBookByGoogleId = (gid, book) => Book.findOneAndUpdate({google_id: gid}, {...book}, {new : true})
