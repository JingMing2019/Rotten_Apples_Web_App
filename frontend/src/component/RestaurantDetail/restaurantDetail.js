import React from 'react'
import RestaurantInfo from './restaurantInfo'

const RestaurantDetail = ({ restaurant }) => {

  return (
    <>
      <section className="header height-auto">
        <div className="container ps-0 pe-0">
          <div className="row">
            {restaurant && <RestaurantInfo restaurantInfo={restaurant}/>}
          </div>
        </div>
      </section>
    </>

  )
}

export default RestaurantDetail

