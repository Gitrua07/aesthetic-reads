import { useState } from 'react'

export default function SearchBar({ startSearch }) {
    /**
     * This component returns a search bar which
     * will allow users to search for books. 
     */

    const [query, setQuery] = useState('')

    const callSearch = (e) => {
        e.preventDefault()
        startSearch(query)
    }
    return (
        <form className="m-5 h-18 max-h-[100px] min-h-0" onSubmit={(e) => callSearch(e)}>
            <input
                type="search"
                placeholder='Search'
                onChange={(val) => setQuery(val.target.value)}
                className='bg-[rgb(230,230,225)] w-full max-w-[430px] min-w-0 h-full max-h-[48px] min-h-0 px-5 rounded-xl'
            />
        </form>
    )
}