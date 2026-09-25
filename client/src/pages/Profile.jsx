import placeholder from '../assets/book-placeholder.jpg'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

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

    return (
        <div>
            <title>Profile - Aesthetic Reads</title>
            <h1 className="pb-8 px-8 text-neutral-900">Profile</h1>
            {isLoggedIn ? <section className='flex flex-col gap-5 my-10 mx-8 text-neutral-900'>
                <div><img className='w-30 h-30 rounded-full' src={profilePic} alt='profile' /></div>
                <h2 className='font-bold text-3xl'>{authUser}</h2>
                <div>UserId: #{authId}</div>
                <h3>Biography:</h3>
                <div className='shadow-lg py-5 px-5 rounded-xl'>{bio}</div>
                <div>
                    <Link className='focus:outline-2 focus:outline-blue-500 rounded-2xl p-3 outline outline-solid outline-black w-28' to='/edit-profile'>
                        Edit Profile
                    </Link>
                </div>
            </section> :
                <div className='flex flex-col items-center gap-5 my-10 mx-8 text-neutral-900'>
                    <div>Sorry, we are unable to show you your profile! <span className='underline'>Login by pressing the login button on the top-left</span>.</div>
                </div>}
        </div>
    )
}

export default Profile
