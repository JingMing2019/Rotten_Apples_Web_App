import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '@mui/material/Rating'
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography'
import { createRestaurantReview } from '../../actions/restaurantActions'
import { RESTAURANT_CREATE_REVIEW_RESET } from '../../constants/restaurantConstants'
import {FormControlLabel} from "@mui/material";

const WriteReview = () => {
  const { id: restaurantId } = useParams()
  let [comment, setComment] = useState('')
  let [rating, setRating] = useState(0)
  let [isAnonymous, setIsAnonymous] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const submitReviewHandler = (e) => {
    e.preventDefault()
    dispatch(
      createRestaurantReview(restaurantId, {
        rating,
        comment,
        isAnonymous
      })
    )
  }

  const restaurantCreateReview = useSelector(state => state.restaurantCreateReview)
  const { success: createReviewSuccess } = restaurantCreateReview

  useEffect(() => {
    if (createReviewSuccess) {
      setComment('')
      setRating(0)
      dispatch({ type: RESTAURANT_CREATE_REVIEW_RESET })
    }
  }, [createReviewSuccess])

  return (
    <>
      <form action="#" className="reviews-form" role="form">
        <h2 id="writeReview" name="writeReview">
          Write a review
        </h2>
        <Typography component="legend">Rating</Typography>
        <Rating
            name="simple-controlled"
            value={rating}
            onChange={(e) => {
              setRating(parseInt(e.target.value))
            }}
            disabled={!userInfo}
        />
        <div className="form-group">
          <label htmlFor="review">
            Review <span className="require"></span>
          </label>
          <textarea
            className="form-control"
            rows="8"
            id="review"
            value={comment}
            placeholder="Write your review"
            onChange={(event) => setComment(event.target.value)}
            disabled={!userInfo}
          ></textarea>
        </div>

        <FormControlLabel
            label="Anonymous"
            control={
              <Checkbox
                  checked={isAnonymous}
                  onChange={(e) => {
                    setIsAnonymous(e.target.checked);
                  }}
              />}
        />

        <div className="padding-top-20">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitReviewHandler}
            disabled={!userInfo}
          >
            Send
          </button>
        </div>
      </form>
    </>
  )
}

export default WriteReview
