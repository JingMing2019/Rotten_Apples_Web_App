import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GoogleSearchListItem from './googleSearchListItem'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetSaveGoogleBook } from '../../actions/bookActions'
import './google-search.css'

const GoogleSearchBookList = ({ keyword }) => {
  const [books, setBooks] = useState()
  const [keywordInput, setKeywordInput] = useState(keyword)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const saveGoogleBook = useSelector(state => state.saveGoogleBook)
  const { book: savedBook } = saveGoogleBook

  useEffect(() => {
    if (savedBook) {
      navigate(`/book/${savedBook._id}`)
      // reset saved book state
      dispatch(resetSaveGoogleBook())
    } else {
      searchByKeyword()
    }
  }, [dispatch, savedBook])


  const searchByKeyword = async () => {
    navigate(`/search/${keywordInput}`)
    try {
      const response = await axios.get(`/api/google/search/${keywordInput}`)
      setBooks(response.data.data.items)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="flex mb-4">
        <div className="row">
          <div className="col-11">
            <input className="search-bar form-control"
                   type="text"
                   placeholder="Search"
                   value={keywordInput}
                   onChange={event => setKeywordInput(event.target.value)}/>
          </div>
          <div className="col-1">
            <button type="button"
                    className="btn btn-outline-success hero-btn"
                    onClick={searchByKeyword}>
              Search
            </button>
          </div>
        </div>
      </div>
      <ul className="list-group">
        {books && <h5 className="text-white my-3">Results from Google Books...</h5>}
        {
          books &&
            books.map(
              book => (<GoogleSearchListItem book={book} key={book.id}/>)
            )
        }
      </ul>
    </div>
  )
}

export default GoogleSearchBookList