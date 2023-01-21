import React from 'react'

const Book = ({bookCategory, changeBookShelf}) => {
  return (
    <div className="book">
        <div className="book-top">
            <div
            className="book-cover"
            style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${bookCategory.imageLinks ? bookCategory.imageLinks.thumbnail : "none"})`,
            }}
            ></div>
            <div className="book-shelf-changer">
                <select defaultValue={bookCategory.shelf ? bookCategory.shelf : "none"} onChange={(e) => changeBookShelf(bookCategory, e.target.value)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>
        <div className="book-title">{bookCategory.title ? bookCategory.title : "none"}</div>
        <div className="book-authors">{`By: ${bookCategory.authors ? bookCategory.authors.map((author => `${author} `)) : "none"}`}</div>
    </div>
  )
}

export default Book