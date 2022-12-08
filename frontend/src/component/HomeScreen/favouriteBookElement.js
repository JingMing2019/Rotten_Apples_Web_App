import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

const FavouriteBookElement = ({ book }) => {
  console.log(book)
  return (
    <Card className="my-2 p-2 border-0 text-center same-width">
      <Link to={`/book/${book.book}`}>
        <Card.Img variant="top" src={book.image_url} alt=""/>
      </Link>
      <Card.Body>
        <Card.Title as="h3">{book.title}</Card.Title>
        <Card.Text>
          <i className="fa-solid fa-heart"/>
          &nbsp;liked&nbsp;
          <i className="fa-solid fa-heart"/>
        </Card.Text>
        <Link to={`/book/${book.book}`}>
          <Button variant="primary">Review Again</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}
export default FavouriteBookElement