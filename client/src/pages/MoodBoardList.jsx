import MoodBoardsGrid from '../components/MoodBoardsGrid';

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

    return(
        <div >
            <title>Your Moodboards - Aesthetic Reads</title>
            <h1 className="text-neutral-900 px-6">Your Moodboards</h1>
            <MoodBoardsGrid />
        </div>
    )
}