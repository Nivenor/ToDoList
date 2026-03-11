
import type { ComponentType } from 'react'
import { lazy,  } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'

const lazyNamed = <T extends ComponentType<any>>(
  importFn: () => Promise<Record<string, T>>,
  componentName: string
) => {
  return lazy(() =>
    importFn().then(module => ({
      default: module[componentName] as T
    }))
  );
};

const HomePage = lazyNamed(() => import('./pages/HomePage'), 'HomePage')
const LoginPage = lazyNamed(() => import('./pages/LoginPage'), 'LoginPage')
const RegisterPage = lazyNamed(() => import('./pages/RegisterPage'), 'RegisterPage')
const ProfilePage = lazyNamed(() => import('./pages/ProfilePage'), 'ProfilePage')
const PasswordChangePage = lazyNamed(() => import('./pages/PasswordChangePage'), 'PasswordChangePage')
const NotFoundPage = lazyNamed(() => import('./pages/NotFoundPage'), 'NotFoundPage')

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
