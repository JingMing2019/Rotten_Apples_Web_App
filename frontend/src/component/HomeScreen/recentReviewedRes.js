import React, { useEffect } from "react"
//import restaurants from '../datafornow/restaurants.json'
import ReviewElement from "./reviewElement"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { listRecentReviewedRestaurants } from "../../actions/restaurantActions"

const RecentReviewedRes = () => {
  const dispatch = useDispatch()
  const restaurantRecentReviewed = useSelector(
    (state) => state.restaurantRecentReviewed
  )
  const { restaurants } = restaurantRecentReviewed

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listRecentReviewedRestaurants())
    } else {
      // no render the recent reviewed restaurant
    }
  }, [dispatch, userInfo])
  return (
    <>
      <div className="mt-5 m-3 flex">
        <h1 className="text-white">Recent Reviewed Restaurants</h1>
      </div>

      <Row className="justify-content-md-center">
        {restaurants &&
          restaurants.map((restaurant) => (
            <Col key={restaurant._id} sm={12} md={6} lg={4} xl={3}>
              <ReviewElement restaurant={restaurant} />
            </Col>
          ))}
      </Row>
    </>
  )
}
export default RecentReviewedRes
