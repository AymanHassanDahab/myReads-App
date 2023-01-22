import React from 'react'
import { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

const SearchPage = ({updateBookShelf, booksFromAPI}) => {
    // Defining "Queries" State
    const [query, setQuery] = useState("");
    // Defining "searched books" State
    const [searchedBook, setSearchedBook] = useState([]);
    // Receiving Query Data from BooksAPI via useEffect Hook
    useEffect(() => {
        const searchOutput = async () => {
            if (query) {
                await BooksAPI.search(query).then((dataOutput) => {
                    if (dataOutput.error) {
                        setSearchedBook([])
                    } else {              
                        setSearchedBook(dataOutput.map(setSearchedBook => {
                            booksFromAPI.forEach((book) => {
                                if (searchedBook.title === book.title) {
                                    searchedBook.shelf = book.shelf
                                }                                  
                            });
                            return setSearchedBook
                        })
                    )}
                })   
            }
        } 
        if (query !== "" ) {
            searchOutput();
        } else if (!searchedBook.shelf) {
            searchedBook.shelf = "none";
        }
        return() => {
            setSearchedBook([]);
        }
    }, [query])

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/">
                    <button className="close-search" >Close</button>
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
                    searchedBook.map((selectedBook) => 
                        <li key={selectedBook.id}>
                            <Book bookCategory={selectedBook} changeBookShelf={updateBookShelf} />
                        </li>              
                    )}
                </ol>
            </div>
        </div>
    );
}

export default SearchPage
