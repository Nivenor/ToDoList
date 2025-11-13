import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux'

import type { RootState, AppDispatch } from '../store'
import { createSelector } from '@reduxjs/toolkit'

const selectTodos = (state: RootState) => state.todos

export const selectFilteredAndSortedTodos = createSelector(
  [selectTodos],
  todos => {
    const { items, filter, sortBy } = todos

    let filteredTodos = items
    if (filter === 'active') {
      filteredTodos = items.filter(todo => !todo.completed)
    } else if (filter === 'completed') {
      filteredTodos = items.filter(todo => todo.completed)
    }

    const sortedTodos = [...filteredTodos]

    switch (sortBy) {
      case 'newest':
        sortedTodos.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      case 'oldest':
        sortedTodos.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        break
      case 'active':
        sortedTodos.sort((a, b) => Number(a.completed) - Number(b.completed))
        break
      case 'completed':
        sortedTodos.sort((a, b) => Number(b.completed) - Number(a.completed))
        break
      default:
        break
    }

    return sortedTodos
  }
)

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
