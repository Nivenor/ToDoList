import { Box, Button, Text, VStack, HStack, Alert } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

export function TsdPage () {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log(navigator);
    
    const checkCameraSupport = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Ваш браузер не поддерживает доступ к камере')
        return
      }

      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const hasCamera = devices.some(device => device.kind === 'videoinput')
        if (!hasCamera) {
          setError('На вашем устройстве не найдена камера')
        }
      } catch (err) {
        console.log('Не удалось проверить наличие камер', err)
      }
    }

    checkCameraSupport()
  }, [])

  const startCamera = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Ваш браузер не поддерживает доступ к камере')
      }

      const constraints = {
        video: {
          facingMode: { ideal: 'environment' }, // Используем ideal вместо exact
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false 
      }

      console.log('Запрос камеры с constraints:', constraints)
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      
      console.log('Камера получена:', mediaStream)
      
      setStream(mediaStream)
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        
        // Важно: дожидаемся загрузки метаданных
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve
          }
        })
        
        // Пытаемся воспроизвести видео
        await videoRef.current.play()
      }
      
      setIsCameraOn(true)
    } catch (err: any) {
      console.error('Ошибка камеры:', err)
      
      // Обработка специфичных для мобильных устройств ошибок
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Доступ к камере запрещен. Разрешите доступ в настройках браузера')
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('Камера не найдена. Убедитесь, что камера подключена и работает')
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError('Камера уже используется другим приложением')
      } else if (err.name === 'OverconstrainedError') {
        try {
          console.log('Пробуем с минимальными настройками...')
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ 
            video: true,
            audio: false 
          })
          
          setStream(fallbackStream)
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream
          }
          setIsCameraOn(true)
          setError(null)
          return
        } catch (fallbackErr) {
          setError('Не удалось запустить камеру даже с базовыми настройками')
        }
      } else {
        setError(`Ошибка доступа к камере: ${err.message || 'неизвестная ошибка'}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop()
        track.enabled = false
      })
      setStream(null)
      setIsCameraOn(false)
      
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  const vibrate = () => {
    if (!navigator.vibrate) {
      alert('Ваш браузер не поддерживает вибрацию')
      return
    }
    
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
      minH='50vh'
      textAlign='center'
    >
      <Box p={10} shadow='lg' bg='bg.muted' borderRadius={10}>
        <VStack p={4}>
          {error && (
            <Alert.Root status="error" mb={4}>
              <Alert.Indicator />
              <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
          )}
          
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              maxWidth: '500px',
              borderRadius: '8px',
              display: isCameraOn ? 'block' : 'none',
              backgroundColor: '#f0f0f0'
            }}
          />
          
          {!isCameraOn && (
            <Box 
              width="100%" 
              maxW="500px" 
              height="280px" 
              bg="gray.100" 
              borderRadius="md"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={4}
            >
              {isLoading ? (
                <>
                  <Text color="blue.500">⏳ Подключение к камере...</Text>
                </>
              ) : (
                <>
                  <Text color="gray.500">Камера выключена</Text>
                  <Text fontSize="sm" color="gray.400">
                    Нажмите "Включить камеру" для начала сканирования
                  </Text>
                </>
              )}
            </Box>
          )}
          
          <HStack p={4}>
            {!isCameraOn ? (
              <Button 
                onClick={startCamera} 
                colorScheme="green"
                loadingText="Подключение..."
              >
                Включить камеру
              </Button>
            ) : (
              <Button onClick={stopCamera} colorScheme="red">
                Выключить камеру
              </Button>
            )}
            
            <Button onClick={vibrate} colorScheme="blue">
              Тест вибрации
            </Button>
          </HStack>

          {isCameraOn && (
            <Text fontSize="sm" color="green.500">
              ✅ Камера работает
            </Text>
          )}
        </VStack>
      </Box>
    </Box>
  )
}