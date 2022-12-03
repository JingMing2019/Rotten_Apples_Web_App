import React from 'react'
import GoogleSearchBookList from '../google-search/googleSearchBookList'
import { useParams } from 'react-router-dom'
import appLogo from '../../vendors/img/apple.png'
import Searchbar from "../Searchbar/searchbar";

const SearchScreen = () => {

  const { keyword } = useParams()

  // When there has keyword, invoke google search, else show the search bar.
  return (
    <>
      <div>
        <section className="header">
          <div className="flex">
            <img className="mt-5" alt="webLogo" height="200px" src={appLogo}/>
          </div>
          {keyword && <GoogleSearchBookList keyword={keyword}/>}
          {!keyword && <Searchbar />}
        </section>
      </div>
    </>
  )
}
export default SearchScreen