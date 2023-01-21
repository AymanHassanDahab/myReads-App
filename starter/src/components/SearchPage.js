import React from 'react'
import { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import Book from './Book'
import * as BooksAPI from '../BooksAPI'


const SearchPage = ({updateBookShelf, booksFromAPI}) => {
  // Defining Search Query State
  const [query, setQuery] = useState("");
  const [searchedBook, setSearchedBook] = useState([]);
  // Receiving Query Data from BooksAPI via useEffect Hook
  useEffect(() => {
    let active = true;
    const searchOutput = async () => {
        if (query) {
            const dataOutput = await BooksAPI.search(query)
            if (dataOutput.error) {
                setSearchedBook([])
            } else if (active) {              
                setSearchedBook(dataOutput.map(setSearchedBook => {
                        booksFromAPI.forEach((book)=>
                        {
                            if (searchedBook.title === book.title) {
                                searchedBook.shelf = book.shelf
                            }                                  
                        });
                        return setSearchedBook
                    })
                )        
            }
        }
    } 
    if (query !== "" ) {
        searchOutput();
    } else if (!searchedBook.shelf) {
        searchedBook.shelf = "none";
    }
    return() => {
      active = false;
      setSearchedBook([]);
    }
  }, [query])

  return (
    <div className="search-books">
        <div className="search-books-bar">
            <Link to="/">
                <button className="close-search" >
                    Close
                </button>
            </Link>
            <div className="search-books-input-wrapper">
                <input 
                type="text" 
                placeholder="Search by title, author, or ISBN" 
                value={query} 
                onChange={(e) => {setQuery(e.target.value)}} 
                />
            </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid">
                { 
                searchedBook.map((b) => 
                    <li key={b.id}>
                        <Book bookCategory={b} changeBookShelf={updateBookShelf} />
                    </li>              
                )}
            </ol>
        </div>
    </div>
  )
}

export default SearchPage