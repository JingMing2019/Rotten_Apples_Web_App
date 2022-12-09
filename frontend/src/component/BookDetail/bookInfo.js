import React, { useEffect, useState } from 'react'
import RatingStar from '../Rating/ratingStar'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, likeBook, unLikeBook } from '../../actions/userActions'

const BookInfo = ({ bookInfo }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userProfile = useSelector(state => state.userProfile)
  const { user } = userProfile

  const [book, setBook] = useState(bookInfo)
  useEffect(() => {
    if (userInfo && !user.name) {
      dispatch(getUserProfile())
    }

  }, [dispatch, userInfo, user])

  const likeBookHandler = () => {
    if (!book.liked.includes(userInfo._id)) {
      // like book
      const newBook = {
        ...book,
        liked: [...book.liked, userInfo._id],
      }
      setBook(newBook)
  
      dispatch(likeBook(newBook))
    } else {
      const set = new Set(book.liked )
      set.delete(userInfo._id)
      // console.log(Array.from(set))
      // unlike book
      const newBook = {
        ...book,
        liked: Array.from(set),
        stats: {
          ...book.stats,
        }
      }
      setBook(newBook)
      dispatch(unLikeBook(newBook))
    }

  }

  return (
    <>
      <div className="position-relative">
        <img src={book.image_url} className="card-img-top banner-height float-end mt-5" alt=""/>
      </div>
      <div className="position-absolute img-title-pos">
        <h1 className="book-title">{book.title}</h1>
        <ul className="list-inline font-green-bolder">
          <li className="list-inline-item">
            <RatingStar value={book.rating}/>
          </li>
          <li className="list-inline-item position-up">
            <i className="fa fa-user-o me-2" />{book.stats.numReviews} Reviews
          </li>
        </ul>

        <ul className="list-inline font-green-bolder">
          {/*<li className="list-inline-item">*/}
          {/*  <i className="fa-solid fa-calendar-days" /> {book.is_closed ? 'Closed' : 'Open'}*/}
          {/*</li>*/}
        </ul>
        <ul className="list-inline font-green-bolder">
          <li className="list-inline-item">
            <i className="fa-solid fa-user-pen" /> {book.authors}
          </li>
        </ul>
        <div>
          <a href="#writeReview">
            <button type="button" className="btn btn-success" disabled={!userInfo}>Write Review</button>
          </a>

          <button
            type="button"
            className="btn btn-success ms-4"
            onClick={likeBookHandler}
            disabled={!userInfo}
          >
            {
              Array.isArray(book.liked) && userInfo && !book.liked.includes(userInfo._id) &&
              <span>Like</span>
            }
            {
              Array.isArray(book.liked) && userInfo && book.liked.includes(userInfo._id) &&
              <span>Liked</span>
            }
            <span>({Array.isArray(book.liked) && book.liked.length})</span></button>
        </div>

      </div>
    </>
  )
}
export default BookInfo