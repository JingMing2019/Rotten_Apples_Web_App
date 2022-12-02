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
              <img className="google-search-img" src={book.image_url} alt=""/>
            </div>
            <div className="text p-2 col-md-8">
              <h5>{book.name}</h5>
              <p><i className="fa-solid fa-star"/>{book.rating}</p>
              <p className="lg">Address:
                {book.location.address1},
                {book.location.city},
                {book.location.state},
                {book.location.zip_code}
              </p>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default GoogleSearchListItem