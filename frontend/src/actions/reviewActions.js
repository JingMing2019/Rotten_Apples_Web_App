import {
  RESTAURANT_DELETE_REVIEW_FAIL,
  RESTAURANT_DELETE_REVIEW_REQUEST,
  RESTAURANT_DELETE_REVIEW_SUCCESS
} from '../constants/restaurantConstants'
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

export const deleteReview = (restaurantId, reviewId) => async (dispatch, getState) => {
  try {
    dispatch({ type: RESTAURANT_DELETE_REVIEW_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/restaurants/${restaurantId}/reviews/${reviewId}`, config)

    dispatch({
      type: RESTAURANT_DELETE_REVIEW_SUCCESS,
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
      type: RESTAURANT_DELETE_REVIEW_FAIL,
      payload: message,
    })
  }
}
