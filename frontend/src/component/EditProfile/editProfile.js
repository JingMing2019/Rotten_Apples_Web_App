import React, { useEffect } from 'react'
import UserCardEditProfile from './userCardEditProfile'
import EditProfileItem from './editProfileItem'
import './editProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from '../../actions/userActions'

const EditProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userProfile = useSelector(state => state.userProfile)
  const { user } = userProfile


  useEffect(() => {
    if (!userInfo) {
      navigate('/tootasty/login')
    } else if (!user.name) {
      dispatch(getUserProfile())
    }
  }, [dispatch, userInfo, user])

  return (
    <>
      <div>

        <section className="header height-auto">
          <div className="row">
            <div className="col-4">
              <UserCardEditProfile profile={user}/>
            </div>
            <div className="col-8">
              <EditProfileItem profile={user}/>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
export default EditProfile