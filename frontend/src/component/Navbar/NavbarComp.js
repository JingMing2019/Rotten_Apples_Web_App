import React from 'react'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import './nav.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'

const NavbarComp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Nav.Link as={Link} to="/tootasty/home"><Navbar.Brand>TooTasty</Navbar.Brand></Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll"/>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/tootasty/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/tootasty/search">Search</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  {userInfo.role === 'owner' && (
                    <LinkContainer to={`/tootasty/restaurant/${userInfo.ownedRestaurant}`}>
                      <NavDropdown.Item>My Restaurant</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <LinkContainer to="/tootasty/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Link
                    className="text-white"
                    to="/tootasty/login"
                  >
                    <button className="btn btn-link-white">Log In</button>
                  </Link>
                  <Link
                    className="text-white"
                    to="/tootasty/register"
                  >
                    <button className="btn btn-outline-white">Sign up</button>
                  </Link>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default NavbarComp