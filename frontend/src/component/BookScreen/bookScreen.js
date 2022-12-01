import React, { useEffect } from 'react'
import './book.css'
import RestaurantDetail from '../RestaurantDetail/bookDetail'
import RestaurantReview from '../RestaurantReview/bookReview'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listRestaurantDetails } from '../../actions/bookActions'

const RestaurantScreen = () => {
  const dispatch = useDispatch()

  const bookId = useParams().id

  const bookDetails = useSelector(state => state.bookDetails)
  const { book } = bookDetails

  const bookCreateReview = useSelector(state => state.bookCreateReview)
  const { success: createReviewSuccess } = bookCreateReview

  const deleteReview = useSelector(state => state.deleteReview)
  const { success: deleteReviewSuccess } = deleteReview

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(listRestaurantDetails(bookId))
  }, [dispatch, bookId, createReviewSuccess, deleteReviewSuccess])

  return (
    <>
      <RestaurantDetail book={book}/>
      {book && <RestaurantReview reviews={book.reviews}/>}
    </>
  )
}

export default BookScreen
