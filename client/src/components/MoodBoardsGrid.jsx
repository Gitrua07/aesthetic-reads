import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoodBoardCard from './MoodboardCard'
import axios from 'axios'
import MoodBoardServices from "../services/Moodboard.js"
//----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----
// import { useAuth } from '../auth/AuthContext'
//----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----

// import { v4 as uuidv4 } from 'uuid'

const getMoodboard = await MoodBoardServices.getMoodBoard()

export default function MoodBoardsGrid() {
    /**
     * This component returns a list of mood boards.
     * 'Sad Boy', 'Emo', 'Sunshine'
     */
    const [moodboard, setMoodboard] = useState([])
    const [newMoodBoard, setNewMoodBoard] = useState('')

    //Retrieves moodboards from /api/moodboard endpoint
    useEffect(() => setMoodboard(getMoodboard), [])
    // useEffect(() => {
    //     axios
    //         .get('http://localhost:3001/api/moodboards')
    //         .then(response => {
    //             // console.log(response.data)
    //             setMoodboard(moodboard.concat(response.data))
    //         })
    // }, [])
    //----TEMP: Replace with fetch to backend----
    //----TEMP: Replace with fetch to backend----

    //----UNLOCK WHEN YOU ARE IMPLEMENTING AUTHENTICATION----
    // const {
    //     authUser,
    //     setAuthUser,
    //     isLoggedIn,
    //     setLoggedIn } = useAuth()
    //----UNLOCK WHEN YOU ARE IMPLEMENTING AUTHENTICATION----

    // const createMoodBoard = (event) => {
    //     event.preventDefault()
    //     const moodboardToSend = { title: newMoodBoard }
    //     axios
    //         .post('http://localhost:3001/api/moodboards', moodboardToSend)
    //         .then(response => console.log(response))
    //         .catch(response => console.error(response))
    //     setNewMoodBoard('')
    // }

    // {moodboardsArray2.map((value, index) => {
    //     return (
    //         <div key={index}>
    //             <Link to={value.link}>
    //                 <div className='h-50 w-50 flex flex-wrap rounded-xl'>
    //                     {/* <div className='bg-red-100 h-25 w-25 rounded-tl-xl'><img src={value.src} alt={value.alt} /></div>
    //                     <div className='bg-blue-100 h-25 w-25 rounded-tr-xl'><img src={value.src} alt={value.alt} /></div>
    //                     <div className='bg-yellow-100 h-25 w-25 rounded-bl-xl'><img src={value.src} alt={value.alt} /></div>
    //                     <div className='bg-green-100 h-25 w-25 rounded-br-xl'><img src={value.src} alt={value.alt} /></div> */}
    //                 </div>
    //             </Link>
    //             <div className='px-2 py-3 text-start font-bold text-xl text-neutral-900'>{value.name}</div>
    //         </div>
    //     )
    // })}


    const createMoodBoardT = (e) => {
        e.preventDefault()
        const id = 'id' + (new Date()).getTime()
        setMoodboard(moodboard => [...moodboard, {
            name: newMoodBoard,
            link: `/moodboard/${id}`,
            books: [],
            thumbnails: []
        }])
        console.log("CREATED!")
    }

    const deleteMoodBoard = (e, link) => {
        e.preventDefault()
        setMoodboard(moodboards => moodboards.filter(moodboard => moodboard.link !== link))
        console.log("DELETED!")
    }

    return (
        <section className='max-w-full min-w-0 flex flex-wrap m-6 flex-col'>
            <div className="flex flex-col gap-5 items-start">
                <h1 className="text-neutral-900">Your Moodboards</h1>
                <div className="">
                    <form className='flex gap-5 justify-center items-center'>
                        <input
                            type='text'
                            className='px-2 shadow-md rounded-md border border-gray-200 p-0 h-[50px] w-[300px] max-h-full min-h-0 max-w-full min-w-0'
                            value={newMoodBoard}
                            onChange={e => setNewMoodBoard(e.target.value)}
                        ></input>
                        <button type="submit" onClick={(e) => createMoodBoardT(e)}><img className='w-[50px] max-w-full min-w-0' src='src\assets\add.png' /></button>
                    </form>
                </div>
            </div>

            <div className="mt-15 flex flex-wrap gap-5">
                {
                    moodboard.map((value, index) => {
                        return (
                            <div key={index}>
                                <Link to={value.link}>
                                    <div className='h-50 w-50 flex flex-wrap rounded-xl'>
                                        <div className='bg-red-100 h-25 w-25 rounded-tl-xl'><img className='h-25 w-25 rounded-tl-xl' src={value.thumbnails[0]} alt={value.books[0]} /></div>
                                        <div className='bg-blue-100 h-25 w-25 rounded-tr-xl'><img className='h-25 w-25 rounded-tr-xl' src={value.thumbnails[1]} alt={value.books[1]} /></div>
                                        <div className='bg-yellow-100 h-25 w-25 rounded-bl-xl'><img className='h-25 w-25 rounded-bl-xl' src={value.thumbnails[2]} alt={value.books[2]} /></div>
                                        <div className='bg-green-100 h-25 w-25 rounded-br-xl'><img className='h-25 w-25 rounded-br-xl' src={value.thumbnails[3]} alt={value.books[3]} /></div>
                                    </div>
                                </Link>
                                <div className='px-2 py-3 text-start font-bold text-xl text-neutral-900'>{value.name}</div>
                                <button onClick={(e) => deleteMoodBoard(e, value.link)}>Delete Moodboard</button>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

//----REPLACE THIS IN RETURN WHEN DOING AUTHENTICATION----
{/* <>
{isLoggedIn ? 
<section className='max-w-full min-w-0 flex flex-wrap m-6 flex-col'>
    <div className="flex flex-col gap-5 items-start">
        <h1 className="text-neutral-900">Your Moodboards</h1>
        <div className="">
            <form className='flex gap-5 justify-center items-center'>
                <input
                    type='text'
                    className='px-2 shadow-md rounded-md border border-gray-200 p-0 h-[50px] w-[300px] max-h-full min-h-0 max-w-full min-w-0'
                    value={newMoodBoard}
                    onChange={e => setNewMoodBoard(e.target.value)}
                ></input>
                <button type="submit" onClick={(e) => createMoodBoardT(e)}><img className='w-[50px] max-w-full min-w-0' src='src\assets\add.png' /></button>
            </form>
        </div>
    </div>

    <div className="mt-15 flex flex-wrap gap-5">
        {
            moodboard.map((value, index) => {
                return (
                    <div key={index}>
                        <Link to={value.link}>
                            <div className='h-50 w-50 flex flex-wrap rounded-xl'>
                                <div className='bg-red-100 h-25 w-25 rounded-tl-xl'><img className='h-25 w-25 rounded-tl-xl' src={value.thumbnails[0]} alt={value.books[0]} /></div>
                                <div className='bg-blue-100 h-25 w-25 rounded-tr-xl'><img className='h-25 w-25 rounded-tr-xl' src={value.thumbnails[1]} alt={value.books[1]} /></div>
                                <div className='bg-yellow-100 h-25 w-25 rounded-bl-xl'><img className='h-25 w-25 rounded-bl-xl' src={value.thumbnails[2]} alt={value.books[2]} /></div>
                                <div className='bg-green-100 h-25 w-25 rounded-br-xl'><img className='h-25 w-25 rounded-br-xl' src={value.thumbnails[3]} alt={value.books[3]} /></div>
                            </div>
                        </Link>
                        <div className='px-2 py-3 text-start font-bold text-xl text-neutral-900'>{value.name}</div>
                        <button onClick={(e) => deleteMoodBoard(e,value.link)}>Delete Moodboard</button>
                    </div>
                )
            })
        }
    </div>
</section> : <div className='flex flex-col items-center gap-5 my-10 mx-8 text-neutral-900'>
    <div>Sorry, we are unable to show you your profile! <span className='underline'>Login by pressing the login button on the top-left</span>.</div>
</div>}
</> */}
//----REPLACE THIS IN RETURN WHEN DOING AUTHENTICATION----
