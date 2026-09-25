import MoodBoardImages from '../components/MoodBoardImages';

export default function MoodBoardSelected(){
    /**
     * MoodBoardSelected:
     * This page contains a full list of 
     * all the images and books contained in a
     * mood board. This mood board will seperate the
     * list of books and list of images. The list of 
     * books will at default be compact. When the user 
     * clicks on the area of books, it will expand.
     * The user can also add images and manually add
     * books on this page.
     * 
     * This page will contain the following components:
     * MoodBoardImages.jsx
     * SearchBar.jsx
     * SideBar.jsx
     */
    return(
        <div>
            <MoodBoardImages/>
        </div>
    )
}