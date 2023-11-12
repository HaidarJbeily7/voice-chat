'use client'
import Navbar from '@/compenents/Navbar'
import { Container, Flex, Box, AspectRatio } from '@chakra-ui/react'
import ChatRoom from '@/compenents/ChatRoom'
import { useEffect, useRef, useState } from 'react'
import NameInput from '@/compenents/NameInput'
import 'regenerator-runtime/runtime'

export default function Home () {
  const [logged, setLogged] = useState<boolean>(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    setLogged(localStorage.getItem('logged') !== null)
  }, [])

  return (
    <>
      <Navbar />
      <Container
        maxW='container.2xl'
        justifyContent={'center'}
        alignContent={'center'}
        height={'90vh'}
      >
        {logged ? (
          <Flex
            direction={['column', 'row']}
            justifyContent={'center'}
            alignContent={'center'}
            alignItems={'center'}
          >
            <Box flex={2}>
              {isSpeaking && (
                <AspectRatio ratio={16 / 11.5}>
                  <video className='VideoTag' autoPlay loop muted>
                    <source src='/with-1.mp4' type='video/mp4' />
                  </video>
                </AspectRatio>
              )}
              {!isSpeaking && (
                <AspectRatio ratio={16 / 11.5}>
                  <video className='VideoTag' autoPlay loop muted>
                    <source src='/without.mp4' type='video/mp4' />
                  </video>
                </AspectRatio>
              )}
            </Box>
            <Box flex={1}>
              <ChatRoom setIsSpeaking={setIsSpeaking} />
            </Box>
          </Flex>
        ) : (
          <NameInput setLogged={setLogged} />
        )}
      </Container>
    </>
  )
}
