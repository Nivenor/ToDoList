import { useAppSelector } from '../hooks/redux'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector(state => state.auth)
  if (!user) {
    return <Navigate to='/login' replace />
  }
  return children
}
