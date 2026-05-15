import Searchbar from '../components/SearchBar';
import BookList from '../components/BookList';
import SideBar from '../components/SideBar';
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
     * This page will contain the following components:
     * SearchBar.jsx
     * BookList.jsx
     */

    const [query, getQuery] = useState('')

    const Search = (val) => {
        getQuery(val)
    }

    return(
        <section className='flex h-full flex-col'>
            <Searchbar startSearch={Search}/>
            <BookList query={query}/>
        </section>
    )
}