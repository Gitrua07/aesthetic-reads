import Searchbar from '../components/SearchBar';
import BookList from '../components/BookList';
import {useState} from 'react';

export default function Home(){
    /**
     * Home:
     * This page contains the search bar and 
     * a list of books represented with an image 
     * and text. This book can be selected and 
     * paired to an existing mood board or to create
     * a new mood board.
     * 
     * This page contains the following components:
     * SearchBar.jsx
     * BookList.jsx
     */

    //Retrives queries from search bar
    const [query, getQuery] = useState('')
    const Search = (val) => {
        getQuery(val)
    }

    return(
        <div className='flex flex-col'>
            <title>Home Page - Aesthetic Reads</title>
            <h1 className="text-neutral-900 px-6 py-0 m-0">Home Page</h1>

            <Searchbar startSearch={Search}/>
            <BookList query={query}/>
        </div>
    )
}