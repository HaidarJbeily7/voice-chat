// app/providers.tsx
'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { RtlProvider } from './rtl-provider'

export function Providers ({ children }: { children: React.ReactNode }) {
  const direction = 'rtl'
  const theme = extendTheme({ direction })

  return (
    <ChakraProvider theme={theme}>
      <RtlProvider>{children}</RtlProvider>
    </ChakraProvider>
  )
}
