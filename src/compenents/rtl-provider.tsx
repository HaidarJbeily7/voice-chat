// src/components/rtl-provider.js

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtl from 'stylis-plugin-rtl'

// NB: A unique `key` is important for it to work!
const options = {
  rtl: { key: 'css-ar', stylisPlugins: [rtl] },
  ltr: { key: 'css-en' }
}

export function RtlProvider ({ children }: { children: React.ReactNode }) {
  const dir = 'rtl'
  const cache = createCache(options[dir])
  return <CacheProvider value={cache} children={children} />
}
