import "./App.css";
import { useState , useEffect} from "react";
import { Routes, Route ,Link} from 'react-router-dom';
import SearchPage from "./components/SearchPage";
import Shelves from "./components/Shelves";
import * as BooksAPI from './BooksAPI'

function App() {
  // Defining viewed page state
  const [showSearchPage, setShowSearchPage] = useState(false);

  // Defining Books State 
  const [books, setBooks] = useState([])
  // Receiving Books Data from BooksAPI and updating the books state with it via useEffect Hook
    useEffect(() => {
      const getBooks = async () => {
        const res = await BooksAPI.getAll();
        setBooks(res); 
      }   
      getBooks();
    }, [])

  // Update Shelf Of Books Category
  const updateShelf = (bookToChange, newShelf) => { 
  const updatedBook = books.map(b => {
    if (b.id === bookToChange.id) {
      bookToChange.shelf = newShelf;
      return bookToChange;
    }
    return b;
  })
  setBooks(updatedBook);
  BooksAPI.update(bookToChange, newShelf)
  }


  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
        <div className="list-books">
          {/* HEADER */} 
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>   

          {/* SHELVES */} 
          <Shelves booksFromAPI={books} updateBookShelf={updateShelf} />

          {/* SEARCH BUTTON */} 
          <div className="open-search">
              <Link className="open-search" to="/SearchPage"></Link>
          </div>
        </div>
        } />
        <Route path='/SearchPage' element={<SearchPage updateBookShelf={updateShelf} booksFromAPI={books} />} />
      </Routes>
    </div>
  );
}

export default App;