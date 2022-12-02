import Searchbar from '../Searchbar/searchbar'
import TopLikedBook from './topLikedBook'
import RecentReviewedBook from './recentReviewedBook'
import React from 'react'
import { useSelector } from 'react-redux'
import appLogo from '../../vendors/img/apple.png'

const HomeScreen = () => {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <>
      <div>
        <section className="header">
          <div className="flex">
            <img
              className="mt-5"
              alt="webLogo"
              height="250px"
              src={appLogo}/>
          </div>
          <Searchbar/>
        </section>

        <section className="homepage-card-section">
          <TopLikedBook/>
          {/*{RecentReviewedBook()}*/}
          {userInfo && <RecentReviewedBook/>}
        </section>
      </div>
    </>
  )
}
export default HomeScreen
