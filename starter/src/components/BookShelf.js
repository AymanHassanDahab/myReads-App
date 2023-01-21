import React from 'react'
import Book from './Book'

const BookShelf = ({title, bookCategory, changeBookShelf}) => {
  return (
    <div>
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                 { bookCategory.map((currentBook) => 
                    <li key={currentBook.id}>
                        <Book bookCategory={currentBook} changeBookShelf={changeBookShelf} />
                    </li>              
                 )}
                </ol>
            </div>
        </div>
    </div>
  )
}

export default BookShelf