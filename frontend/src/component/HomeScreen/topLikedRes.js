import React, { useEffect } from "react"
import TopLikedElement from "./topLikedElement"
import { Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { listTopLikedRestaurants } from "../../actions/restaurantActions"

const TopLikedRes = () => {
  const dispatch = useDispatch()
  const restaurantTopLiked = useSelector((state) => state.restaurantTopLiked)
  const { restaurants } = restaurantTopLiked

  useEffect(() => {
    dispatch(listTopLikedRestaurants())
  }, [dispatch])

  return (
    <>
      <div className="mt-5 m-3 flex">
        <h1 className="text-white">Top-liked Restaurant</h1>
      </div>
      <Row className="justify-content-md-center">
        {restaurants &&
          restaurants.map((restaurant) => (
            <Col key={restaurant._id} sm={12} md={6} lg={4} xl={3}>
              <TopLikedElement restaurant={restaurant} />
            </Col>
          ))}
      </Row>
    </>
  )
}
export default TopLikedRes
