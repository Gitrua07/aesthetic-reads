import Searchbar from '../components/SearchBar';
import BookList from '../components/BookList';
import SideBar from '../components/SideBar';

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
     * SideBar.jsx
     */
    
    return(
        <section>
            <Searchbar/>
            <BookList/>
            <SideBar/>
        </section>
    )
}