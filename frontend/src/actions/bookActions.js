import axios from 'axios'

import {
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_RECENT_REVIEWED_REQUEST,
  BOOK_RECENT_REVIEWED_SUCCESS,
  BOOK_RECENT_REVIEWED_FAIL,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  GOOGLE_BOOK_SAVE_REQUEST,
  GOOGLE_BOOK_SAVE_SUCCESS,
  GOOGLE_BOOK_SAVE_FAIL,
  GOOGLE_BOOK_SAVE_RESET,
  BOOK_TOP_RATED_REQUEST,
  BOOK_TOP_RATED_SUCCESS,
  BOOK_TOP_RATED_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL, BOOK_CREATE_RESET
} from '../constants/bookConstants'

export const listBooks = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/books?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({ type: BOOK_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: BOOK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBookDetails = (id) => async (dispatch) => {
  try {
    // fetching data
    dispatch({ type: BOOK_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/books/${id}`)

    // fetch success
    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    // fetch failed
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listRecentReviewedBooks = () => async (dispatch) => {
  try {
    dispatch({ type: BOOK_RECENT_REVIEWED_REQUEST })

    const { data } = await axios.get(`/api/books/recent-reviewed`)

    dispatch({
      type: BOOK_RECENT_REVIEWED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_RECENT_REVIEWED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const saveGoogleBook = (book) => async (dispatch) => {
  try {
    // fetching data
    dispatch({ type: GOOGLE_BOOK_SAVE_REQUEST })
    const { data } = await axios.put('/api/google/books', book)

    // fetch success
    dispatch({
      type: GOOGLE_BOOK_SAVE_SUCCESS,
      payload: data,
    })

    // reset book details state
    // dispatch({ type: BOOK_DETAILS_RESET })
  } catch (error) {
    // fetch failed
    dispatch({
      type: GOOGLE_BOOK_SAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const register = (book) => async (dispatch) => {
  try {
    // fetching data
    dispatch({ type: BOOK_CREATE_REQUEST })
    const { data } = await axios.post('/api/books', book)

    // fetch success
    dispatch({
      type: BOOK_CREATE_SUCCESS,
      payload: data,
    })

    // reset book details state
    // dispatch({ type: BOOK_DETAILS_RESET })
  } catch (error) {
    // fetch failed
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    })
  }
}
export const resetCreateBook = () => async (dispatch) => {
  dispatch({ type: BOOK_CREATE_RESET })
}
export const resetSaveGoogleBook = () => async (dispatch) => {
  dispatch({ type: GOOGLE_BOOK_SAVE_RESET })
}

export const listTopLikedBooks = () => async (dispatch) => {
  try {
    dispatch({ type: BOOK_TOP_RATED_REQUEST })

    const { data } = await axios.get(`/api/books/top`)

    dispatch({
      type: BOOK_TOP_RATED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_TOP_RATED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
