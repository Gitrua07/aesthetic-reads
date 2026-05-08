import Searchbar from '../components/SearchBar';
import MoodBoardsGrid from '../components/MoodBoardsGrid';
import SideBar from '../components/SideBar';

export default function MoodBoardList(){
    /**
     * MoodBoardList:
     * This page contains a list of 
     * all the user's created mood boards.
     * It will allow users to select a mood board or
     * create a mood board. If the user selects a mood board
     * then the user will be navigated to the MoodBoardSelected 
     * page. The user can create a new mood board on this page.
     * 
     * This page will contain the following components:
     * SearchBar.jsx
     * MoodBoardsGrid.jsx
     * SideBar.jsx
     */
    
    return(
        <section>
            <Searchbar/>
            <MoodBoardsGrid/>
            <SideBar/>
        </section>
    )
}