import "./App.css";
import { useState , useEffect} from "react";
import { Routes, Route ,Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import SearchPage from "./components/SearchPage";
import Shelves from "./components/Shelves";

function App() {
  // Defining Books State 
  const [books, setBooks] = useState([])
  // Receiving Books Data from BooksAPI and updating the books state with it via useEffect Hook
  useEffect(() => {
      const getBooks = async () => {
        await BooksAPI.getAll().then((allBooks) => setBooks(allBooks));
      }   
      getBooks();
  }, []);

  // Update Shelf Of Books Category
  const updateShelf = (bookToChange, newShelf) => { 
      BooksAPI.update(bookToChange, newShelf).then(() => {
        bookToChange.shelf = newShelf
        setBooks(books.filter(b => b.id !== bookToChange.id).concat(bookToChange))
      });
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
                        <Link className="open-search" to="/search"></Link>
                    </div>
                </div>
            } />
            
            <Route path='/search' element={<SearchPage updateBookShelf={updateShelf} booksFromAPI={books} />} />
        </Routes>
    </div>
  );
}

export default App;
