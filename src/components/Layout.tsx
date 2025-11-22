import { Link, Outlet } from 'react-router-dom'
import { ColorModeButton } from './ui/color-mode'
import { HStack, Button, Box } from '@chakra-ui/react'

export function Layout() {
  return (
    <>
      <HStack bg='bg.canvas' p={2} textAlign='center' justifyContent='center'>
        <Link to='/'>
          <Button variant='ghost'>Список задач</Button>
        </Link>
        <Link to='/profile'>
          <Button variant='ghost'>Профиль</Button>
        </Link>
        <ColorModeButton />
      </HStack>
      <Box flex='1'>
        <Outlet />
      </Box>
      <Box p={4} textAlign='center'>
        © 2025 NYD
      </Box>
    </>
  )
}
