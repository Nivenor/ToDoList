'use client'

import { useState } from 'react'
import { VscAdd, VscFilter } from 'react-icons/vsc'
import {
  Alert,
  IconButton,
  Menu,
  Portal,
  Input,
  Box,
  Grid,
  GridItem,
  MenuItemGroup,
  NumberInput,
  Button,
} from '@chakra-ui/react'
import { ColorModeButton } from './ui/color-mode'
import { TbArrowsDownUp } from 'react-icons/tb'
import { LuBookOpen } from 'react-icons/lu'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { toaster } from './ui/toaster'
import {
  setFilter,
  setSortBy,
  createTodoThunk,
  setPage,
  setLimit,
} from '../store/todoSlice'

export function Header() {
  const [value, setValue] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [limitValue, setLimitValue] = useState('10') // состояние для NumberInput

  const dispatch = useAppDispatch()
  const { filter, sortBy } = useAppSelector(state => state.todos) // добавил filter и sortBy

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setIsButtonDisabled(false)
    setShowAlert(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  const handleAddTask = () => {
    if (value.trim() !== '') {
      dispatch(createTodoThunk(value.trim()))
      setValue('')
      setShowAlert(false)
    } else {
      setIsButtonDisabled(true)
      setShowAlert(true)
    }
  }

  const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
    dispatch(setFilter(newFilter))
  }

  const handleSortChange = (
    newSort: 'newest' | 'oldest' | 'active' | 'completed'
  ) => {
    dispatch(setSortBy(newSort))
  }

  const handleLimitChange = () => {
    const limitNumber = parseInt(limitValue)
    if (!isNaN(limitNumber) && limitNumber > 0 && limitNumber <= 20) {
      dispatch(setLimit(limitNumber))
      dispatch(setPage(1))
      toaster.create({
        title: 'Лимит изменен',
        description: `${limitNumber} задач на странице`,
        type: 'success',
      })
    } else {
      toaster.create({
        title: 'Ошибка',
        description: 'Введите число от 1 до 20',
        type: 'error',
      })
    }
  }

  const handleLimitInputChange = (value: string) => {
    setLimitValue(value)
  }

  return (
    <Box>
      <Grid
        templateColumns='auto 1fr auto auto auto auto'
        gap={6}
        alignItems='center'
        p={1}
      >
        <GridItem display='flex' justifyContent='center'>
          <IconButton
            onClick={handleAddTask}
            size='lg'
            variant='ghost'
            disabled={isButtonDisabled}
            aria-label='Добавить задачу'
          >
            <VscAdd />
          </IconButton>
        </GridItem>

        <GridItem>
          <Input
            size='lg'
            variant='flushed'
            type='text'
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={value}
            placeholder='Введите задачу...'
          />
        </GridItem>

        <GridItem display='flex' justifyContent='center'>
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton
                size='lg'
                variant='ghost'
                aria-label='Изменить количество задач на странице'
              >
                <LuBookOpen />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <MenuItemGroup>
                    <Menu.ItemGroupLabel>
                      Кол-во задач на странице:
                    </Menu.ItemGroupLabel>
                    <Box p={3}>
                      <NumberInput.Root 
                        value={limitValue} 
                        onValueChange={({ value }) => handleLimitInputChange(value)}
                        width='100%'
                        min={1}
                        max={20}
                      >
                        <NumberInput.Control />
                        <NumberInput.Input />
                      </NumberInput.Root>
                      <Button 
                        onClick={handleLimitChange}
                        marginTop={2}
                        width='100%'
                        variant='ghost'
                      >
                        Применить
                      </Button>
                    </Box>
                  </MenuItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </GridItem>

        <GridItem display='flex' justifyContent='center'>
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton
                size='lg'
                variant='ghost'
                aria-label='Фильтровать задачи'
              >
                <VscFilter />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <MenuItemGroup>
                    <Menu.ItemGroupLabel>Показать:</Menu.ItemGroupLabel>
                    <Menu.Item
                      cursor='pointer'
                      value='active'
                      onClick={() => handleFilterChange('active')}
                      backgroundColor={filter === 'active' ? 'bg.subtle' : 'transparent'}
                    >
                      Активные
                    </Menu.Item>
                    <Menu.Item
                      cursor='pointer'
                      value='completed'
                      onClick={() => handleFilterChange('completed')}
                      backgroundColor={filter === 'completed' ? 'bg.subtle' : 'transparent'}
                    >
                      Завершенные
                    </Menu.Item>
                    <Menu.Item
                      cursor='pointer'
                      value='all'
                      onClick={() => handleFilterChange('all')}
                      backgroundColor={filter === 'all' ? 'bg.subtle' : 'transparent'}
                    >
                      Все
                    </Menu.Item>
                  </MenuItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </GridItem>

        <GridItem display='flex' justifyContent='center'>
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton
                size='lg'
                variant='ghost'
                aria-label='Сортировать задачи'
              >
                <TbArrowsDownUp />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <MenuItemGroup>
                    <Menu.ItemGroupLabel>Сначала:</Menu.ItemGroupLabel>
                    <Menu.Item
                      value='newest'
                      onClick={() => handleSortChange('newest')}
                      cursor='pointer'
                      backgroundColor={sortBy === 'newest' ? 'bg.subtle' : 'transparent'}
                    >
                      Новые
                    </Menu.Item>
                    <Menu.Item
                      value='oldest'
                      onClick={() => handleSortChange('oldest')}
                      cursor='pointer'
                      backgroundColor={sortBy === 'oldest' ? 'bg.subtle' : 'transparent'}
                    >
                      Старые
                    </Menu.Item>
                    <Menu.Item
                      value='active'
                      onClick={() => handleSortChange('active')}
                      cursor='pointer'
                      backgroundColor={sortBy === 'active' ? 'bg.subtle' : 'transparent'}
                    >
                      Активные
                    </Menu.Item>
                    <Menu.Item
                      value='completed'
                      onClick={() => handleSortChange('completed')}
                      cursor='pointer'
                      backgroundColor={sortBy === 'completed' ? 'bg.subtle' : 'transparent'}
                    >
                      Завершенные
                    </Menu.Item>
                  </MenuItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </GridItem>

        <GridItem display='flex' justifyContent='center'>
          <ColorModeButton />
        </GridItem>
      </Grid>

      {showAlert && (
        <Alert.Root status='error' marginTop={8}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Поле не может быть пустым!</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      )}
    </Box>
  )
}