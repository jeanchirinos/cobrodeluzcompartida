'use client'

import { useGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/useGetRentalRegister'

export function BillData() {
  const { data } = useGetRentalGroupRegister()

  if (!data) return <></>

  const { billData } = data.rentalGroupRegister ?? {}

  if (!billData) return <></>

  return (
    <div className='flex flex-col gap-y-3'>
      <Data label='Consumo kWh' content={billData.consumption_kwh} />
      <Data label='Precio kWh' content={`S/. ${billData.kwh_price}`} />
      <Data label='Total mes actual' content={`S/. ${billData.current_month_total}`} />
      <Data label='Total' content={`S/. ${billData.total}`} />
      <Data label='IGV' content={billData.igv} />
    </div>
  )
}

function Data(props: { label: React.ReactNode; content: React.ReactNode }) {
  return (
    <div className='flex items-center gap-x-2'>
      <span className='text-foreground-500'>{props.label} :</span>
      <span>{props.content}</span>
    </div>
  )
}
