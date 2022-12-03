import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'
import Message from '../Message/Message'
import "./index.css"

const LogInScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [searchParams] = useSearchParams()
  // get the redirect path if exists else go to home page
  const redirect = searchParams.get('redirect') ? '/' + searchParams.get('redirect') : '/'

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitLogin = () => {
    dispatch(login(email, password))
  }

  // get the user login data from redux store
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo, error } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect])

  return (
    <>
      <div className="">
        <section className="header">
          {error && <Message variant="danger">{error}</Message>}
          <div className="flex height-100vh">

            <div className="log-in-form-box">
              <h3 className="text-white mt-2">login</h3>
              <input
                className="m-2"
                type="email"
                placeholder="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              <input
                className="m-2"
                type="password"
                placeholder="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-success hero-btn"
                onClick={submitLogin}
              >
                Log In
              </button>
              <span className="text-white m-1">New to Rotten Apples? <Link to="/register"><span className="wd-text"> Sign up</span></Link></span>
            </div>
          </div>
        </section>
      </div>

    </>
  )
}

export default LogInScreen