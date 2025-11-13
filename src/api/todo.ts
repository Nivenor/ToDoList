import axios from 'axios'

export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: string
}

export interface TodosResponse {
  data: Todo[]
  total: number
  page: number
  limit: number
  totalPages: number
}

const API_URL = 'http://localhost:3001'

export const fetchTodos = async (
  page: number,
  limit: number
): Promise<TodosResponse> => {
  const response = await axios.get(
    `${API_URL}/todos?page=${page}&limit=${limit}`
  )
  return response.data
}

export const createTodo = async (text: string): Promise<Todo> => {
  const response = await axios.post(`${API_URL}/todos`, { text })
  return response.data
}

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_URL}/todos/${id}`)
}

export const updateTodo = async (
  id: number,
  updates: { text?: string; completed?: boolean }
): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/todos/${id}`, updates)
  return response.data
}

export const toggleTodo = async (id: number): Promise<Todo> => {
  const response = await axios.patch(`${API_URL}/todos/${id}/toggle`)
  return response.data
}
