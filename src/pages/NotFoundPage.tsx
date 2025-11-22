// pages/NotFoundPage.tsx
import { Heading, Text, VStack, Container } from '@chakra-ui/react'

export function NotFoundPage() {
  return (
    <Container
      maxW='container.md'
      centerContent
      flex='1'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <VStack textAlign='center' py={10}>
        <Heading as='h1' size='2xl' color='gray.700'>
          404
        </Heading>

        <Heading as='h2' size='lg' color='gray.600'>
          Страница не найдена
        </Heading>

        <Text fontSize='lg' color='gray.500' maxW='md'>
          К сожалению, запрашиваемая страница не существует. Возможно, она была
          перемещена или вы ввели неправильный адрес.
        </Text>
      </VStack>
    </Container>
  )
}
