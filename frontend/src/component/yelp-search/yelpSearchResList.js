import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import YelpSearchListItem from './yelpSearchListItem'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetSaveYelpRestaurant } from '../../actions/restaurantActions'

const YelpSearchResList = ({ keyword }) => {
  const keywordSearchRef = useRef()
  const [restaurants, setRestaurants] = useState()
  const [keywordInput, setKeywordInput] = useState(keyword)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const saveYelpRestaurant = useSelector(state => state.saveYelpRestaurant)
  const { restaurant: savedRestaurant } = saveYelpRestaurant

  useEffect(() => {
    if (savedRestaurant) {
      navigate(`/tootasty/restaurant/${savedRestaurant._id}`)
      // reset saved restaurant state
      dispatch(resetSaveYelpRestaurant())
    } else {
      searchByKeyword()
    }
  }, [dispatch, savedRestaurant])


  const searchByKeyword = async () => {
    const searchKeywordStr = keywordSearchRef.current.value || keyword || 'boston'
    navigate(`/tootasty/search/${searchKeywordStr}`)
    const response = await axios.get(`/api/yelp/businesses/search/${searchKeywordStr}`)
    setRestaurants(response.data.businesses)

  }

  return (
    <div>
      <div className="flex mb-4">
        <div className="row">
          <div className="col-11">
            <input ref={keywordSearchRef}
                   className="form-control"
                   type="text"
                   placeholder="Search"
                   value={keywordInput}
                   onChange={event => setKeywordInput(event.target.value)}
            />
          </div>
          <div className="col-1">
            <button onClick={searchByKeyword}
                    type="button" className="btn btn-outline-primary hero-btn">Search
            </button>
          </div>
        </div>
      </div>
      <ul className="list-group">
        {restaurants && restaurants.map(r => (
          <YelpSearchListItem restaurant={r} key={r.id}/>
        ))}
      </ul>
    </div>
  )
}

export default YelpSearchResList