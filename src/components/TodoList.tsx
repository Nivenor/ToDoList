import { TodoItem } from './TodoItem'
import { selectFilteredAndSortedTodos, useAppSelector } from '../hooks/redux'

export function TodoList() {
  const tasks = useAppSelector(selectFilteredAndSortedTodos)
  return tasks.map(todo => <TodoItem key={todo.id} todoId={todo.id} />)
}
