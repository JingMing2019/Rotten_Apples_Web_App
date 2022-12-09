import {
  BOOK_CREATE_REVIEW_FAIL,
  BOOK_CREATE_REVIEW_REQUEST, BOOK_CREATE_REVIEW_SUCCESS,
  BOOK_DELETE_REVIEW_FAIL,
  BOOK_DELETE_REVIEW_REQUEST,
  BOOK_DELETE_REVIEW_SUCCESS,
  BOOK_REVIEWS_FAIL,
  BOOK_REVIEWS_REQUEST,
  BOOK_REVIEWS_SUCCESS
} from '../constants/bookConstants'
import axios from 'axios'
import { logout } from './userActions'

export const CREATE_REVIEW = 'CREATE_REVIEW'
export const FIND_ALL_REVIEW = 'FIND_ALL_REVIEW'
export const UPDATE_REVIEW = 'UPDATE_REVIEW'

export const createReview = async (dispatch, review) => {
  const newReview = review
  dispatch({
    type: CREATE_REVIEW,
    newReview,
  })
}

export const listBookReviews = (bid) => async (dispatch) => {
  try {
    // fetching data
    dispatch({ type: BOOK_REVIEWS_REQUEST })
    const { data } = await axios.get(`/api/reviews/book/${bid}`)

    // fetch success
    dispatch({
      type: BOOK_REVIEWS_SUCCESS,
      payload: data.data,
    })
  } catch (error) {
    // fetch failed
    dispatch({
      type: BOOK_REVIEWS_FAIL,
      payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    })
  }
}

export const createBookReview = (bookId, review,setIsSending) => async (
    dispatch,
    getState
) => {
  try {
    dispatch({ type: BOOK_CREATE_REVIEW_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/reviews/book/${bookId}`, review, config)
    setIsSending(false)
    dispatch({
      type: BOOK_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BOOK_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const deleteReview = (bookId, reviewId) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOK_DELETE_REVIEW_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/reviews/book/${bookId}/${reviewId}`, config)

    dispatch({
      type: BOOK_DELETE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BOOK_DELETE_REVIEW_FAIL,
      payload: message,
    })
  }
}
