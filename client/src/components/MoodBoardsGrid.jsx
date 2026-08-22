import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoodBoardCard from './MoodboardCard'
import axios from 'axios'
// import { v4 as uuidv4 } from 'uuid'

export default function MoodBoardsGrid() {
    /**
     * This component returns a list of mood boards.
     * 'Sad Boy', 'Emo', 'Sunshine'
     */
    const [moodboard, setMoodboard] = useState([])
    const [newMoodBoard, setNewMoodBoard] = useState('')
    // useEffect(() => {
    //     axios
    //         .get('http://localhost:3001/api/moodboards')
    //         .then(response => {
    //             // console.log(response.data)
    //             setMoodboard(moodboard.concat(response.data))
    //         })
    // }, [])

    const moodboardsArray = [
        {
            'title': 'Hello',
            'link': '/moodboard/0',
            'src': '../public/favicon.svg',
            'alt': 'image 0'
        },
        {
            'title': 'Hello',
            'link': '/moodboard/1',
            'src': '../public/favicon.svg',
            'alt': 'image 0'
        },
        {
            'title': 'Hello',
            'link': '/moodboard/2',
            'src': '../public/favicon.svg',
            'alt': 'image 0'
        },
    ]

    const createMoodBoard = (event) => {
        event.preventDefault()
        const moodboardToSend = {title: newMoodBoard}
        axios
        .post('http://localhost:3001/api/moodboards', moodboardToSend)
        .then(response => console.log(response))
        .catch(response => console.error(response))
        setNewMoodBoard('')
    }

    return (
        <section className='m-10'>
            <h1>Your Book Moodboards</h1>
            <div>
                <form className='flex gap-5 justify-center items-center' onSubmit={createMoodBoard}>
                    <button><img className='max-w-20 mt-10' src='src\assets\add.png'/></button>
                    <input 
                        type='text' 
                        className='px-2 shadow-md rounded-md border border-gray-200 p-0 h-15'
                        value={newMoodBoard}
                        onChange={e => setNewMoodBoard(e.target.value)}
                    ></input>
                </form>
            </div>
            <div className="mt-15 flex flex-wrap gap-5"> 
                {/* {moodboard.map((value, index) => {
                    return (
                        <MoodBoardCard
                            title={value.title}
                            src={value.src}
                            link={value.link}
                        />
                    )
                })} */}
                {moodboardsArray.map((value, index) => {
                    return (
                        <div className='text-center' key={index}>
                            <Link to={value.link}>
                                <div className='h-100 w-100 flex flex-wrap rounded-xl'>
                                    <div className='bg-red-100 h-50 w-50'><img src={value.src} alt={value.alt}/></div>
                                    <div className='bg-blue-100 h-50 w-50'><img src={value.src} alt={value.alt}/></div>
                                    <div className='bg-yellow-100 h-50 w-50'><img src={value.src} alt={value.alt}/></div>
                                    <div className='bg-green-100 h-50 w-50'><img src={value.src} alt={value.alt}/></div>
                                    <img />
                                </div>
                            </Link>
                            <div><b>{value.title}</b></div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}