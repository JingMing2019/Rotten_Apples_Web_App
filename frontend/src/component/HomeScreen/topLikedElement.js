import React from "react"
import { Link } from "react-router-dom"

const TopLikedElement = ({ restaurant }) => {
  return (
    <>
      <div className="m-3 col-12 col-md-3 ">
        <Link to={`/tootasty/restaurant/${restaurant._id}`}>
          <div className="card homepage-card-img">
            <img
              src={restaurant.image_url}
              alt="restaurant_image_url"
              height="600px"
              width="400px"
              className="border border-primary rounded-6"
            />
            <div>{restaurant.name}</div>
          </div>
        </Link>
      </div>
    </>
  )
}
export default TopLikedElement
