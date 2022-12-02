import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIKE_BOOK_REQUEST,
  USER_LIKE_BOOK_SUCCESS,
  USER_LIKE_BOOK_FAIL,
  USER_UNLIKE_BOOK_REQUEST,
  USER_UNLIKE_BOOK_SUCCESS,
  USER_UNLIKE_BOOK_FAIL,
  OTHER_USER_DETAILS_REQUEST,
  OTHER_USER_DETAILS_SUCCESS,
  OTHER_USER_DETAILS_FAIL
} from '../constants/userConstants'
import { BOOK_RECENT_REVIEWED_RESET } from '../constants/bookConstants'

export const register = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/api/users',
      user,
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    // if register success, login as well
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: BOOK_RECENT_REVIEWED_RESET })

}

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `/api/users/profile`,
      config
    )

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const getOtherUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: OTHER_USER_DETAILS_REQUEST
    })

    const { data } = await axios.get(
      `/api/users/profile/${id}`,
    )

    dispatch({
      type: OTHER_USER_DETAILS_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: OTHER_USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      '/api/users/profile',
      user,
      config
    )

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })
    // update userDetails
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })

    // update user info
    const { token } = JSON.parse(localStorage.getItem('userInfo'))
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { ...data, token }
    })
    localStorage.setItem('userInfo', JSON.stringify({ ...data, token }))


  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const likeBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIKE_BOOK_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `/api/users/book/${book._id}`,
      {},
      config
    )

    dispatch({
      type: USER_LIKE_BOOK_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_LIKE_BOOK_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const unLikeBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UNLIKE_BOOK_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.delete(
      `/api/users/book/${book._id}`,
      config
    )

    dispatch({
      type: USER_UNLIKE_BOOK_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_UNLIKE_BOOK_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}