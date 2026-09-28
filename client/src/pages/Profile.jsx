import placeholder from '../assets/book-placeholder.jpg'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import UserServices from '../services/UserService.js'
import girl from '../assets/girl.png'
import doctor from '../assets/doctor.png'
import man from '../assets/man.png'
import woman from '../assets/woman.png'

const Profile = () => {
    const { authUser,
        setAuthUser,
        isLoggedIn,
        setLoggedIn,
        authId,
        setAuthId,
        bio,
        setBio,
        profilePic, 
        setProfilePic } = useAuth()
    
    const deleteUser = async(e) => {
        e.preventDefault()
        if(window.confirm("Do you want to delete your account?")){
            await UserServices.deleteUser(authId)
            setLoggedIn(false)
            setAuthId(null)
            setAuthUser(null)
            setBio(null)
            setProfilePic(null)
        }
    }

    let profileLink = man
    if(profilePic === 'girl'){
      profileLink = girl
    }else if(profilePic === 'doctor'){
      profileLink = doctor
    }else{
      profileLink = woman
    }

    return (
        <div>
            <title>Profile - Aesthetic Reads</title>
            <h1 className="pb-8 px-8 text-neutral-900">Profile</h1>
            {isLoggedIn ? <section className='flex flex-col gap-5 my-10 mx-8 text-neutral-900'>
                <div><img className='w-30 h-30 rounded-full' src={profileLink ?? placeholder} alt='profile' /></div>
                <h2 className='font-bold text-3xl'>{authUser}</h2>
                <h3>Biography:</h3>
                <div className='shadow-lg py-5 px-5 rounded-xl'>{bio}</div>
                <div>
                    <Link className='focus:outline-2 focus:outline-blue-500 rounded-2xl p-3 outline outline-solid outline-black w-28' to='/edit-profile'>
                        Edit Profile
                    </Link>
                </div>
                <div>
                    <button onClick={(e) => deleteUser(e)}>Delete User</button>
                </div>
            </section> :
                <div className='flex flex-col items-center gap-5 my-10 mx-8 text-neutral-900'>
                    <div>Sorry, we are unable to show you your profile! <Link className='underline' to='/login'>Click here to login</Link>.</div>
                </div>}
        </div>
    )
}

export default Profile
