'use client'

import { Select, SelectItem } from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation'

export function Selects() {
  return (
    <>
      <SelectYear />
      <SelectMonth />
    </>
  )
}

export function SelectYear() {
  // HOOKS
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target

    if (value === '') return

    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('year', value)

    replace('?' + newSearchParams.toString())
  }

  function getYearsUntilNow() {
    const currentYear = new Date().getFullYear()
    const startYear = 2020

    const years: Array<{ key: string; label: string }> = []

    for (let i = currentYear; i >= startYear; i--) {
      years.push({
        key: i.toString(),
        label: i.toString(),
      })
    }

    return years
  }

  const defaultSelectedKeys = [searchParams.get('year') ?? '']

  return (
    <Select
      multiple={false}
      selectionMode='single'
      name='year'
      onChange={handleChange}
      classNames={{ base: 'max-w-full w-24' }}
      placeholder='Selecciona una opción'
      label='Año'
      labelPlacement='outside'
      defaultSelectedKeys={defaultSelectedKeys}
    >
      {getYearsUntilNow().map(year => (
        <SelectItem key={year.key}>{year.label}</SelectItem>
      ))}
    </Select>
  )
}

export function SelectMonth() {
  // HOOKS
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target

    if (value === '') return

    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('month', value)

    replace('?' + newSearchParams.toString())
  }

  const months = [
    { key: '1', label: 'Enero' },
    { key: '2', label: 'Febrero' },
    { key: '3', label: 'Marzo' },
    { key: '4', label: 'Abril' },
    { key: '5', label: 'Mayo' },
    { key: '6', label: 'Junio' },
    { key: '7', label: 'Julio' },
    { key: '8', label: 'Agosto' },
    { key: '9', label: 'Septiembre' },
    { key: '10', label: 'Octubre' },
    { key: '11', label: 'Noviembre' },
    { key: '12', label: 'Diciembre' },
  ]

  const defaultSelectedKeys = [searchParams.get('month') ?? '']

  return (
    <Select
      multiple={false}
      selectionMode='single'
      name='month'
      onChange={handleChange}
      classNames={{ base: 'w-36 max-w-full' }}
      placeholder='Selecciona una opción'
      label='Mes'
      labelPlacement='outside'
      defaultSelectedKeys={defaultSelectedKeys}
    >
      {months.map(month => (
        <SelectItem key={month.key}>{month.label}</SelectItem>
      ))}
    </Select>
  )
}
