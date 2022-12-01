import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

const FavouriteResElement = ({ restaurant }) => {
  return (
    <Card className="my-2 p-2 border-0 text-center">
      <Link to={`/tootasty/restaurant/${restaurant.restaurant}`}>
        <Card.Img variant="top" src={restaurant.image_url} alt=""/>
      </Link>
      <Card.Body>
        <Card.Title as="h3">{restaurant.name}</Card.Title>
        <Card.Text>
          <i className="fa-solid fa-heart"/>
          &nbsp;liked&nbsp;
          <i className="fa-solid fa-heart"/>
        </Card.Text>
        <Link to={`/tootasty/restaurant/${restaurant.restaurant}`}>
          <Button variant="primary">Review Again</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}
export default FavouriteResElement
