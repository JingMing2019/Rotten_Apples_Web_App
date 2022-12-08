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
  const active = paths[1]? paths[1] : 'home';

  return (
    <header>
      <Navbar variant="light" expand="lg" className="navbar-bg-color">
        <Container>
          <Nav.Link as={Link} to="/"><Navbar.Brand>Rotten Apples</Navbar.Brand></Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll"/>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link as={Link} to="/home" className={`${active === 'home' ? 'active' : ""}`}>Home</Nav.Link>
              <Nav.Link as={Link} to="/search" className={`${active === 'search' ? 'active' : ""}`}>Search</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {userInfo ? (
                <NavDropdown className='dropdown-item' title={userInfo.name} id="username">
                  {userInfo.role === 'writer' && (
                      // <LinkContainer to={`/book/${userInfo.ownedBooks}`}>
                      //   <NavDropdown.Item className='dropdown-item'>My Books</NavDropdown.Item>
                      // </LinkContainer>
                    <LinkContainer to={`/addbook`}>
                      <NavDropdown.Item className='dropdown-item'>Add My Book</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <LinkContainer to="/profile">
                    <NavDropdown.Item className='dropdown-item'>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item className='dropdown-item' onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Link className="text-white me-2" to="/login">
                    <button className="btn btn-outline-success btn-link-black">Log in</button>
                  </Link>
                  <Link className="text-white" to="/register">
                    <button className="btn btn-outline-success btn-outline-black">Sign up</button>
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