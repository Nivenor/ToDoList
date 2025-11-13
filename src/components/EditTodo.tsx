import { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Box,
  Input,
  Grid,
  GridItem,
  Alert,
} from '@chakra-ui/react'

type EditTodoProps = {
  baseText: string
  onCancel: () => void
  onSave: (newText: string) => void
}

export function EditTodo({ baseText, onCancel, onSave }: EditTodoProps) {
  const [value, setValue] = useState(baseText)
  const [error, setError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    setError(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    }
  }

  const handleSave = () => {
    if (value.trim() !== '') {
      onSave(value.trim())
    } else {
      setError(true)
    }
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <Box>
      <Input
        marginRight='1rem'
        type='text'
        placeholder='Введите задачу...'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        autoFocus
        size='md'
        variant='flushed'
      />

      <Box textAlign='left' margin='1rem 0'>
        <Grid templateColumns='1fr auto' gap={2} alignItems='center'>
          <GridItem display='flex' justifyContent='center'>
            {error && (
              <Alert.Root size='sm' status='error'>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Поле не может быть пустым!</Alert.Title>
                </Alert.Content>
              </Alert.Root>
            )}
          </GridItem>

          <GridItem display='flex' justifyContent='center'>
            <ButtonGroup size='md' variant='subtle'>
              <Button
                disabled={error}
                onClick={handleSave}
                colorPalette='green'
              >
                Сохранить
              </Button>
              <Button onClick={handleCancel} colorPalette='red'>
                Закрыть
              </Button>
            </ButtonGroup>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}
