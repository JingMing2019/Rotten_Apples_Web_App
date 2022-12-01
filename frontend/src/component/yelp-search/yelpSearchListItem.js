import React from 'react'
import { Link, } from 'react-router-dom'
import './yelp-search.css'
import { saveYelpRestaurant } from '../../actions/restaurantActions'
import { useDispatch, } from 'react-redux'

const YelpSearchListItem = ({ restaurant }) => {
  const dispatch = useDispatch()

  const clickHandler = () => {
    dispatch(saveYelpRestaurant(restaurant))
  }
  return (
    <>
      <Link to="#" onClick={clickHandler}>
        <li className="text-white list-group-item justify-content-between align-items-center">
          <div className="homepage-list-child row">
            <div className="col-12 col-md-4">
              <img className="yelp-search-img" src={restaurant.image_url} alt=""/>
            </div>
            <div className="text p-2 col-md-8">
              <h5>{restaurant.name}</h5>
              <p><i className="fa-solid fa-star"/>{restaurant.rating}</p>
              <p className="lg">Address:
                {restaurant.location.address1},
                {restaurant.location.city},
                {restaurant.location.state},
                {restaurant.location.zip_code}
              </p>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default YelpSearchListItem