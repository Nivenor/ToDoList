import TodoItem from "./TodoItem"
import type {Todo} from "../App"


interface TodoListProps{
    editTask:(todoId: number, editText: string)=> void
    removeTask: (todoId: number)=> void
    toggleDoneTask: (todoId: number)=> void
    tasks: Todo[] 
}

export default function TodoList({tasks, editTask, removeTask, toggleDoneTask}: TodoListProps) {

    return(
        tasks.map(todo=>(
        <TodoItem 
            key={todo.id}
            todo={todo} 
            editTask={editTask} 
            removeTask={removeTask} 
            toggleDoneTask={toggleDoneTask}
        />))
    )
}