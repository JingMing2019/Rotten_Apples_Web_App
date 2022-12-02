import React from 'react'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
import './nav.css'
import {useLocation} from "react-router";

const NavbarComp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const active = paths.length >= 3? paths[2] : 'home';

  return (
    <header>
      <Navbar variant="light" expand="lg" className="navbar-bg-color">
        <Container>
          <Nav.Link as={Link} to="/rottenapples/home"><Navbar.Brand>Rotten Apples</Navbar.Brand></Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll"/>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link as={Link} to="/rottenapples/home" className={`${active === 'home' ? 'active' : ""}`}>Home</Nav.Link>
              <Nav.Link as={Link} to="/rottenapples/search">Search</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  {userInfo.role === 'writer' && (
                    <LinkContainer to={`/rottenapples/book/${userInfo.ownedBooks}`}>
                      <NavDropdown.Item>My Books</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <LinkContainer to="/rottenapples/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Link
                    className="text-white"
                    to="/rottenapples/login"
                  >
                    <button className="btn btn-link-white">Log in</button>
                  </Link>
                  <Link
                    className="text-white"
                    to="/rottenapples/register"
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