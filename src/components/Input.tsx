import { IconPasswordHidden, IconPasswordVisible } from '@/icons'
import { Input as NextUiInput, type InputProps as NextUiInputProps } from '@nextui-org/input'
import { forwardRef, useState } from 'react'

export type InputProps = NextUiInputProps & {
  sensitive?: boolean
  isLoading?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
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

  const isDisabled = props.isLoading ?? props.isDisabled

  return (
    <NextUiInput
      placeholder=' '
      labelPlacement='outside'
      {...props}
      ref={ref}
      {...passwordVisibility}
      isDisabled={isDisabled}
    />
  )
})
