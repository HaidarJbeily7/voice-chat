'use client'
import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  useToast,
  Container,
  Spinner
} from '@chakra-ui/react'
import SpeechToText from './SpeechToText'
import { m } from 'framer-motion'

const synth = window.speechSynthesis

const ChatRoom = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState('')
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState('')

  useEffect(() => {
    setName(localStorage.getItem('name') || '')
  }, [name])
  if (!synth)
    return <span>Aw... your browser does not support Speech Synthesis</span>

  const speak = (msg: string) => {
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(msg)
    utterance.voice = synth.getVoices()[2]
    utterance.lang = 'ar'
    synth.speak(utterance)
  }

  const askQuestion = async (message: string) => {
    try {
      setLoading(true)
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      })
      const { reply } = await res.json()
      setMessages([...messages, newMessage, reply])
      //   speak(reply)
    } catch (error) {
      toast({
        title: 'حدث خطأ أثناء المحاولة',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      setLoading(false)
    }
  }
  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      toast({
        title: 'لا يمكنك ارسال رسالة فارغة',
        status: 'warning',
        duration: 3000,
        isClosable: true
      })
      return
    }
    setMessages([...messages, newMessage])
    setLoading(true)
    setTimeout(() => {
      askQuestion(newMessage)
    }, 2000)
    setNewMessage('')
  }

  return (
    <Container maxW='container.md' p={4}>
      <HStack
        w='full'
        dir='rtl'
        justify='space-between'
        alignItems='center'
        marginBottom={'6'}
      >
        <Text fontSize='xl' fontWeight='bold'>
          أهلاً بك {name}
        </Text>
        <Button
          colorScheme={'red'}
          onClick={() => {
            localStorage.removeItem('logged')
            localStorage.removeItem('name')
            window.location.reload()
          }}
        >
          إنهاء الجلسة
        </Button>
      </HStack>
      <VStack spacing={4}>
        <Box
          w='full'
          h='400px'
          p={4}
          overflowY='auto'
          bg='gray.100'
          borderRadius='md'
        >
          {messages.map((message, index) => (
            <Text
              key={index}
              bg='white'
              color={'black'}
              p={2}
              borderRadius='md'
              m={1}
              dir='rtl'
            >
              {message}
            </Text>
          ))}
          {loading && (
            <Text bg='white' p={2} borderRadius='md' m={1}>
              <Spinner />
            </Text>
          )}
        </Box>
        <HStack w='full'>
          <Input
            dir='rtl'
            placeholder='اكتب رسالة...'
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <SpeechToText setNewMessage={setNewMessage} />
          <Button colorScheme='teal' onClick={handleSendMessage}>
            ارسل
          </Button>
        </HStack>
      </VStack>
    </Container>
  )
}

export default ChatRoom
