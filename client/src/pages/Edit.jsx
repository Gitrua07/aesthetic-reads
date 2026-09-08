import { Link } from 'react-router-dom'

const Edit = () => {
    return (
        <div className='m-10'>
            <form className='flex flex-col gap-5 text-neutral-900'>
                <div className='text-3xl font-bold'>Edit Profile</div>
                <div className='flex flex-col gap-2'>
                    <label for='profile'>Change your profile picture: </label>
                    <input className='outline outline-solid p-2 w-60 rounded-2xl' type='file' accept='.jpg, .jpeg, .png' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label for='bio'>Edit your biography:</label>
                    <input className='shadow-lg py-5 px-2 rounded-xl' type='text' maxLength='100' />
                </div>
                <div>
                    <Link to='/profile'>
                        <input className='outline outline-solid p-2 rounded-2xl' type='submit' value='Submit' />
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Edit