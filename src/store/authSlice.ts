import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface AuthState {
  user: null | { id: number; email: string; age?: number; createdAt: string }
  token: null | string
  refreshToken: null | string
  status: 'idle' | 'loading' | 'failed'
  error: null | string
}
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  status: 'idle',
  error: null,
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    if (!response.ok) {
      throw new Error('Войти не удалось!')
    }
    return await response.json()
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string; age?: number }) => {
    const response = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    if (!response.ok) {
      throw new Error('Регистрация не удалась!')
    }
    return await response.json()
  }
)

export const userProfile = createAsyncThunk(
  'auth/me',
  async (_, { getState }) => {
    const { auth } = getState() as { auth: AuthState }
    const response = await fetch('http://localhost:3001/auth/me', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные пользователя!')
    }
    return await response.json()
  }
)

export const changePassword = createAsyncThunk(
  'auth/change-password',
  async (
    credentials: { oldPassword: string; newPassword: string },
    { getState }
  ) => {
    const { auth } = getState() as { auth: AuthState }

    const response = await fetch('http://localhost:3001/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Ошибка смены пароля!')
    }

    return data
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null
      state.token = null
      state.refreshToken = null
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    },
  },
  extraReducers: builder => {
    builder

      .addCase(loginUser.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          age: action.payload.age,
          createdAt: action.payload.createdAt,
        }
        state.token = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.status = 'idle'
        state.error = null
        localStorage.setItem('token', action.payload.accessToken)
        localStorage.setItem('refreshToken', action.payload.refreshToken)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка логина!'
        state.status = 'failed'
      })

      .addCase(registerUser.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          age: action.payload.age,
          createdAt: action.payload.createdAt,
        }
        state.token = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.status = 'idle'
        state.error = null
        localStorage.setItem('token', action.payload.accessToken)
        localStorage.setItem('refreshToken', action.payload.refreshToken)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка регистрация!'
        state.status = 'failed'
      })

      .addCase(userProfile.fulfilled, (state, action) => {
        state.user = action.payload
      })

      .addCase(changePassword.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(changePassword.fulfilled, state => {
        state.status = 'idle'
        state.error = null
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Ошибка логина!'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
