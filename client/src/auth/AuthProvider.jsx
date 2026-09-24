import { useState } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider(props) {
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [authId, setAuthId] = useState(null)

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setLoggedIn,
        authId, 
        setAuthId
    }

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}