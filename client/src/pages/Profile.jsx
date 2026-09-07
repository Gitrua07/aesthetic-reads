import placeholder from '../assets/book-placeholder.jpg'

const Profile = () => {
    return (
        <div className='flex flex-col gap-5 my-10 mx-8 text-neutral-900'>
            <div><img className='w-30 h-30 rounded-full' src={placeholder} alt='profile' /></div>
            <div className='font-bold text-3xl'>Username</div>
            <div className='font-semibold'>BIOGRAPHY:</div>
            <div className='shadow-lg py-5 px-5 rounded-xl'>Biography</div>
            <div>
                <form>
                    <button>Edit Profile</button>
                    <input/>
                </form>
            </div>
        </div>
    )
}

export default Profile
