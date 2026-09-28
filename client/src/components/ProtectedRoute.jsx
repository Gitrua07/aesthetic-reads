import { useAuth } from "../auth/AuthContext"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
    const { authStatus } = useAuth()
    if (authStatus === 'loading') return null
    if (authStatus === 'anonymous') return <Navigate to="/login" replace />
    return children
  }