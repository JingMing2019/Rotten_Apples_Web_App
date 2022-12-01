import React, { useEffect, useState } from 'react'
import RatingStar from '../Rating/ratingStar'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, likeRestaurant, unLikeRestaurant } from '../../actions/userActions'

const RestaurantInfo = ({ restaurantInfo }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userProfile = useSelector(state => state.userProfile)
  const { user } = userProfile

  const [restaurant, setRestaurant] = useState(restaurantInfo)

  useEffect(() => {
    if (userInfo && !user.name) {
      dispatch(getUserProfile())
    } else if (userInfo && user.name) {
      // check if the user liked the restaurant
      if (user && user.likedRestaurant.numLiked > 0) {
        const likedRestaurant = user.likedRestaurant.data
          .find(item => item.restaurant === restaurant._id)
        if (likedRestaurant) {
          setRestaurant({
            ...restaurant,
            liked: true
          })
        }
      }
    }

  }, [dispatch, userInfo, user])

  const likeRestaurantHandler = () => {
    if (!restaurant.liked) {
      // like restaurant
      setRestaurant({
        ...restaurant,
        liked: !restaurant.liked,
        stats: {
          ...restaurant.stats,
          likes: restaurant.stats.likes + 1
        }
      })
      dispatch(likeRestaurant(restaurant))
    } else {
      // unlike restaurant
      setRestaurant({
        ...restaurant,
        liked: !restaurant.liked,
        stats: {
          ...restaurant.stats,
          likes: restaurant.stats.likes - 1
        }
      })
      dispatch(unLikeRestaurant(restaurant))
    }

  }


  return (
    <>
      <div className="position-relative">
        <img src={restaurant.image_url} className="card-img-top banner-height" alt=""/>
      </div>
      <div className="position-absolute img-title-pos">
        <h1 className="restaurant-title ">{restaurant.name}</h1>
        <ul className="list-inline font-orange-bolder">
          <li className="list-inline-item">
            <RatingStar value={restaurant.rating}/>
          </li>
          <li className="list-inline-item position-up"><i
            className="fa fa-user-o"></i>{restaurant.stats.numReviews} Reviews
          </li>
        </ul>

        <ul className="list-inline font-orange-bolder">
          <li className="list-inline-item"><i
            className="fa-solid fa-calendar-days"></i> {restaurant.is_closed ? 'Closed' : 'Open'}
          </li>
        </ul>
        <ul className="list-inline font-orange-bolder">
          <li className="list-inline-item"><i className="fa-solid fa-location-arrow"></i> {restaurant.address}
          </li>
        </ul>
        <div>
          <a href="#writeReview">
            <button type="button" className="btn btn-primary" disabled={!userInfo}>Write Review</button>
          </a>

          <button
            type="button"
            className="btn btn-primary ms-4"
            onClick={likeRestaurantHandler}
            disabled={!userInfo}
          >
            {
              !restaurant.liked &&
              <span>Like</span>
            }
            {
              restaurant.liked &&
              <span>Liked</span>
            }
            <span>({restaurant.stats && restaurant.stats.likes})</span></button>
        </div>

      </div>
    </>
  )
}
export default RestaurantInfo