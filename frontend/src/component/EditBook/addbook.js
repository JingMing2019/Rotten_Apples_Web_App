import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {register, resetCreateBook} from '../../actions/bookActions'
import "./index.css"


const AddBook = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const createBook = useSelector(state => state.createBook)
    const { book: created } = createBook
    const { userInfo } = userLogin
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [authors, setAuthors] = useState(userInfo.name)
    const [image_url, setImage_url] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fdemo.publishr.cloud%2Fbooks%2Fyour-goal-guide-by-debra-eckerling-755-b&psig=AOvVaw1aUp28_hBBD5UhShqEw_yb&ust=1670478212826000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMDTqZa-5vsCFQAAAAAdAAAAABAI")
    const [rating, setRating] = useState('')
    const [description, setDescription] = useState('')
    const [published_date, setPublished_date] = useState('')
    const [page, setPage] = useState('')
    // const [formError, setFormError] = useState('')

    const [searchParams] = useSearchParams()
    // get the redirect path if exists else go to home page
    // const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'


    //
    // // get the user login data from redux store
    // const userRegister = useSelector(state => state.userLogin)
    // const { userInfo, error } = userRegister

    useEffect(() => {
        // setFormError('')
        console.log(created)
        if (created) {
            navigate(`/book/${created._id}`);
            dispatch(resetCreateBook());
        }else{
            // searchByKeyword().then(() => {});
        }
    }, [created,navigate,dispatch])

    const submitHandler = (event) => {
        event.preventDefault()

            const book = {
                google_id : "",
                title: title,
                subtitle: subtitle,
                authors: [authors],
                image_url: image_url,
                rating: rating,
                description: description,
                published_date: published_date,
                page: page,
                stats: {
                    numReviews: 0,
                    // rating: 0,
                    likes: 0,
                },
                reviews: []

            }
            console.log()
            dispatch(register(book))
    }

    return (
        <>
            <div className="">
                <section className="header">
                    {/*{error && <Message variant="danger">{error}</Message>}*/}
                    {/*{formError && <Message variant="danger">{formError}</Message>}*/}
                    <div className="flex height-100vh">
                        <Form className="log-in-form-box height-70vh" onSubmit={submitHandler}>
                            <h3 className="text-white mt-2">Add My Book</h3>
                            {/*<input className="m-2" type="text" placeholder="username"/>*/}
                            <Form.Group className="py-2" controlId="firstname">
                                <Form.Control
                                    type="text"
                                    placeholder="title"
                                    value={title}
                                    onChange={event => setTitle(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="py-2" controlId="lastname">
                                <Form.Control
                                    type="text"
                                    placeholder="subtitle"
                                    value={subtitle}
                                    onChange={event => setSubtitle(event.target.value)}
                                />
                            </Form.Group>
                            {/*<Form.Group className="py-2" controlId="password">*/}
                            {/*    <Form.Control*/}
                            {/*        type="password"*/}
                            {/*        placeholder="password"*/}
                            {/*        value={password}*/}
                            {/*        onChange={event => setPassword(event.target.value)}*/}
                            {/*    />*/}
                            {/*</Form.Group>*/}
                            {/*<Form.Group className="py-2" controlId="confirmPassword">*/}
                            {/*    <Form.Control*/}
                            {/*        type="password"*/}
                            {/*        placeholder="confirm password"*/}
                            {/*        value={confirmPassword}*/}
                            {/*        onChange={event => setConfirmPassword(event.target.value)}*/}
                            {/*    />*/}
                            {/*</Form.Group>*/}
                            <Form.Group className="py-2" controlId="email">
                                <Form.Control
                                    type="test"
                                    placeholder="rating"
                                    value={rating}
                                    onChange={event => setRating(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="py-2" controlId="location">
                                <Form.Control
                                    type="text"
                                    placeholder="description"
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="py-2" controlId="location">
                                <Form.Control
                                    type="text"
                                    placeholder="published date"
                                    value={published_date}
                                    onChange={event => setPublished_date(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="py-2" controlId="location">
                                <Form.Control
                                    type="text"
                                    placeholder="page"
                                    value={page}
                                    onChange={event => setPage(event.target.value)}
                                />
                            </Form.Group>
                            {/*<Form.Group className="py-2" controlId="role">*/}
                            {/*    <Form.Select*/}
                            {/*        defaultValue={role}*/}
                            {/*        onChange={event => setRole(event.target.value)}*/}
                            {/*    >*/}
                            {/*        <option value="reader">Reader</option>*/}
                            {/*        <option value="writer">Writer</option>*/}
                            {/*        <option value="admin">Admin</option>*/}
                            {/*    </Form.Select>*/}
                            {/*</Form.Group>*/}
                            {/*<Form.Group className="py-2" controlId="privacy">*/}
                            {/*    <Form.Check type="checkbox">*/}
                            {/*        <Form.Check.Input*/}
                            {/*            type="checkbox"*/}
                            {/*            onChange={() => setSelectPrivacy(!selectPrivacy)}/>*/}
                            {/*        <Form.Check.Label>*/}
                            {/*            <span className="text-white">I agree to </span>*/}
                            {/*            <Link to="/register/privacy"><span className='wd-text'>Privacy Policy</span></Link>*/}
                            {/*        </Form.Check.Label>*/}
                            {/*    </Form.Check>*/}
                            {/*</Form.Group>*/}

                            <button type="submit"
                                    className="btn btn-outline-success hero-btn"
                                    onClick={submitHandler}
                            >
                                <Link to = "/home"></Link>
                                Submit
                            </button>
              {/*              <span className="text-white m-1">*/}
              {/*  Already have an account?<Link to="/login"><span className='wd-text'>Log in</span></Link>*/}
              {/*</span>*/}
                        </Form>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AddBook