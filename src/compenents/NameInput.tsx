import React, { useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  useToast,
  Flex
} from '@chakra-ui/react'

export default function NameInput ({
  setLogged
}: {
  setLogged: (logged: boolean) => void
}) {
  const [name, setName] = useState('')
  const toast = useToast()

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: 'يجب أدخال اسمك',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
      return
    }
    toast({
      title: `اسم المستخدم هو ${name}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top'
    })
    localStorage.setItem('name', name)
    localStorage.setItem('logged', 'true')
    setLogged(true)
  }

  return (
    <Center>
      <Box width='sm' p={6} boxShadow='md' borderRadius='md'>
        <FormControl id='name' dir='rtl'>
          <FormLabel dir='rtl'>أدخل اسمك</FormLabel>
          <Input
            dir='rtl'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='الاسم'
          />
          <Flex alignContent={'center'} justifyContent={'center'}>
            <Button
              mt={4}
              colorScheme='teal'
              onClick={handleSubmit}
              isDisabled={!name.trim()}
            >
              اضغط هنا لتسجيلك
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </Center>
  )
}
