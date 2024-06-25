import { IconPasswordHidden, IconPasswordVisible } from '@/icons'
import { Input as NextUiInput } from '@nextui-org/input'
import { type ComponentProps, forwardRef, useState } from 'react'

type Props = ComponentProps<typeof NextUiInput> & {
  sensitive?: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(props, ref) {
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

  return <NextUiInput placeholder=' ' labelPlacement='outside' {...props} ref={ref} {...passwordVisibility} />
})
