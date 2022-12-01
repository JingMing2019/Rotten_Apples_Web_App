import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherUserProfile } from '../../actions/userActions'
import { useParams } from 'react-router-dom'
import OtherUserCard from './otherUserCard'
import OtherUserDetail from './otherUserDetail'

const OtherUserProfile = () => {
  const userId = useParams().id

  const dispatch = useDispatch()

  const userProfile = useSelector(state => state.otherUserProfile)
  const { user } = userProfile

  useEffect(() => {
    dispatch(getOtherUserProfile(userId))

  }, [dispatch])

  return (
    <>
      <div>
        <section className="header height-auto">
          <div className="row">
            <div className="col-4">
              <OtherUserCard profile={user}/>
            </div>
            <div className="col-8">
              <OtherUserDetail user={user}/>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
export default OtherUserProfile