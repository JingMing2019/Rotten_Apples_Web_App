import React from 'react'
import { Link } from 'react-router-dom'

const ReviewElement = ({ book }) => {
  return (
    <>
      <div className="m-3 col-12 col-md-3">
        <Link to={`/book/${book.book._id}`}>
          <div className="card homepage-card-img">
            <img
              src={book.book.image_url}
              alt="book_image_url"
              height="100%"
              width="100%"
            />
            <div>{book.book.name}</div>
          </div>
        </Link>
      </div>
    </>
  )
}
export default ReviewElement
