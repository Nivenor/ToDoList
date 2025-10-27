import { useState } from 'react'
import { Button, ButtonGroup, Box, Input } from '@chakra-ui/react'

interface EditTodoProps {
  baseText: string
  onCancel: () => void
  onSave: (newText: string) => void
}

export function EditTodo({ baseText, onCancel, onSave }: EditTodoProps) {
  const [value, setValue] = useState<string>(baseText)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setValue(value)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      onSave(value)
    }
  }

  return (
    <section>
      <Input
        marginRight='1rem'
        type='text'
        placeholder='Введите задачу...'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        autoFocus
        size='md'
      />
      <Box textAlign='right' margin='1rem 0'>
        <ButtonGroup textAlign='right' size='sm' variant='subtle'>
          <Button onClick={() => onSave(value)} colorPalette='green'>
            Сохранить
          </Button>
          <Button onClick={onCancel} colorPalette='red'>
            Закрыть
          </Button>
        </ButtonGroup>
      </Box>
    </section>
  )
}
