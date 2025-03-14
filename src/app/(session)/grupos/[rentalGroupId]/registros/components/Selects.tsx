'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { useGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/useGetRentalRegister'
import { Select, SelectItem } from '@heroui/react'
import { useRouter, useSearchParams } from 'next/navigation'

export function SelectYear() {
  const { data, isError } = useGetRentalGroupRegister()

  const searchParams = useSearchParams()
  const { replace } = useRouter()

  if (isError) return <ErrorUi />

  const { rentalGroupRegister } = data ?? {}

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target

    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('year', value)

    const currentSelectMonth = rentalGroupRegister?.billData.month ?? searchParams.get('month')
    if (currentSelectMonth) newSearchParams.set('month', currentSelectMonth.toString())

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

  const billDataYear = rentalGroupRegister?.billData.year.toString()
  const defaultSelectedKeys = [searchParams.get('year') ?? billDataYear ?? '']

  return (
    <Select
      selectionMode='single'
      name='year'
      onChange={handleChange}
      disallowEmptySelection
      classNames={{ base: 'max-w-full w-24' }}
      placeholder='Selecciona una opción'
      label='Año'
      labelPlacement='outside'
      selectedKeys={defaultSelectedKeys}
    >
      {getYearsUntilNow().map(year => (
        <SelectItem key={year.key}>{year.label}</SelectItem>
      ))}
    </Select>
  )
}

export function SelectMonth() {
  const { data, isError } = useGetRentalGroupRegister()

  const searchParams = useSearchParams()
  const { replace } = useRouter()

  if (isError) return <ErrorUi />

  const { rentalGroupRegister } = data ?? {}

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target

    const newSearchParams = new URLSearchParams(searchParams)

    const currentSelectYear = rentalGroupRegister?.billData.year ?? searchParams.get('year')
    if (currentSelectYear) newSearchParams.set('year', currentSelectYear.toString())

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

  const billDataMonth = rentalGroupRegister?.billData.month.toString()
  const defaultSelectedKeys = [searchParams.get('month') ?? billDataMonth ?? '']

  return (
    <Select
      selectionMode='single'
      name='month'
      onChange={handleChange}
      disallowEmptySelection
      classNames={{ base: 'w-36 max-w-full' }}
      placeholder='Selecciona una opción'
      label='Mes'
      labelPlacement='outside'
      selectedKeys={defaultSelectedKeys}
    >
      {months.map(month => (
        <SelectItem key={month.key}>{month.label}</SelectItem>
      ))}
    </Select>
  )
}
