import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import GoogleSearchListItem from './googleSearchListItem'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetSaveGoogleBook } from '../../actions/bookActions'
import './google-search.css'

const GoogleSearchBookList = ({ keyword }) => {
  const keywordSearchRef = useRef()
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
      searchByKeyword().then(r => {})
    }
  }, [dispatch, savedBook])


  const searchByKeyword = async () => {
    const searchKeywordStr = keywordSearchRef.current.value || keyword || 'boston'
    navigate(`/search/${searchKeywordStr}`)
    const response = await axios.get(`/api/google/businesses/search/${searchKeywordStr}`)
    setBooks(response.data.businesses)
  }

  return (
    <div>
      <div className="flex mb-4">
        <div className="row">
          
          <div className="col-11">
            <input ref={keywordSearchRef}
                   className="form-control form-control-lg"
                   type="text"
                   placeholder="Search"
                   value={keywordInput}
                   onChange={event => setKeywordInput(event.target.value)}
            />
          </div>
          <div className="col-1">
            <button onClick={searchByKeyword} type="button" className="btn-lg btn-outline-success hero-btn">Search</button>
          </div>
        </div>
      </div>


      <ul className="list-group">
        {books && books.map(r => (
          <GoogleSearchListItem book={r} key={r.id}/>
        ))}
      </ul>
    </div>
  )
}

export default GoogleSearchBookList