import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './components/theme.ts'
import { ColorModeProvider } from './components/ui/color-mode.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ColorModeProvider>
        <ChakraProvider value={theme}>
          <App />
        </ChakraProvider>
      </ColorModeProvider>
    </Provider>
  </StrictMode>
)
