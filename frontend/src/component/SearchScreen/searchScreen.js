import React from 'react'
import GoogleBookSearchBookList from '../googlebook-search/googlebookSearchBookList'
import { useParams } from 'react-router-dom'

const SearchScreen = () => {

  const { keyword } = useParams()

  return (
    <>
      <div>
        <section className="header">
          <div className="flex">
            <img className="mt-5" alt="webLogo" height="100px" src="/img/center-logo.png"/>
          </div>
          <GoogleBookSearchBookList keyword={keyword}/>
        </section>

      </div>
    </>
  )
}
export default SearchScreen