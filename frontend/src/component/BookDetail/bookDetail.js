import React from 'react'
import BookInfo from './bookInfo'

const BookDetail = ({ book }) => {

  return (
    <>
      <section className="header height-auto">
        <div className="container ps-0 pe-0">
          <div className="row">
            {book && <BookInfo bookInfo={book}/>}
          </div>
        </div>
      </section>
    </>

  )
}

export default BookDetail

