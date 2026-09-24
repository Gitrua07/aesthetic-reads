import { useState } from "react"
import MoodBoardServices from '../services/Moodboard.js'
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext.jsx"

export default function Register(){
    /**
     * Register:
     * This page contains the register page. 
     * The user will be able to create a new account here.
     * 
     * This page will not have a component and be implemented
     * on this page.
     */
    const [userInfo, setUserInfo] = useState({username: "",  email: "", password: ""})
    const {authUser,
        setAuthUser,
        isLoggedIn,
        setLoggedIn,
        authId, 
        setAuthId } = useAuth()
    const navigate = useNavigate()
    const handleChange = (e) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
    }

    const createUser = async(e) => {
        e.preventDefault()
        const data = await MoodBoardServices.createUser(userInfo)
        console.log(data)
        setAuthUser(userInfo.username)
        setLoggedIn(true)
        setAuthId(data.id)
        navigate(`/profile`)
    }

    return(
        <section className="flex flex-col gap-6 justify-center justify-items-center text-center m-10 text-neutral-900">
            <title>Registration - Aesthetic Reads</title>
            <h1>Register</h1>
            <form action='/user-info' onSubmit={(e) => createUser(e)}>
                <div>
                    <label for='username'>Username: </label>
                    <input value={userInfo.username} onChange={handleChange} className="px-1 border ml-4 my-4 rounded-md" type='text' name='username' id="username" required/>
                </div>
                <div>
                    <label for='email'>Email: </label>
                    <input value={userInfo.email} onChange={handleChange} className="px-1 border ml-12 my-4 rounded-md" type='email' name='email' id='email' required />
                </div>
                <div>
                    <label for='password'>Password: </label>
                    <input value={userInfo.password} onChange={handleChange} className="px-1 border ml-5 my-4 mb-6 rounded-md" type='password' name='password' id='password' required />
                </div>
                <button type='submit' className="font-medium border px-2 py-1 rounded-xl">Submit</button>
            </form>
        </section>
    )
}