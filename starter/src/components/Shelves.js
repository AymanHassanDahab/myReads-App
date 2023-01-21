import React from 'react'
import BookShelf from './BookShelf'

const Shelves = ({booksFromAPI, updateBookShelf}) => {
    const currentlyReading = booksFromAPI.filter((book) => book.shelf === "currentlyReading");
    const whatToRead = booksFromAPI.filter((book) => book.shelf === "wantToRead");
    const read = booksFromAPI.filter((book) => book.shelf === "read");
    return (
    <div className="list-books-content">
        <BookShelf title="Currently Reading" bookCategory={currentlyReading} changeBookShelf={updateBookShelf}/>
        <BookShelf title="Want To Read" bookCategory={whatToRead} changeBookShelf={updateBookShelf} />
        <BookShelf title="Read" bookCategory={read} changeBookShelf={updateBookShelf} />         
    </div>
  )
}

export default Shelves