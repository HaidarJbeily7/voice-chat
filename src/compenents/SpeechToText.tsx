'use client'
import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition'
import { Icon } from '@chakra-ui/react'
import { LuMicOff, LuMic } from 'react-icons/lu'

const SpeechToText = ({
  setNewMessage
}: {
  setNewMessage: (message: string) => void
}) => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript
  } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'ar-SA'
    })
  }
  return (
    <>
      {!!!listening && (
        <Button onClick={handleStartListening} colorScheme='blue' size='md'>
          <Icon as={LuMic} />
        </Button>
      )}
      {!!listening && (
        <Button
          onClick={() => {
            setNewMessage(transcript)
            SpeechRecognition.stopListening()
            setTimeout(() => resetTranscript(), 800)
          }}
          colorScheme='red'
          size='md'
        >
          <Icon as={LuMicOff} />
        </Button>
      )}
    </>
  )
}
export default SpeechToText
