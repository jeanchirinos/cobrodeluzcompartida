import type { Config } from 'tailwindcss'
import { heroui } from '@heroui/react'
import plugin from 'tailwindcss/plugin'

const tailwindPlugin = plugin(plugin => {
  const { addUtilities } = plugin

  addUtilities({
    '.flex-center': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '.main-container': {
      width: '1600px',
      marginInline: 'auto',
      maxWidth: '100%',
      paddingInline: '1.5rem',
    },
  })
})

const herouiPlugin = heroui({ addCommonColors: true })

const config: Config = {
  content: ['./src/**/*.{tsx,mdx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {},
  darkMode: 'class',
  plugins: [herouiPlugin, tailwindPlugin, require('@headlessui/tailwindcss')],
}

export default config
