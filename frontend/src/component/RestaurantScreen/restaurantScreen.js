import React, { useEffect } from 'react'
import './restaurant.css'
import RestaurantDetail from '../RestaurantDetail/restaurantDetail'
import RestaurantReview from '../RestaurantReview/restaurantReview'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listRestaurantDetails } from '../../actions/restaurantActions'

const RestaurantScreen = () => {
  const dispatch = useDispatch()

  const restaurantId = useParams().id

  const restaurantDetails = useSelector(state => state.restaurantDetails)
  const { restaurant } = restaurantDetails

  const restaurantCreateReview = useSelector(state => state.restaurantCreateReview)
  const { success: createReviewSuccess } = restaurantCreateReview

  const deleteReview = useSelector(state => state.deleteReview)
  const { success: deleteReviewSuccess } = deleteReview

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(listRestaurantDetails(restaurantId))
  }, [dispatch, restaurantId, createReviewSuccess, deleteReviewSuccess])

  return (
    <>
      <RestaurantDetail restaurant={restaurant}/>
      {restaurant && <RestaurantReview reviews={restaurant.reviews}/>}
    </>
  )
}

export default RestaurantScreen
