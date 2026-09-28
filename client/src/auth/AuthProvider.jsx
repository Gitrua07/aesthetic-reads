import { useState } from 'react'
import { AuthContext } from './AuthContext'
import placeholder from '../assets/book-placeholder.jpg'
import { useEffect } from 'react'
import MoodboardServices from '../services/MoodboardService.js'

export function AuthProvider(props) {
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [authId, setAuthId] = useState(null)
    const [bio, setBio] = useState("")
    const [profilePic, setProfilePic] = useState(placeholder)
    const [authStatus, setAuthStatus] = useState('loading')

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
        setProfilePic,
        authStatus,
        setAuthStatus
    }

    useEffect(() => {
        MoodboardServices.getMe()
            .then((me) => {
                setAuthUser(me.username)
                setAuthId(me.id)
                setBio(me.biography)
                setProfilePic(me.avatar ?? placeholder)
                setLoggedIn(true)
                setAuthStatus('authenticated')
            })
            .catch(() => setAuthStatus('anonymous'))
    }, [])

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}