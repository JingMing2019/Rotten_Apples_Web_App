import React from 'react'
import NavbarComp from './component/Navbar/NavbarComp'
import './App.css'
import './vendors/css/index.css'
import './vendors/bootstrap/css/bootstrap.min.css'
// import './vendors/fontawesome/css/all.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookScreen from './component/BookScreen/bookScreen'
import HomeScreen from './component/HomeScreen/homescreen'
import EditProfile from './component/EditProfile/editProfile'
import RottenApples from './component'
import LogInScreen from './component/LandingScreen/logInScreen'
import Register from './component/LandingScreen/register'
import PrivacyPolicy from './component/LandingScreen/privacyPolicy'
import SearchScreen from './component/SearchScreen/searchScreen'
import UserProfile from './component/ProfileScreen/userProfile'
import OtherUserProfile from './component/ProfileScreen/otherUserProfile'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarComp/>
        <Routes>
          <Route path="/">
            <Route index element={<HomeScreen/>}/>
            <Route path="rottenapples" element={<RottenApples/>}>
              <Route path="login" element={<LogInScreen/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="register/privacy" element={<PrivacyPolicy/>}/>
              <Route path="home" element={<HomeScreen/>}/>
              <Route path="search/:keyword" element={<SearchScreen/>}/>
              <Route path="search/" element={<SearchScreen/>}/>
              <Route path="book/:id" element={<BookScreen/>}/>
              <Route path="profile/:id" element={<OtherUserProfile/>}/>
              <Route path="profile" element={<UserProfile/>}/>
              <Route path="edit" element={<EditProfile/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <div className="flex mt-5">
        <h6 className="text-decoration-none ">
          Copyright © 2022–2022 TooTasty Inc. TooTasty burst and related marks
          are registered trademarks of TooTasty.
        </h6>
      </div>
    </>
  )
}

export default App
