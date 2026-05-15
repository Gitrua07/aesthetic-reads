import getBook from '../api/getBook.js'
import {useState} from 'react'

export default function SearchBar({ startSearch }){
    /**
     * This component returns a search bar which
     * will allow users to search for books. It will also 
     * contain the profile picture on the top right which when
     * pressed will navigate to the MoodBoardList page
     */
    const [query, setQuery] = useState('')

    const callSearch = (val) => {
        if (val.key == 'Enter'){
            startSearch(query)
        }
    }
    
    return(
        <div className="bg-[rgb(230,230,225)] w-5/6 h-[50px] m-6 rounded-xl">
            <input 
            type="search" 
            placeholder='Search' 
            onChange={(val) => setQuery(val.target.value)} 
            onKeyDown={callSearch}
            className='w-full h-full px-5 rounded-xl'
            />
        </div>
    )
}