import React, { useEffect } from "react"
import TopLikedElement from "./topLikedElement"
import { Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { listTopLikedBooks } from "../../actions/bookActions"

const TopLikedBook = () => {
  const dispatch = useDispatch()
  const bookTopLiked = useSelector((state) => state.bookTopLiked)
  const { books } = bookTopLiked

  useEffect(() => {
    dispatch(listTopLikedBooks())
  }, [dispatch])

  return (
    <>
      <div className="mt-5 m-3 flex">
        <h1 className="text-black">Most Popular</h1>
      </div>
      <Row className="justify-content-md-center">
        {books &&
          books.map((book) => (
            <Col key={book._id} sm={12} md={6} lg={4} xl={3} >
              <TopLikedElement book={book} />
            </Col>
          ))}
      </Row>
    </>
  )
}
export default TopLikedBook
