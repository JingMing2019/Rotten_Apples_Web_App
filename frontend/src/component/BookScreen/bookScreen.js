import React, { useEffect } from 'react'
import './book.css'
import BookDetail from '../BookDetail/bookDetail'
import BookReview from '../BookReview/bookReview'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listBookDetails } from '../../actions/bookActions'
import { listBookReviews } from "../../actions/reviewActions";

const BookScreen = () => {
  const dispatch = useDispatch()

  const bookId = useParams().id

  const bookDetails = useSelector(state => state.bookDetails)
  const { book } = bookDetails

  const bookReviews = useSelector(state => state.bookReviews)
  const { reviews } = bookReviews

  const bookCreateReview = useSelector(state => state.bookCreateReview)
  const { success: createReviewSuccess } = bookCreateReview

  const deleteReview = useSelector(state => state.deleteReview)
  const { success: deleteReviewSuccess } = deleteReview

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(listBookDetails(bookId))
    dispatch(listBookReviews(bookId))
  }, [dispatch, bookId, createReviewSuccess, deleteReviewSuccess])

  return (
    <>
      <BookDetail book={book}/>
      {book && <BookReview reviews={reviews}/>}
    </>
  )
}

export default BookScreen
