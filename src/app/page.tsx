'use client'
import Navbar from '@/compenents/Navbar'
import { Container } from '@chakra-ui/react'
import ChatRoom from '@/compenents/ChatRoom'
import { useEffect, useState } from 'react'
import NameInput from '@/compenents/NameInput'

export default function Home () {
  const [logged, setLogged] = useState<boolean>(false)

  useEffect(() => {
    setLogged(localStorage.getItem('logged') !== null)
  })

  return (
    <>
      <Navbar />
      <Container marginTop={24}>
        {logged ? <ChatRoom /> : <NameInput setLogged={setLogged} />}
      </Container>
    </>
  )
}
