import React, { useEffect } from 'react'
import UserCard from './userCard'
import UserDetail from './userDetail'
import UserReviews from './userReviews'
import FavouriteBook from '../HomeScreen/favouriteBook'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../actions/userActions'

const UserProfile = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userProfile = useSelector(state => state.userProfile)
  const { user } = userProfile

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      dispatch(getUserProfile())
    }
  }, [dispatch, userInfo])

  return (
    <>
      <div>
        <section className="header height-auto">
          <div className="row">
            <div className="col-4">
              <UserCard profile={user}/>
            </div>
            <div className="col-8">
              <UserDetail user={user}/>
              <UserReviews/>
<<<<<<< HEAD
               {user.likedBooks && <FavouriteBook books={user.likedBooks.data}/>}
=======
              {user.likedBooks && <FavouriteBook books={user.likedBooks.data}/>}
>>>>>>> 9beb8a67dc5fc91c1eb69ad800d2e58c973ca012
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
export default UserProfile