import React, { useEffect, useState } from 'react'
import Confirm from './confirm'
import { useDispatch } from 'react-redux'
import { updateUserProfile } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'


const EditProfileItem = ({ profile }) => {

  const [firstname, setFirstname] = useState(profile.firstname)
  const [lastname, setLastname] = useState(profile.lastname)
  const [bio, setBio] = useState(profile.bio)
  const [location, setLocation] = useState(profile.location)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const editProfileClickHandler = () => {
    const updatedProfile = {
      firstname,
      lastname,
      bio,
      location,
    }
    dispatch(updateUserProfile(updatedProfile))
    navigate('/tootasty/profile')
  }

  useEffect(() => {
    setFirstname(profile.firstname)
    setLastname(profile.lastname)
    setBio(profile.bio)
    setLocation(profile.location)
  }, [dispatch, profile])


  return (
    <>

      <form className="pt-5 form-width">
        <div className="form-group my-2 ">
          <label htmlFor="name" className="form-label mx-3 font-white"> First Name</label>
          <input
            required
            id="firstname"
            type="text"
            className="form-control"
            placeholder={profile.firstname}
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
        </div>

        <div className="form-group my-2 ">
          <label htmlFor="name" className="form-label mx-3 font-white"> Last Name</label>
          <input
            required
            id="lastname"
            type="text"
            className="form-control"
            placeholder={profile.lastname}
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </div>

        <div className="form-group my-2 ">
          <label htmlFor="bio" className="form-label mx-3 font-white">Bio</label>
          <input
            type="text"
            className="form-control"
            placeholder={profile.bio}
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </div>

        <div className="form-group my-2 ">
          <label htmlFor="location" className="form-label mx-3 font-white">Location</label>
          <input
            type="text"
            className="form-control "
            placeholder={profile.location}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>

      </form>

      <div className="position-relative btn-pos align-self-center my-2 pt-2">

        <button onClick={() => editProfileClickHandler()}
                onSubmit={() => Confirm()}
                className="btn btn-primary">Save
        </button>

      </div>

    </>
  )
}
export default EditProfileItem