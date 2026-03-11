import { Box, Button, Field, HStack, Input, Text } from '@chakra-ui/react'
import { PasswordInput } from '../components/ui/password-input.tsx'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { loginUser } from '../store/authSlice.ts'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

interface LoginForm {
  email: string
  password: string
}

export function LoginPage() {
  const { register, handleSubmit, formState } = useForm<LoginForm>({
    mode: 'onBlur',
  })
  const user = useAppSelector(state => state.auth.user)
  const navigate = useNavigate()
  const { status, error } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const emailError = formState.errors['email']?.message as string
  const passwordError = formState.errors['password']?.message as string

  function onSubmit(data: LoginForm) {
    dispatch(loginUser(data))
  }

  useEffect(() => {
    if (status === 'idle' && user) {
      navigate('/profile')
    }
  }, [user])

  const vibrate = () => {
    if (Math.random() < 0.5) {
      navigator.vibrate(300)
    } else {
      navigator.vibrate(800)
    }
    
  }

  return (
    <Box
      bg='bg.canvas'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        padding='2rem 2rem 1rem 2rem'
        shadow='lg'
        bg='bg.muted'
        borderRadius={10}
        marginTop={10}
      >
        <Text textAlign='center' marginBottom={2} fontSize={30}>
          Войти:
        </Text>

        {error && (
          <Text color='pink' textAlign='center'>
            {error}
          </Text>
        )}

        {status === 'loading' && (
          <Text textAlign='center' color='blue.500' mb={4}>
            Входим...
          </Text>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Field.Root marginBottom={2}>
            <Field.Label>Email</Field.Label>
            <Input
              variant='flushed'
              placeholder='Введите email'
              {...register('email', {
                required: 'Это поле обязательно!',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Некорректный email',
                },
              })}
            />
            {emailError && (
              <Field.HelperText color='pink'>{emailError}</Field.HelperText>
            )}
          </Field.Root>
          <Field.Root marginBottom={2}>
            <Field.Label>Пароль</Field.Label>
            <PasswordInput
              variant='flushed'
              placeholder='Введите пароль'
              {...register('password', { required: 'Это поле обязательно!' })}
            />
            {passwordError && (
              <Field.HelperText color='tomato'>
                {passwordError}
              </Field.HelperText>
            )}
          </Field.Root>
          <HStack alignItems='center' justifyContent='center' p={2}>
            <Button size='xl' colorPalette='blue' variant='ghost' type='submit' onClick={vibrate}>
              Отправить
            </Button>
            <Button size='xl' colorPalette='pink' variant='ghost' type='reset'>
              Сбросить
            </Button>
          </HStack>
        </form>
        <Box textAlign='center' justifyContent='center'>
          <Text marginBottom={2} fontSize={14}>
            Еще нет аккаунта? Зарегистрируйтесь!
          </Text>
          <Link to='/register'>
            <Button variant='ghost'>Регистрация</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
