import React from 'react'
import { Link } from 'react-router-dom'
import './userprofile.css'
import LetterAvatars from '../EditProfile/letterAvatars'


const UserCard = ({
                    profile = {
                      '_id': '34238432784901',
                      'name': 'Alice Wonderland',
                      'firstname': 'Alice',
                      'lastname': 'Wonderland',
                      'email': 'alice@134.com',
                      'role': 'reader',
                      'bio': 'I love reading!',
                      'location': 'San Jose',
                      'image_url': './img/top-liked-1.jpg'
                    }
                  }) => {

  return (
    <>
      <div className="user-card user-card-flex">
        <div className="m-5">
          <div className="avatar-position-profile">
            <LetterAvatars name={profile.name}/>
          </div>
          <h3 className="user-card-name text-black">{profile.name}
          </h3>
          <span className="badge rounded-pill bg-success text-black disabled">{profile.role}</span>
          <p className="text-black">{profile.bio}</p>
          <Link to="/edit">
            <button type="reset" className="btn rounded-pill bg-success fw-bold">Edit Profile</button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default UserCard