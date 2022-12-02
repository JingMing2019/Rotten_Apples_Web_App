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
    } else if (userInfo && user.name) {
      // check if the user liked the book
      if (user && user.likedBook.numLiked > 0) {
        const likedBook = user.likedBook.data
          .find(item => item.book === book._id)
        if (likedBook) {
          setBook({
            ...book,
            liked: true
          })
        }
      }
    }

  }, [dispatch, userInfo, user])

  const likeBookHandler = () => {
    if (!book.liked) {
      // like book
      setBook({
        ...book,
        liked: !book.liked,
        stats: {
          ...book.stats,
          likes: book.stats.likes + 1
        }
      })
      dispatch(likeBook(book))
    } else {
      // unlike book
      setBook({
        ...book,
        liked: !book.liked,
        stats: {
          ...book.stats,
          likes: book.stats.likes - 1
        }
      })
      dispatch(unLikeBook(book))
    }

  }


  return (
    <>
      <div className="position-relative">
        <img src={book.image_url} className="card-img-top banner-height" alt=""/>
      </div>
      <div className="position-absolute img-title-pos">
        <h1 className="book-title ">{book.name}</h1>
        <ul className="list-inline font-orange-bolder">
          <li className="list-inline-item">
            <RatingStar value={book.rating}/>
          </li>
          <li className="list-inline-item position-up"><i
            className="fa fa-user-o"></i>{book.stats.numReviews} Reviews
          </li>
        </ul>

        <ul className="list-inline font-orange-bolder">
          <li className="list-inline-item"><i
            className="fa-solid fa-calendar-days"></i> {book.is_closed ? 'Closed' : 'Open'}
          </li>
        </ul>
        <ul className="list-inline font-orange-bolder">
          <li className="list-inline-item"><i className="fa-solid fa-location-arrow"></i> {book.address}
          </li>
        </ul>
        <div>
          <a href="#writeReview">
            <button type="button" className="btn btn-primary" disabled={!userInfo}>Write Review</button>
          </a>

          <button
            type="button"
            className="btn btn-primary ms-4"
            onClick={likeBookHandler}
            disabled={!userInfo}
          >
            {
              !book.liked &&
              <span>Like</span>
            }
            {
              book.liked &&
              <span>Liked</span>
            }
            <span>({book.stats && book.stats.likes})</span></button>
        </div>

      </div>
    </>
  )
}
export default BookInfo