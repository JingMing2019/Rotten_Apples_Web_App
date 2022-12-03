import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'
import Message from '../Message/Message'
import "./index.css"

const Register = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [location, setLocation] = useState('')
  const [role, setRole] = useState('reader')
  const [selectPrivacy, setSelectPrivacy] = useState(false)
  const [formError, setFormError] = useState('')

  const [searchParams] = useSearchParams()
  // get the redirect path if exists else go to home page
  const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // get the user login data from redux store
  const userRegister = useSelector(state => state.userLogin)
  const { userInfo, error } = userRegister

  useEffect(() => {
    setFormError('')
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect])

  const submitHandler = (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setFormError('Password does not match')
    } else {
      const user = {
        firstname,
        lastname,
        email,
        password,
        location,
        role,
      }
      dispatch(register(user))
    }
  }

  return (
    <>
      <div className="">
        <section className="header">
          {error && <Message variant="danger">{error}</Message>}
          {formError && <Message variant="danger">{formError}</Message>}
          <div className="flex height-100vh">
            <Form className="log-in-form-box height-70vh" onSubmit={submitHandler}>
              <h3 className="text-white mt-2">Sign up</h3>
              {/*<input className="m-2" type="text" placeholder="username"/>*/}
              <Form.Group className="py-2" controlId="firstname">
                <Form.Control
                  type="text"
                  placeholder="firstname"
                  value={firstname}
                  onChange={event => setFirstname(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="py-2" controlId="lastname">
                <Form.Control
                  type="text"
                  placeholder="lastname"
                  value={lastname}
                  onChange={event => setLastname(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="py-2" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="py-2" controlId="confirmPassword">
                <Form.Control
                  type="password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={event => setConfirmPassword(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="py-2" controlId="email">
                <Form.Control
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="py-2" controlId="location">
                <Form.Control
                  type="text"
                  placeholder="location"
                  value={location}
                  onChange={event => setLocation(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="py-2" controlId="role">
                <Form.Select
                  defaultValue={role}
                  onChange={event => setRole(event.target.value)}
                >
                  <option value="reader">Reader</option>
                  <option value="writer">Writer</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="py-2" controlId="privacy">
                <Form.Check type="checkbox">
                  <Form.Check.Input
                    type="checkbox"
                    onChange={() => setSelectPrivacy(!selectPrivacy)}/>
                  <Form.Check.Label>
                    <span className="text-white">I agree to </span>
                    <Link to="/register/privacy"><span className='wd-text'>Privacy Policy</span></Link>
                  </Form.Check.Label>
                </Form.Check>
              </Form.Group>

              <button type="submit"
                      className="btn btn-outline-success hero-btn"
                      disabled={!selectPrivacy}
              >
                Sign up
              </button>
              <span className="text-white m-1">
                Already have an account?<Link to="/login"><span className='wd-text'>Log in</span></Link>
              </span>
            </Form>
          </div>
        </section>
      </div>
    </>
  )
}

export default Register