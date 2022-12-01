import Searchbar from '../Searchbar/searchbar'
import TopLikedRes from '../HomeScreen/topLikedRes'
import RecentReviewedRes from '../HomeScreen/recentReviewedRes'
import React from 'react'
import { useSelector } from 'react-redux'

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
              src="/img/apple.png"
            />
          </div>
          <Searchbar/>
        </section>

        <section className="homepage-card-section">
          <TopLikedRes/>
          {/*{RecentReviewedRes()}*/}
          {userInfo && <RecentReviewedRes/>}
        </section>
      </div>
    </>
  )
}
export default HomeScreen
