import React from 'react'
import './userprofile.css'
import LetterAvatars from '../EditProfile/letterAvatars'
import { Card } from 'react-bootstrap'


const UserCard = ({
                    profile = {
                      '_id': '34238432784901',
                      'name': 'Alice Wonderland',
                      'firstname': 'Alice',
                      'lastname': 'Wonderland',
                      'email': 'alice@134.com',
                      'role': 'customer',
                      'bio': 'I love eatting!',
                      'location': 'Watertown',
                      'image_url': './img/top-liked-1.jpg'
                    }
                  }) => {

  return (
    <>
      <Card className="user-card user-card-flex">
        <Card.Body className="m-5">
          <Card.Title>
            <LetterAvatars name={profile.name}/>
          </Card.Title>
          <Card.Title className="user-card-name text-white">{profile.name}
          </Card.Title>
          <Card.Text className="text-white">{profile.bio}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
export default UserCard