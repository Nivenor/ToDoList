import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from './components/theme.ts'
import { ColorModeProvider } from './components/ui/color-mode.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorModeProvider>
      <ChakraProvider value={theme}>
        <App />
      </ChakraProvider>
    </ColorModeProvider>
  </StrictMode>,
)
