'use client'

import { useGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/useGetRentalRegister'

export function BillData() {
  const {
    data: { rentalGroupRegister },
  } = useGetRentalGroupRegister()

  const { billData } = rentalGroupRegister!

  return (
    <div>
      <p>Consumo kWh: {billData.consumption_kwh}</p>
      <p>Precio kWh: S/. {billData.kwh_price}</p>
      <p>Total mes actual: S/. {billData.current_month_total}</p>
      <p>Total: S/. {billData.total}</p>
      <p>IGV: {billData.igv}</p>
    </div>
  )
}
