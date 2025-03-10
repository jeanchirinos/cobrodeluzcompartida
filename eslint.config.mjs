import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      'no-unused-vars': 'off',
      'prefer-const': 'warn',
      'no-empty': 'warn',
      'no-unreachable': 'warn',
      'spaced-comment': 'warn',
      camelcase: 'off',
      'no-console': 'warn',
      'no-new': 'off',
      'no-undef-init': 'warn',
      'import/no-duplicates': 'warn',
      'no-useless-rename': 'warn',
      'no-return-await': 'off',
      'no-unneeded-ternary': 'warn',
    },
  }),
]

export default eslintConfig
