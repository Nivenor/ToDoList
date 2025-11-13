import { EditTodo } from './EditTodo'
import { useState } from 'react'
import { VscEdit, VscPass, VscPassFilled, VscTrash } from 'react-icons/vsc'
import { GridItem, Box, Grid, IconButton, Text } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  toggleTodoThunk,
  updateTodoThunk,
  deleteTodoThunk,
} from '../store/todoSlice'

export function TodoItem({ todoId }: { todoId: number }) {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useAppDispatch()
  const todo = useAppSelector(state =>
    state.todos.items.find(t => t.id === todoId)
  )

  if (!todo) return null

  function handleEdit(newText: string) {
    dispatch(updateTodoThunk({ id: todoId, text: newText }))
    setIsEditing(false)
  }

  function handleToggle() {
    dispatch(toggleTodoThunk(todoId))
  }

  function handleDelete() {
    dispatch(deleteTodoThunk(todoId))
  }

  return (
    <>
      {isEditing ? (
        <EditTodo
          baseText={todo.text}
          onSave={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <Grid
          _hover={{
            borderColor: 'bg.active',
            borderRadius: '0rem',
          }}
          templateColumns='auto 1fr auto auto'
          gap={6}
          alignItems='center'
          p={1}
          borderBottom='0.01rem solid'
          borderColor='bg.border'
          borderRadius={15}
          marginTop={1}
          transition='0.2s ease-out'
        >
          <GridItem>
            <IconButton
              variant='ghost'
              onClick={handleToggle}
              size='lg'
              aria-label={
                todo.completed
                  ? 'Отметить невыполненным'
                  : 'Отметить выполненным'
              }
            >
              {todo.completed ? <VscPassFilled color='grey' /> : <VscPass />}
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
              aria-label='Редактировать задачу'
            >
              <VscEdit />
            </IconButton>
          </GridItem>

          <GridItem display='flex' justifyContent='center'>
            <IconButton
              variant='ghost'
              size='lg'
              onClick={handleDelete}
              aria-label='Удалить задачу'
            >
              <VscTrash />
            </IconButton>
          </GridItem>
        </Grid>
      )}
    </>
  )
}
