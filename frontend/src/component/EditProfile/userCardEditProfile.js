import React from 'react'
import { Link } from 'react-router-dom'
import './editProfile.css'
import LetterAvatars from './letterAvatars'

const UserCardEditProfile = ({ profile }) => {

  return (
    <>
      <div className="user-card user-card-flex">
        <div className="m-5">
          {/*<img src="./img/top-liked-1.jpg" alt=""/>*/}
          <div className="avatar-position">
            <LetterAvatars name={profile.name}/>
          </div>
          <h3 className="user-card-name text-black"><span>{profile.firstname}</span> <span>{profile.lastname}</span>
          </h3>
          <p className="text-black">{profile.bio}</p>

          <Link className="btn rounded-pill bg-success fw-bold mt-1" to="/profile">Back</Link>
        </div>
      </div>
    </>
  )
}
export default UserCardEditProfile