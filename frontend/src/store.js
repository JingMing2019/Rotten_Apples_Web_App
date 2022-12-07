import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'
import { deleteReviewReducer, reviewReducer } from './reducers/reviewReducer'
import {
  bookDetailsReducer,
  bookListReducer,
  bookRencentReviewedReducer,
  saveGoogleBookReducer,
  bookTopLikedReducer, bookCreateReviewReducer,
    bookCreateReducer
} from './reducers/bookReducer'
import {
  otherUserProfileReducer,
  userLikeBookReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducer'


const reducer = combineReducers({
  reviews: reviewReducer,
  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  bookRecentReviewed: bookRencentReviewedReducer,
  bookTopLiked: bookTopLikedReducer,
  saveGoogleBook: saveGoogleBookReducer,
  createBook: bookCreateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  otherUserProfile: otherUserProfileReducer,
  updateUserProfile: userUpdateProfileReducer,
  likeBook: userLikeBookReducer,
  bookCreateReview: bookCreateReviewReducer,
  deleteReview: deleteReviewReducer
})

// get user data from local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
