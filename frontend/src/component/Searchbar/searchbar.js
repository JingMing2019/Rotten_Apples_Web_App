import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Searchbar = () => {

  const navigate = useNavigate()

  const [keyword, setKeyword] = useState('')

  const searchButtonHandler = () => {
    navigate(`/search/${keyword}`)
  }

  return (
    <>
      <div className="flex mb-4">
        <div className="row">
          <div className="col-11">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={event => setKeyword(event.target.value)}
            />
          </div>
          <div className="col-1">
            <button
              type="button"
              className="btn btn-outline-success hero-btn"
              onClick={searchButtonHandler}>
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Searchbar