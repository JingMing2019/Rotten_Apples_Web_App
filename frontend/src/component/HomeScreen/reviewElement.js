import React from 'react'
import { Link } from 'react-router-dom'

const ReviewElement = ({ book }) => {
  return (
    <>
      <div className="m-3 col-12 col-md-3">
        <Link to={`/rottenapples/book/${book.book._id}`}>
          <div className="card homepage-card-img">
            <img
              src={book.book.image_url}
              alt="book_image_url"
              height="190px"
              width="350px"
            />
            <div>{book.book.name}</div>
          </div>
        </Link>
      </div>
    </>
  )
}
export default ReviewElement
