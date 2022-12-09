import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_DETAILS_RESET,
  BOOK_CREATE_REVIEW_REQUEST,
  BOOK_CREATE_REVIEW_SUCCESS,
  BOOK_CREATE_REVIEW_FAIL,
  BOOK_CREATE_REVIEW_RESET,
  BOOK_RECENT_REVIEWED_REQUEST,
  BOOK_RECENT_REVIEWED_SUCCESS,
  BOOK_RECENT_REVIEWED_FAIL,
  GOOGLE_BOOK_SAVE_REQUEST,
  GOOGLE_BOOK_SAVE_SUCCESS,
  GOOGLE_BOOK_SAVE_FAIL,
  GOOGLE_BOOK_SAVE_RESET,
  BOOK_TOP_RATED_REQUEST,
  BOOK_TOP_RATED_SUCCESS,
  BOOK_TOP_RATED_FAIL,
  BOOK_RECENT_REVIEWED_RESET,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_RESET,
  BOOK_REVIEWS_REQUEST, BOOK_REVIEWS_SUCCESS, BOOK_REVIEWS_FAIL, BOOK_REVIEWS_RESET,
} from "../constants/bookConstants"

export const bookListReducer = (state = { restartants: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return { loading: true, restartants: [] }
    case BOOK_LIST_SUCCESS:
      return { loading: false, books: action.payload }
    case BOOK_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bookDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DETAILS_REQUEST:
      return { loading: true }
    case BOOK_DETAILS_SUCCESS:
      return { loading: false, book: action.payload }
    case BOOK_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case BOOK_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const bookReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_REVIEWS_REQUEST:
      return { loading: true }
    case BOOK_REVIEWS_SUCCESS:
      return { loading: false, reviews: action.payload }
    case BOOK_REVIEWS_FAIL:
      return { loading: false, error: action.payload }
    case BOOK_REVIEWS_RESET:
      return {}
    default:
      return state
  }
}

export const saveGoogleBookReducer = (state = {}, action) => {
  switch (action.type) {
    case GOOGLE_BOOK_SAVE_REQUEST:
      return { loading: true }
    case GOOGLE_BOOK_SAVE_SUCCESS:
      return { loading: false, book: action.payload }
    case GOOGLE_BOOK_SAVE_FAIL:
      return { loading: false, error: action.payload }
    case GOOGLE_BOOK_SAVE_RESET:
      return {}
    default:
      return state
  }
}
export const bookCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CREATE_REQUEST:
      return { loading: true }
    case BOOK_CREATE_SUCCESS:
      return { loading: false, book: action.payload }
    case BOOK_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case BOOK_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const bookRencentReviewedReducer = (
  state = { books: [] },
  action
) => {
  switch (action.type) {
    case BOOK_RECENT_REVIEWED_REQUEST:
      return { loading: true, books: [] }
    case BOOK_RECENT_REVIEWED_SUCCESS:
      return { loading: false, books: action.payload }
    case BOOK_RECENT_REVIEWED_FAIL:
      return { loading: false, error: action.payload }
    case BOOK_RECENT_REVIEWED_RESET:
      return { books: [] }
    default:
      return state
  }
}

export const bookTopLikedReducer = (
  state = { books: [] },
  action
) => {
  switch (action.type) {
    case BOOK_TOP_RATED_REQUEST:
      return { loading: true, books: [] }
    case BOOK_TOP_RATED_SUCCESS:
      return { loading: false, books: action.payload }
    case BOOK_TOP_RATED_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bookCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case BOOK_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case BOOK_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case BOOK_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
