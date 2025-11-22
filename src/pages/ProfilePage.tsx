import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { logout, userProfile } from '../store/authSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function ProfilePage() {
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function handleOutClick() {
    dispatch(logout())
    navigate('/login')
  }

  function handlePasswordClick() {
    navigate('/password-change')
  }

  if (!user) {
    return (
      <Box
        bg='bg.canvas'
        display='flex'
        alignItems='center'
        justifyContent='center'
        minH='50vh'
        textAlign='center'
      >
        <Box p={10} shadow='lg' bg='bg.muted' borderRadius={10}>
          <Text margin={5} fontSize={30}>
            Вы в статусе гостя
          </Text>
          <Link to='/login'>
            <Button size='2xl' variant='ghost'>
              Войти
            </Button>
          </Link>
        </Box>
      </Box>
    )
  }
  useEffect(() => {
    dispatch(userProfile())
  }, [dispatch])
  const { email, age, createdAt } = user

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Box
      bg='bg.canvas'
      display='flex'
      alignItems='center'
      justifyContent='center'
      margin={10}
    >
      <VStack
        textAlign='center'
        padding='4rem 2rem 1rem 2rem'
        shadow='lg'
        bg='bg.muted'
        borderRadius={10}
      >
        <img
          src='/avatar.jpg'
          style={{
            maxHeight: '20vh',
            borderColor: 'bg.canvas',
            borderRadius: '6px',
          }}
        />
        <Box padding={3}>
          <Text fontSize={20}>Почта: {email}</Text>

          {age && <Text fontSize={20}>Возраст: {age}</Text>}
          {createdAt && (
            <Text fontSize={20}>Дата создания: {formatDate(createdAt)}</Text>
          )}
        </Box>
        <Button
          onClick={() => handlePasswordClick()}
          variant='ghost'
          colorPalette='blue'
          size='xl'
        >
          Сменить пароль
        </Button>
        <Button
          onClick={() => handleOutClick()}
          variant='ghost'
          colorPalette='pink'
          size='xl'
        >
          Выйти
        </Button>
      </VStack>
    </Box>
  )
}
