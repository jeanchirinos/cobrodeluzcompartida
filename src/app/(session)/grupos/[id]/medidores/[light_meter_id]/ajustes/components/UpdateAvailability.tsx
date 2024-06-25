import { Switch } from '@nextui-org/react'

export function UpdateAvailability() {
  return (
    <section className='flex w-fit flex-col gap-y-6'>
      <Switch
        classNames={{
          base: 'flex-row-reverse gap-x-6',
        }}
        // isDisabled
      >
        <div className='flex flex-col gap-y-1'>
          <h3 className='text-lg font-bold'>Disponibilidad</h3>
          <p>Si está activo, el medidor será considerado en el cálculo.</p>
        </div>
      </Switch>
    </section>
  )
}
