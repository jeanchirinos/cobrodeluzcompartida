'use client'

import { cn, cnx } from '@/lib/utils'

export type SelectProps = {
  options: any[] | undefined
  label?: React.ReactNode
  optionKeyValue?: string
  optionKeyText?: string
  classNames?: {
    label?: string
    select?: string
    option?: string
  }
  state?: {
    selected?: string
    onSelectChange?: (value: string) => void
  }
  stateNumber?: {
    selected?: number
    onSelectChange?: (value: number) => void
  }
}

export function Select(props: React.ComponentProps<'select'> & SelectProps) {
  const {
    options,
    label,
    optionKeyValue = 'id',
    optionKeyText = 'name',
    classNames,
    className,
    state,
    stateNumber,
    required = true,
    ...otherProps
  } = props

  const stringState = 'state' in props ? props.state : undefined
  const numberState = 'stateNumber' in props ? props.stateNumber : undefined

  // FUNCTIONS
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (stringState) {
      stringState?.onSelectChange?.(e.target.value)
    }

    if (numberState) {
      numberState?.onSelectChange?.(Number(e.target.value))
    }
  }

  const getOptionValue = (option: string | number | any) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return option
    }

    return option[optionKeyValue]
  }

  const getOptionText = (option: string | number | any) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return option
    }

    return option[optionKeyText]
  }

  // RENDER
  return (
    <label className={cnx('relative flex flex-col gap-y-1', className)}>
      {label && <span className={cnx('text-sm text-foreground-500', classNames?.label)}>{label}</span>}
      <select
        disabled={!options}
        required={required}
        className={cnx(
          'w-full cursor-pointer rounded-lg border-r-4 border-r-transparent bg-default-100 py-2 pl-1 text-sm focus:outline focus:outline-foreground-400',
          classNames?.select,
        )}
        value={stringState?.selected ?? numberState?.selected ?? undefined}
        onChange={handleChange}
        {...otherProps}
      >
        <option className={cn(required && 'hidden')} value=''>
          Selecciona una opción
        </option>
        {options?.map(option => (
          <option key={getOptionValue(option)} value={getOptionValue(option)} className={cn(classNames?.option)}>
            {getOptionText(option)}
          </option>
        ))}
      </select>
    </label>
  )
}
