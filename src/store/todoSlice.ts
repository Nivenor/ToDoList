import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  type Todo,
} from '../api/todo'

export const fetchTodosThunk = createAsyncThunk(
  'todo/fetchTodos',
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await fetchTodos(page, limit)
    return response
  }
)

export const createTodoThunk = createAsyncThunk(
  'todos/createTodo',
  async (text: string) => {
    const response = await createTodo(text)
    return response
  }
)

export const toggleTodoThunk = createAsyncThunk(
  'todos/toggleTodo',
  async (id: number) => {
    const response = await toggleTodo(id)
    return response
  }
)

export const deleteTodoThunk = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    await deleteTodo(id)
    return id
  }
)

export const updateTodoThunk = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, text }: { id: number; text: string }) => {
    const response = await updateTodo(id, { text })
    return response
  }
)

interface TodosState {
  items: Todo[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filter: 'active' | 'completed' | 'all'
  sortBy: 'newest' | 'oldest' | 'active' | 'completed'
}

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  },
  filter: 'all',
  sortBy: 'newest',
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.page = action.payload
    },
    setLimit: (state, action) => {
      state.pagination.limit = action.payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload
      state.pagination.page = 1
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodosThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
        }
      })
      .addCase(fetchTodosThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка загрузки задач'
      })

      .addCase(createTodoThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })

      .addCase(toggleTodoThunk.fulfilled, (state, action) => {
        const todo = state.items.find(t => t.id === action.payload.id)
        if (todo) {
          todo.completed = action.payload.completed
        }
      })

      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload)
      })

      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        const todo = state.items.find(t => t.id === action.payload.id)
        if (todo) {
          todo.text = action.payload.text
        }
      })
  },
})

export const { setPage, setLimit, setFilter, setSortBy } = todosSlice.actions
export default todosSlice.reducer
