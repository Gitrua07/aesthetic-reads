import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useState } from 'react'
import UserServices from '../services/UserService.js'
import girl from '../assets/girl.png'
import doctor from '../assets/doctor.png'
import man from '../assets/man.png'
import woman from '../assets/woman.png'

const AVATARS = {girl, doctor, man, woman}


const Edit = () => {
    const { authId, setBio, bio, profilePic, setProfilePic } = useAuth()
    const [biography, setBiography] = useState(bio ?? "")
    const [profile, setProfile] = useState(profilePic)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setBiography(e.target.value)
    }

    const handlePicChange = (e) => {
        const selectedPic = e.target.value
        setProfile(selectedPic)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await UserServices.edit(biography, profile, authId)
        setBio(biography)
        setProfilePic(profile)
        navigate('/profile')
    }

    return (
        <div className='m-10'>
            <title>Edit Profile - Aesthetic Reads</title>
            <h1 className='text-3xl font-bold text-neutral-900'>Edit Profile</h1>
            <form className='flex flex-col gap-5 text-neutral-900' onSubmit={(e) => handleSubmit(e)}>
                <label>Choose Your Profile Picture</label>
                <div className='flex gap-2'>
                    {
                        Object.entries(AVATARS).map(([key, src]) => (
                            <label key={key} className='cursor-pointer'>
                                <input
                                  type='radio'
                                  name='profile'
                                  value={key}
                                  checked={profile === key}
                                  onChange={handlePicChange}
                                />
                                <img className='w-30' src={src} alt={`${key} avatar`}/>
                            </label>
                        ))
                    }
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