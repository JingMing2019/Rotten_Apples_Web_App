import reviews from '../data/review.json'
import {
  RESTAURANT_DELETE_REVIEW_FAIL,
  RESTAURANT_DELETE_REVIEW_REQUEST,
  RESTAURANT_DELETE_REVIEW_SUCCESS
} from '../constants/restaurantConstants'

export const reviewReducer = (state = reviews, action) => {
  switch (action.type) {
    // case DELETE_REVIEW:
    //     return state.filter(
    //         review => review._id !== action.review._id);
    case 'create-review':
      const newReview = {
        review: action.review,
        rating: action.rating,
        _id: new Date().getTime() + '',
        firstname: 'Someone',
        lastname: 'Else',
        time: '04/22/2022',
      }
      return [newReview, ...state]
    default:
      return state
  }
}

export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_DELETE_REVIEW_REQUEST:
      return { loading: true }
    case RESTAURANT_DELETE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case RESTAURANT_DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}