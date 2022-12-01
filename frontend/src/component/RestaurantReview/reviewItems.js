import React from 'react'
import LetterAvatars from '../Avatar/letterAvatars'
import RatingStar from '../Rating/ratingStar'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';

import { deleteReview } from '../../actions/reviewActions'

const ReviewItems = ({ review }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deleteHandler = () => {
    dispatch(deleteReview(review.restaurant, review._id))
  }

  return (
    <>

      <div className="review-item clearfix">

          <div className="grid-image-left">
            {
              review.isAnonymous?
                  <LetterAvatars name="Someone Else" isAnonymous={review.isAnonymous}/>
                  :
                  <Link to={`/tootasty/profile/${review.user}`} className="non-line">
                    <LetterAvatars name={review.name}/>
                  </Link>
            }
          </div>

        <div className="name-heading">

            {
              review.isAnonymous?
                <strong>Anonymous</strong>
                :
                <Link to={`/tootasty/profile/${review.user}`} className="non-line">
                  <strong className='color-black'>{review.name}</strong>
                </Link>
            }


          <br/>
          {userInfo && userInfo.role === 'admin' && (
            <Link to="#">
              <i
                onClick={deleteHandler}
                className="fas fa-remove fa-pull-right"
              ></i>
            </Link>
          )}
        </div>
      </div>
      <div className="review-item-content ">
          <Box
              sx={{
                  width: 300,
                  display: 'flex',
                  alignItems: 'center',
              }}
          >
              <RatingStar value={review.rating}/>
              <Box sx={{ ml: 2 }}>{review.createdAt.split('T')[0]}</Box>
          </Box>
        <div>
          <p>{review.comment}</p>
        </div>
      </div>
    </>
  )
}

export default ReviewItems
