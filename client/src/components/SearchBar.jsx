// import getBook from '../api/getBook.js'
import {useState} from 'react'

export default function SearchBar({ startSearch }){
    /**
     * This component returns a search bar which
     * will allow users to search for books. 
     */
    const [query, setQuery] = useState('')

    const callSearch = (val) => {
        if (val.key == 'Enter'){
            startSearch(query)
        }
    }
    return(
        <div className="m-5 h-18 max-h-[100px] min-h-0">
            <input 
            type="search" 
            placeholder='Search' 
            onChange={(val) => setQuery(val.target.value)} 
            onKeyDown={callSearch}
            className='bg-[rgb(230,230,225)] w-full max-w-[430px] min-w-0 h-full max-h-[48px] min-h-0 px-5 rounded-xl'
            />
        </div>
    )
}