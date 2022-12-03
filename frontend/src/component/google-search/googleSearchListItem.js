import React from 'react'
import { Link, } from 'react-router-dom'
import './google-search.css'
import { saveGoogleBook } from '../../actions/bookActions'
import { useDispatch, } from 'react-redux'

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
              <h5>{book.volumeInfo.title}</h5>
              <h6>{book.volumeInfo.subtitle}</h6>
              {/*<p><i className="fa-so                                                                                                                                                                                      lid fa-star"/>{book.volumeInfo.averageRating}</p>*/}
              <p className="lg">description:{book.volumeInfo.description}</p>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default GoogleSearchListItem