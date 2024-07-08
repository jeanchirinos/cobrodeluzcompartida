'use client'

import { DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { Switch } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { ResponseGetTenants } from '@/controllers/TenatController/getTenants'
import { schemaUpdateTenant } from '@/controllers/TenatController/updateTenant/updateTenant.schema'
import { updateTenant } from '@/controllers/TenatController/updateTenant/updateTenant'

type UpdateTenantDialogProps = { tenant: ResponseGetTenants[0]; dialog: UseDialog }

export function UpdateTenantDialog(props: UpdateTenantDialogProps) {
  const { tenant, dialog } = props

  const { light_meter_id: lightMeterId } = useParams<{ light_meter_id: string }>()

  // HOOKS
  const { useFormHook } = useReactHookForm({
    schema: schemaUpdateTenant,
    defaultValues: tenant,
    submitActionFn: data => updateTenant({ ...data, lightMeterId: Number(lightMeterId), id: tenant.id }),
  })

  return (
    <>
      <DialogBody>
        <form onSubmit={useFormHook.onSubmit} className='flex flex-col gap-y-5'>
          <CustomInput useFormHook={useFormHook} name='alias' label='Alias' />
          <CustomInput useFormHook={useFormHook} name='key' label='Clave' isDisabled />
          <Switch
            classNames={{
              base: 'flex-row-reverse gap-x-2',
            }}
            {...useFormHook.register('active')}
            size='sm'
            name='active'
            defaultSelected={tenant.active}
            //! watch may be needed
          >
            <div className='flex flex-col gap-1'>
              <p className='text-medium'>Activo</p>
              <p className='text-small text-default-400'>
                Solo un arrendatario puede ser activo. Si se activa este arrendatario, el anterior se desactivará
              </p>
            </div>
          </Switch>
          <HookFormButton useFormHook={useFormHook} className='hidden' />
        </form>
      </DialogBody>
      <DialogFooter
        useFormHook={useFormHook}
        dialog={dialog}
        variant='3'
        mainButtonProps={{
          children: 'Actualizar',
        }}
      />
    </>
  )
}
