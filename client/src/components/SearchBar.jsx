import getBook from '../api/getBook.js'

export default function SearchBar(){
    /**
     * This component returns a search bar which
     * will allow users to search for books. It will also 
     * contain the profile picture on the top right which when
     * pressed will navigate to the MoodBoardList page
     */

    //Treat the search bar as an input bar where users can input text
    //This text will be used for queries
    //These queries will be passed down to the booklist area
    return(
        <div className="bg-[rgb(230,230,225)] w-5/6 h-[50px] m-6 rounded-xl"></div>
    )
}