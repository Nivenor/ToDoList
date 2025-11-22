import { Box, Button, Field, HStack, Text } from '@chakra-ui/react'
import { PasswordInput } from '../components/ui/password-input.tsx'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { changePassword } from '../store/authSlice.ts'
import { Link, useNavigate } from 'react-router-dom'

interface PasswordCgange {
  oldPassword: string
  confirmPassword: string
  newPassword: string
}

export function PasswordChangePage() {
  const { register, handleSubmit, formState, watch } = useForm<PasswordCgange>({
    mode: 'onBlur',
  })

  const dispatch = useAppDispatch()
  const oldPasswordError = formState.errors['oldPassword']?.message as string
  const confirmPasswordError = formState.errors['confirmPassword']
    ?.message as string
  const newPasswordError = formState.errors['newPassword']?.message as string
  const navigate = useNavigate()
  const { token, user, error, status } = useAppSelector(state => state.auth)

  if (!token || !user) {
    return (
      <Box
        bg='bg.canvas'
        display='flex'
        alignItems='center'
        justifyContent='center'
        minH='90vh'
      >
        <Box textAlign='center'>
          <Text fontSize='30px' marginBottom='20px'>
            Для смены пароля нужно войти в систему
          </Text>
          <Link to='/login'>
            <Button variant='ghost'>Войти</Button>
          </Link>
        </Box>
      </Box>
    )
  }

  async function onSubmit(data: PasswordCgange) {
    const { confirmPassword, ...passwordData } = data
    try {
      await dispatch(changePassword(passwordData)).unwrap()
      navigate('/profile')
    } catch (error) {}
  }

  return (
    <Box
      bg='bg.canvas'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        marginTop={10}
        padding='2rem 2rem 1rem 2rem'
        shadow='lg'
        bg='bg.muted'
        borderRadius={10}
      >
        <Text textAlign='center' marginBottom={4} fontSize={30}>
          Смена пароля:
        </Text>

        {error && (
          <Text marginBottom={4} color='pink' textAlign='center'>
            {error}
          </Text>
        )}

        {status === 'loading' && (
          <Text textAlign='center' color='blue.500' mb={4}>
            Меняем пароль...
          </Text>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Field.Root marginBottom={2}>
            <Field.Label>Введите пароль</Field.Label>
            <PasswordInput
              variant='flushed'
              placeholder='Введите пароль'
              {...register('oldPassword', {
                required: 'Это поле обязательно!',
              })}
            />
            {oldPasswordError && (
              <Field.HelperText color='tomato'>
                {oldPasswordError}
              </Field.HelperText>
            )}
          </Field.Root>

          <Field.Root marginBottom={2}>
            <Field.Label>Придумайте новый пароль</Field.Label>
            <PasswordInput
              variant='flushed'
              placeholder='Введите пароль'
              {...register('newPassword', {
                required: 'Это поле обязательно!',
              })}
            />
            {newPasswordError && (
              <Field.HelperText color='tomato'>
                {newPasswordError}
              </Field.HelperText>
            )}
          </Field.Root>

          <Field.Root marginBottom={2}>
            <Field.Label>Подтвердите новый пароль</Field.Label>
            <PasswordInput
              variant='flushed'
              placeholder='Введите пароль'
              {...register('confirmPassword', {
                required: 'Это поле обязательно!',
                validate: value =>
                  value === watch('newPassword') || 'Пароли должны совпадать!',
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
            <Button size='xl' colorPalette='red' variant='ghost' type='reset'>
              Сбросить
            </Button>
          </HStack>
        </form>
      </Box>
    </Box>
  )
}
