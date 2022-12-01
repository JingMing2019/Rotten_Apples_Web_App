import React from 'react'
import { Link } from 'react-router-dom'

const ReviewElement = ({ restaurant }) => {
  return (
    <>
      <div className="m-3 col-12 col-md-3">
        <Link to={`/tootasty/restaurant/${restaurant.restaurant._id}`}>
          <div className="card homepage-card-img">
            <img
              src={restaurant.restaurant.image_url}
              alt="restaurant_image_url"
              height="190px"
              width="350px"
            />
            <div>{restaurant.restaurant.name}</div>
          </div>
        </Link>
      </div>
    </>
  )
}
export default ReviewElement
