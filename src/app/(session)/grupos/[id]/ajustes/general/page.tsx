import { Button } from '@nextui-org/react'

export default function Page() {
  return (
    <>
      <section className='flex flex-col gap-y-6'>
        <div>
          <h3 className='text-lg font-bold'>Eliminar grupo</h3>
          <p>El proyecto se eliminará permanentemente, incluyendo sus registros.</p>
        </div>

        <Button color='danger' className='w-fit'>
          Eliminar
        </Button>
      </section>
    </>
  )
}
