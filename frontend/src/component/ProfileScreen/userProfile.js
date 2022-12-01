import React, { useEffect } from 'react'
import UserCard from './userCard'
import UserDetail from './userDetail'
import UserReviews from './userReviews'
import FavouriteRes from '../HomeScreen/favouriteRes'
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
      navigate('/tootasty/login')
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
              {user.likedRestaurant && <FavouriteRes restaurants={user.likedRestaurant.data}/>}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
export default UserProfile