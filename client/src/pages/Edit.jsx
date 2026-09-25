import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useState } from 'react'

const Edit = () => {
    const {setBio, bio, profilePic, 
        setProfilePic } = useAuth()
    const [biography, setBiography] = useState(bio ?? "")
    const [profile, setProfile] = useState(profilePic)
    const navigate = useNavigate() 

    const handleChange = (e) => {
        console.log(e.target.value)
        setBiography(e.target.value)
    }

    const handlePicChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        console.log(file)
        setProfile(URL.createObjectURL(file))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setBio(biography)
        setProfilePic(profile)
        navigate('/profile')
    }

    return (
        <div className='m-10'>
            <title>Edit Profile - Aesthetic Reads</title>
            <h1 className='text-3xl font-bold text-neutral-900'>Edit Profile</h1>
            <form className='flex flex-col gap-5 text-neutral-900' onSubmit={(e) => handleSubmit(e)}>
                <div className='flex flex-col gap-2'>
                    <label for='profile'>Change your profile picture: </label>
                    <input onChange={handlePicChange} className='outline outline-solid p-2 w-60 rounded-2xl' type='file' accept='.jpg, .jpeg, .png' />
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