import React from 'react'
import { Link, } from 'react-router-dom'
import './google-search.css'
import { saveGoogleBook } from '../../actions/bookActions'
import { useDispatch, } from 'react-redux'

// `book` is under the Google books format
const GoogleSearchListItem = ({ book }) => {
  const dispatch = useDispatch()

  const clickHandler = () => {
    dispatch(saveGoogleBook(book))
  }

  return (
    <>
      <Link to="#" onClick={clickHandler}>
        <li className="text-white list-group-item justify-content-between align-items-center">
          <div className="homepage-list-child row">
            <div className="col-12 col-md-4">
              <img className="google-search-img" src={book.volumeInfo.imageLinks.thumbnail} alt="book thumbnail"/>
            </div>
            <div className="text p-2 col-md-8">
              <h5>Title: {book.volumeInfo.title}</h5>
              <h6>SubTitle: {book.volumeInfo.subtitle}</h6>
              <h6>Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : ""}</h6>
              <h6>Published Date: {book.volumeInfo.publishedDate}</h6>
              <h6>Page: {book.volumeInfo.pageCount}</h6>
              <h6>Description:</h6>
              <p className="lg search-book-description">{book.volumeInfo.description}</p>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default GoogleSearchListItem