import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
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
      paddingInline: '1rem',
    },
  })
})

const nextuiPlugin = nextui({ addCommonColors: true })

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  darkMode: 'class',
  plugins: [nextuiPlugin, tailwindPlugin],
}
export default config
