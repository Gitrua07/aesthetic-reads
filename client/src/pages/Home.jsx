import Searchbar from '../components/SearchBar';
import BookList from '../components/BookList';
// import SideBar from '../components/SideBar';
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
        <section className='flex flex-col'>
            <Searchbar startSearch={Search}/>
            <BookList query={query}/>
        </section>
    )
}