import React, { useEffect } from "react"
//import books from '../datafornow/books.json'
import ReviewElement from "./reviewElement"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { listRecentReviewedBooks } from "../../actions/bookActions"

const RecentReviewedBook = () => {
  const dispatch = useDispatch()
  const bookRecentReviewed = useSelector(
    (state) => state.bookRecentReviewed
  )
  const { books } = bookRecentReviewed

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listRecentReviewedBooks())
    } else {
      // no render the recent reviewed book
    }
  }, [dispatch, userInfo])
  return (
    <>
      <div className="mt-5 m-3 flex">
        <h1 className="text-black">Recent Reviews</h1>
      </div>

      <Row className="justify-content-md-center">
        {books &&
          books.map((book) => (
            <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
              <ReviewElement book={book} />
            </Col>
          ))}
      </Row>
    </>
  )
}
export default RecentReviewedBook
