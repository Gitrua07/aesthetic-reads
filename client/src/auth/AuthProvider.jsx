import { useState } from 'react'
import { AuthContext } from './AuthContext'
import placeholder from '../assets/book-placeholder.jpg'

export function AuthProvider(props) {
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [authId, setAuthId] = useState(null)
    const [bio, setBio] = useState("")
    const [profilePic, setProfilePic] = useState(placeholder)

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setLoggedIn,
        authId, 
        setAuthId,
        bio,
        setBio,
        profilePic, 
        setProfilePic
    }

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}