import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { Box } from '@chakra-ui/react'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ProfilePage } from './pages/ProfilePage'
import { PasswordChangePage } from './pages/PasswordChangePage'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  return (
    <>
      <Box minH='100vh' display='flex' flexDirection='column' bg='bg.canvas'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/password-change'
              element={
                <ProtectedRoute>
                  <PasswordChangePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Box>
    </>
  )
}
