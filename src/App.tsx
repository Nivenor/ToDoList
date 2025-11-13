import { useEffect } from 'react'
import { Header } from './components/Header'
import { TodoList } from './components/TodoList'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { setPage, fetchTodosThunk } from './store/todoSlice'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import {
  Box,
  Container,
  Text,
  VStack,
  ButtonGroup,
  IconButton,
  Pagination,
  Spinner,
} from '@chakra-ui/react'
import { Toaster } from './components/ui/toaster'

export function App() {
  const dispatch = useAppDispatch()
  const {
    items: tasks,
    loading,
    error,
    pagination,
  } = useAppSelector(state => state.todos)

  useEffect(() => {
    dispatch(
      fetchTodosThunk({
        page: pagination.page,
        limit: pagination.limit,
      })
    )
  }, [dispatch, pagination.page, pagination.limit])

  function handlePageChange(newPage: number) {
    dispatch(setPage(newPage))
  }

  return (
    <Box minH='100vh' bg='bg.canvas'>
      <Container maxW='container.sm' centerContent alignItems='center'>
        <VStack
          minW='80%'
          marginTop={4}
          gap={8}
          p={8}
          bg='bg.surface'
          borderRadius='lg'
          boxShadow='lg'
        >
          {loading && <Spinner />}
          {error && <Text color='red.500'>Ошибка: {error}</Text>}

          <Box p={8} width='100%' bg='bg.muted' borderRadius='lg'>
            <Header />
          </Box>

          <Box p={8} width='100%' bg='bg.muted' borderRadius='lg'>
            {tasks.length !== 0 ? (
              <TodoList />
            ) : (
              <Text textStyle='2xl' justifyContent='center' textAlign='center'>
                {loading ? <Spinner size='lg' /> : 'Задач пока нет!'}
              </Text>
            )}
          </Box>
          <Toaster/>
          {pagination.totalPages > 0 && (
            <Pagination.Root
              count={pagination.totalPages}
              pageSize={1}
              page={pagination.page}
              onPageChange={e => handlePageChange(e.page)}
            >
              <ButtonGroup variant='ghost' size='sm'>
                <Pagination.PrevTrigger asChild>
                  <IconButton>
                    <LuChevronLeft />
                  </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                  render={page => (
                    <IconButton
                      variant={{ base: 'ghost', _selected: 'surface' }}
                    >
                      {page.value}
                    </IconButton>
                  )}
                />

                <Pagination.NextTrigger asChild>
                  <IconButton>
                    <LuChevronRight />
                  </IconButton>
                </Pagination.NextTrigger>
              </ButtonGroup>
            </Pagination.Root>
          )}
        </VStack>
      </Container>
    </Box>
  )
}
