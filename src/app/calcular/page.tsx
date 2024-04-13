import { Input } from '@/components/Input';
import { Table } from '@/components/Table';

export default function Page() {

  return (
    <div>
      <form>
          <article className='flex flex-col gap-y-5'>
              <h3 className='text-xl font-semibold'>Datos del recibo</h3>
              <Input label='Consumo kWh' placeholder='0.00'/>
              <Input label='kWh al precio de' placeholder='0.00' startContent='S/.'/>
              <Input label='TOTAL mes actual' placeholder='0.00' startContent='S/.'/>
              <Input label='Total a pagar' placeholder='0.00' startContent='S/.'/>
          </article>
          <article className='flex flex-col gap-y-5'>
              <h3 className='text-xl font-semibold'>Datos de los medidores (kWh)</h3>
              <Input label='Consumo 1' placeholder='0.00'/>
          </article>
      </form>

        {/* <Table/> */}
    </div>
  );
}
