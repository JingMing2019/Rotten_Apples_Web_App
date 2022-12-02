import React from 'react'
import FavouriteBookElement from './favouriteBookElement'
import { Row, Col } from 'react-bootstrap'

const FavouriteBook = ({ books }) => {
  return (
    <>
      <div className="mt-5 m-3 flex">
        <h1 className="text-white">Your Liked Restaurants</h1>
      </div>
      <Row>
        {books &&
          books.map((book) => (
            <Col
              key={book._id}
              sm={12} md={6} lg={4}
              className="d-flex align-items-stretch"
            >
              <FavouriteBookElement book={book}/>
            </Col>
          ))}
      </Row>
    </>
  )
}
export default FavouriteBook