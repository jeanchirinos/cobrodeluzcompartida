import { IconPasswordHidden, IconPasswordVisible } from '@/icons'
import { Input as HeroUiInput, type InputProps as HeroUiInputProps } from '@heroui/input'
import { forwardRef, useState } from 'react'

export const Input = forwardRef<HTMLInputElement, HeroUiInputProps>(function Input(props, ref) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const passwordVisibility =
    props.type === 'password'
      ? {
          endContent: (
            <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
              {isVisible ? (
                <IconPasswordHidden className='pointer-events-none text-2xl text-default-400' />
              ) : (
                <IconPasswordVisible className='pointer-events-none text-2xl text-default-400' />
              )}
            </button>
          ),
          type: isVisible ? 'text' : 'password',
        }
      : {}

  return <HeroUiInput placeholder=' ' labelPlacement='outside' {...props} ref={ref} {...passwordVisibility} />
})
