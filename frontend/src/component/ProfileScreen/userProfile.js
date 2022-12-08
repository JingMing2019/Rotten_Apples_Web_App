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
  }, [dispatch, userInfo, navigate])

  return (
    <>
      <div>
        <section className="header height-auto">
          <div className="row">
            <div className="col-4">
              <UserCard profile={user}/>
            </div>
            <div className="col-8 bg-blur">
              <UserDetail user={user}/>
              <UserReviews/>
               {user.likedBooks && <FavouriteBook books={user.likedBooks}/>}
            </div>
          </div>
        </section>

        <section className="homepage-card-section">
        </section>
      </div>
      {/*<div className="bg-success"></div>*/}
    </>
  )
}
export default UserProfile