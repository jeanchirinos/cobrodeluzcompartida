'use client'

import { SchemaCalculateResultsAdd } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { Select, SelectItem } from '@heroui/react'
import { Controller, useFormContext } from 'react-hook-form'

export function SelectYear() {
  const { control } = useFormContext<SchemaCalculateResultsAdd>()

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

  return (
    <Controller
      name='billData.year'
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          selectedKeys={field.value ? [field.value.toString()] : undefined}
          onChange={e => field.onChange(Number(e.target.value))}
          selectionMode='single'
          classNames={{ base: 'max-w-full w-24' }}
          placeholder='Selecciona una opción'
          label='Año'
          labelPlacement='outside'
          disallowEmptySelection
        >
          {getYearsUntilNow().map(year => (
            <SelectItem key={year.key}>{year.label}</SelectItem>
          ))}
        </Select>
      )}
    />
  )
}

export function SelectMonth() {
  const { control } = useFormContext<SchemaCalculateResultsAdd>()

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

  return (
    <Controller
      name='billData.month'
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          selectedKeys={field.value ? [field.value.toString()] : undefined}
          onChange={e => field.onChange(Number(e.target.value))}
          selectionMode='single'
          classNames={{ base: 'w-36 max-w-full' }}
          placeholder='Selecciona una opción'
          label='Mes'
          labelPlacement='outside'
          disallowEmptySelection
        >
          {months.map(month => (
            <SelectItem key={month.key}>{month.label}</SelectItem>
          ))}
        </Select>
      )}
    />
  )
}
