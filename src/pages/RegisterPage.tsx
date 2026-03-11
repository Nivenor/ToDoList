import { Box, Button, Field, HStack, Input, Text } from '@chakra-ui/react'
import { PasswordInput } from '../components/ui/password-input.tsx'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../hooks/redux.ts'
import { registerUser } from '../store/authSlice.ts'
import { Link } from 'react-router-dom'


interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  age: number
}

export function RegisterPage() {
  const { register, handleSubmit, formState, watch } = useForm<RegisterForm>({
    mode: 'onBlur',
  })

  const emailError = formState.errors['email']?.message as string
  const passwordError = formState.errors['password']?.message as string
  const confirmPasswordError = formState.errors['confirmPassword']
    ?.message as string

  const dispatch = useAppDispatch()

  function onSubmit(data: RegisterForm) {
    const { confirmPassword, ...loginData } = data
    dispatch(registerUser(loginData))
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
        <Text textAlign='center' marginBottom={6} fontSize={30}>
          Регистрация:
        </Text>

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
              <Field.HelperText color='tomato'>{emailError}</Field.HelperText>
            )}
          </Field.Root>

          <Field.Root marginBottom={2}>
            <Field.Label>Возраст</Field.Label>
            <Input
              type='number'
              variant='flushed'
              placeholder='Введите возраст'
              {...register('age', {
                setValueAs: value => (isNaN(value) ? null : Number(value)),
                min: {
                  value: 1,
                  message: 'Возраст должен быть больше 0',
                },
                max: {
                  value: 150,
                  message: 'Возраст должен быть меньше 150',
                },
              })}
            />
          </Field.Root>

          <Field.Root marginBottom={2}>
            <Field.Label>Пароль</Field.Label>
            <PasswordInput
              variant='flushed'
              placeholder='Введите пароль'
              {...register('password', {
                required: 'Это поле обязательно!',
                minLength: { value: 8, message: 'Не менее восьми символов' },
                maxLength: { value: 20, message: 'Не более двадцати символов' },
              })}
            />
            {passwordError && (
              <Field.HelperText color='tomato'>
                {passwordError}
              </Field.HelperText>
            )}
          </Field.Root>

          <Field.Root marginBottom={2}>
            <PasswordInput
              variant='flushed'
              placeholder='Подтвердите пароль'
              {...register('confirmPassword', {
                required: 'Это поле обязательно!',
                validate: value =>
                  value === watch('password') || 'Пароли должны совпадать!',
              })}
            />
            {confirmPasswordError && (
              <Field.HelperText color='tomato'>
                {confirmPasswordError}
              </Field.HelperText>
            )}
          </Field.Root>

          <HStack alignItems='center' justifyContent='center' p={2}>
            <Button size='xl' colorPalette='blue' variant='ghost' type='submit'>
              Отправить
            </Button>
            <Button size='xl' colorPalette='pink' variant='ghost' type='reset'>
              Сбросить
            </Button>
          </HStack>
        </form>
        <Box marginTop={2} textAlign='center' justifyContent='center'>
          <Text fontSize={20}>Есть аккаунт?</Text>
          <Link to='/login'>
            <Button marginTop={2} variant='ghost'>
              Войти
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
