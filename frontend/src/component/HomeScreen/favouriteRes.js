import React from 'react'
import FavouriteResElement from './favouriteResElement'
import { Row, Col } from 'react-bootstrap'

const FavouriteRes = ({ restaurants }) => {
  return (
    <>
      <div className="mt-5 m-3 flex">
        <h1 className="text-white">Your Liked Restaurants</h1>
      </div>
      <Row>
        {restaurants &&
          restaurants.map((restaurant) => (
            <Col
              key={restaurant._id}
              sm={12} md={6} lg={4}
              className="d-flex align-items-stretch"
            >
              <FavouriteResElement restaurant={restaurant}/>
            </Col>
          ))}
      </Row>
    </>
  )
}
export default FavouriteRes