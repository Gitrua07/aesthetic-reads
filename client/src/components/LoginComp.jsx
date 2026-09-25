import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import MoodBoardServices from '../services/Moodboard.js' 

export default function LoginComp() {
    /**
     * This component returns the UI
     * of the login page.
     */

    const [loginInfo, setLoginInfo] = useState({username: "", password: ""})
    const { authUser,
        setAuthUser,
        isLoggedIn,
        setLoggedIn,
        authId,
        setAuthId,
        bio,
        setBio } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await MoodBoardServices.login(loginInfo)
        if (response.isVerified){
            setAuthUser(loginInfo.username)
            setLoggedIn(true)
            setAuthId(response.id)
            setBio(response.bio)
            navigate('/profile')
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
    }
    

    return (
        <div className="flex flex-col gap-6 text-neutral-900">
            <h1>Login</h1>
            <form action='/user-info' onSubmit={e=> handleSubmit(e)}>
                <div>
                    <label for='username'>Username: </label>
                    <input value={loginInfo.username} onChange={handleChange} className='border px-1 ml-2 rounded-md' type='text' name='username' id='username' required />
                </div>
                <div>
                    <label for='password'>Password:</label>
                    <input value={loginInfo.password} onChange={handleChange} className='px-1 border ml-4 my-4 rounded-md' type='text' name='password' id='password' require />
                </div>
                <button type='submit' className="font-medium border px-2 py-1 rounded-xl">Submit</button>
            </form>
            <div>
                <div>No account?</div>
                <Link to='/register'>
                    <div className='font-medium underline text-blue-900'>Register</div>
                </Link>
            </div>
        </div>
    )
}