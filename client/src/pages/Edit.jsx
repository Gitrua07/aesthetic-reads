import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useState } from 'react'
import MoodBoardServices from '../services/Moodboard.js'
import girl from '../assets/girl.png'
import doctor from '../assets/doctor.png'
import man from '../assets/man.png'
import woman from '../assets/woman.png'


const Edit = () => {
    const { authId,
        setAuthId, setBio, bio, profilePic,
        setProfilePic } = useAuth()
    const [biography, setBiography] = useState(bio ?? "")
    const [profile, setProfile] = useState(profilePic)
    const navigate = useNavigate()

    const handleChange = (e) => {
        console.log(e.target.value)
        setBiography(e.target.value)
    }

    const handlePicChange = (e) => {
        const selectedPic = e.target.value
        setProfile(selectedPic)
        console.log(profile)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setBio(biography)
        setProfilePic(profile)
        await MoodBoardServices.edit(biography, profile, authId)
        navigate('/profile')
    }

    return (
        <div className='m-10'>
            <title>Edit Profile - Aesthetic Reads</title>
            <h1 className='text-3xl font-bold text-neutral-900'>Edit Profile</h1>
            <form className='flex flex-col gap-5 text-neutral-900' onSubmit={(e) => handleSubmit(e)}>
                <div className='flex flex-col gap-2'>
                    <label className='cursor-pointer'>
                        <input
                            type='radio'
                            name='profile'
                            value={girl}
                            onChange={handlePicChange}
                        />
                        <img src={girl} alt="" />
                    </label>
                    <label className='cursor-pointer'>
                        <input
                            type='radio'
                            name='profile'
                            value={woman}
                            onChange={handlePicChange}
                        />
                        <img src={woman} alt="" />
                    </label>
                    <label className='cursor-pointer'>
                        <input
                            type='radio'
                            name='profile'
                            value={doctor}
                            onChange={handlePicChange}
                        />
                        <img src={doctor} alt="" />
                    </label>
                    <label className='cursor-pointer'>
                        <input
                            type='radio'
                            name='profile'
                            value={man}
                            onChange={handlePicChange}
                        />
                        <img src={man} alt="" />
                    </label>
                </div>
                <div className='flex flex-col gap-2'>
                    <label for='bio'>Edit your biography:</label>
                    <input value={biography} onChange={handleChange} className='shadow-lg py-5 px-2 rounded-xl' type='text' maxLength='100' />
                </div>
                <button className='outline-1 outline-neutral-900 rounded-xl w-40 h-10 focus:outline-2 focus:outline-blue-500' type='submit'>Submit Changes</button>
            </form>
        </div>
    )
}

export default Edit