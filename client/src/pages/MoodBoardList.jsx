// import Searchbar from '../components/SearchBar';
import MoodBoardsGrid from '../components/MoodBoardsGrid';
// import SideBar from '../components/SideBar';

export default function MoodBoardList(){
    /**
     * MoodBoardList:
     * This page contains a list of 
     * all the user's created mood boards.
     * It will allow users to select a mood board or
     * create a mood board. If the user selects a mood board
     * then the user will be navigated to the MoodBoardSelected 
     * page. The user can create a new mood board on this page.
     */
    // flex-1 h-full w-full min-overflow-y-auto flex-wrap
    // flex h-full flex-col mx-10 my-20
    return(
        <div >
            <title>Your Moodboards - Aesthetic Reads</title>
            <h1 className="text-neutral-900 px-6">Your Moodboards</h1>
            <MoodBoardsGrid />
        </div>
    )
}