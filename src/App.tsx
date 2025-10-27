import { useState, useEffect } from 'react'
import { AddTodo } from './components/AddTodo'
import { TodoList } from './components/TodoList'
import { Box, Container, Text, VStack } from '@chakra-ui/react'

export interface Todo {
  id: number
  text: string
  createdAt: Date
  completed: boolean
}
export function App() {
  const [tasks, setTasks] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todo-tasks')
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: setId(),
            text: 'Демонстрация',
            createdAt: new Date(),
            completed: false,
          },
        ]
  })

  const [filterTasks, setFilterTasks] = useState<Todo[]>(tasks)

  const [valueFilter, setValueFilter] = useState<string>('all')

  useEffect(() => {
    filter(valueFilter)
  }, [tasks, valueFilter])

  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks))
  }, [tasks])

  function setId() {
    return Date.now() * 1000 + Math.random() * 1000
  }

  function addTask(newText: string) {
    if (newText.trim() !== '') {
      const newTodo = {
        id: setId(),
        text: newText,
        createdAt: new Date(),
        completed: false,
      }
      setTasks([newTodo, ...tasks])
    } else {
      alert('Поле ввода не может быть пустым!')
    }
  }

  function removeTask(todoId: number) {
    setTasks(tasks.filter(todo => todo.id !== todoId))
  }

  function toggleDoneTask(todoId: number) {
    const updatedTasks = tasks.map(todo => {
      if (todoId === todo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        }
      }
      return todo
    })
    setTasks(updatedTasks)
  }

  function editTask(todoId: number, editText: string) {
    const updatedTasks = tasks.map(todo => {
      if (todoId === todo.id) {
        return {
          ...todo,
          text: editText,
        }
      }
      return todo
    })
    setTasks(updatedTasks)
  }

  function newDateTasks() {
    const sortedTasks = [...tasks].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    setTasks(sortedTasks)
  }

  function oldDateTasks() {
    const sortedTasks = [...tasks].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    setTasks(sortedTasks)
    filter(valueFilter)
  }

  function doneTasks() {
    const sortedTasks = [...tasks].sort(
      (a, b) => Number(b.completed) - Number(a.completed)
    )
    setTasks(sortedTasks)
    filter(valueFilter)
  }

  function undoneTasks() {
    const sortedTasks = [...tasks].sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    )
    setTasks(sortedTasks)
    filter(valueFilter)
  }

  function filter(valueFilter: string) {
    switch (valueFilter) {
      case 'done': {
        setValueFilter('done')
        const doneTasks = tasks.filter(todo => todo.completed === true)
        setFilterTasks(doneTasks)
        break
      }
      case 'undone': {
        setValueFilter('undone')
        const undoneTasks = tasks.filter(todo => todo.completed === false)
        setFilterTasks(undoneTasks)
        break
      }
      case 'all':
        setValueFilter('all')
        setFilterTasks([...tasks])
        break
    }
  }

  return (
    <Box minH='100vh' bg='bg.canvas'>
      <Container maxW='container.sm' centerContent alignItems='center'>
        <VStack
          minW='80%'
          marginTop={8}
          gap={8}
          p={8}
          bg='bg.surface'
          borderRadius='lg'
          boxShadow='lg'
        >
          <Box p={8} width='100%' bg='bg.muted' borderRadius='lg'>
            <AddTodo
              addTask={addTask}
              handleSortDone={() => filter('done')}
              handleSortUndone={() => filter('undone')}
              handleSortAll={() => filter('all')}
              handleNewDateTasks={() => newDateTasks()}
              handleOldDateTasks={() => oldDateTasks()}
              handleDoneTasks={() => doneTasks()}
              handleUndoneTasks={() => undoneTasks()}
            />
          </Box>

          <Box p={8} width='100%' bg='bg.muted' borderRadius='lg'>
            {filterTasks.length !== 0 ? (
              <TodoList
                toggleDoneTask={toggleDoneTask}
                editTask={editTask}
                removeTask={removeTask}
                tasks={filterTasks}
              />
            ) : (
              <Text textStyle='2xl' justifyContent='center' textAlign='center'>
                Задач пока нет!
              </Text>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
