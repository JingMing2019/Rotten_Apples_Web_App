import React from 'react'
import GoogleBookSearchBookList from '../google-search/googleSearchBookList'
import { useParams } from 'react-router-dom'
import appLogo from '../../vendors/img/apple.png'

const SearchScreen = () => {

  const { keyword } = useParams()

  return (
    <>
      <div>
        <section className="header">
          <div className="flex">
            <img className="mt-5" alt="webLogo" height="100px" src={appLogo}/>
          </div>
          <GoogleBookSearchBookList keyword={keyword}/>
        </section>
      </div>
    </>
  )
}
export default SearchScreen