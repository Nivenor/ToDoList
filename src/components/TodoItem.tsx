import { EditTodo } from './EditTodo'
import { useState } from 'react'
import { VscEdit, VscPass, VscPassFilled, VscTrash } from 'react-icons/vsc'
import { GridItem, Box, Grid, IconButton, Text } from '@chakra-ui/react'
import type { Todo } from '../App'

interface TodoItemProps {
  editTask: (todoId: number, editText: string) => void
  removeTask: (todoId: number) => void
  toggleDoneTask: (todoId: number) => void
  todo: Todo
}

export function TodoItem({
  todo,
  editTask,
  removeTask,
  toggleDoneTask,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      {isEditing ? (
        <EditTodo
          baseText={todo.text}
          onSave={newText => {
            if (newText.trim() !== '') {
              editTask(todo.id, newText)
              setIsEditing(false)
            } else alert('Поле ввода не может быть пустым!')
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <Grid
          templateColumns='auto 1fr auto auto'
          gap={6}
          alignItems='center'
          padding='0.5rem 0'
        >
          <GridItem>
            <IconButton
              variant='ghost'
              onClick={() => toggleDoneTask(todo.id)}
              size='lg'
            >
              {todo.completed ? <VscPassFilled /> : <VscPass />}
            </IconButton>
          </GridItem>
          <GridItem>
            <Box>
              <Text
                color={!todo.completed ? 'text.primary' : 'text.todoCompleted'}
                justifyItems='center'
                minH='100%'
                textDecoration={todo.completed ? 'line-through' : 'none'}
              >
                {todo.text}
              </Text>
            </Box>
          </GridItem>
          <GridItem>
            <IconButton
              variant='ghost'
              onClick={() => setIsEditing(true)}
              size='lg'
            >
              <VscEdit />
            </IconButton>
          </GridItem>
          <GridItem display='flex' justifyContent='center'>
            <IconButton
              variant='ghost'
              size='lg'
              onClick={() => removeTask(todo.id)}
            >
              <VscTrash />
            </IconButton>
          </GridItem>
        </Grid>
      )}
    </>
  )
}
