'use client'

import { DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { Switch } from '@nextui-org/react'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { ResponseGetTenants } from '@/controllers/TenatController/getTenants'
import { schemaUpdateTenant } from '@/controllers/TenatController/updateTenant/updateTenant.schema'
import { updateTenant } from '@/controllers/TenatController/updateTenant/updateTenant'

type UpdateTenantDialogProps = { tenant: ResponseGetTenants[0]; dialog: UseDialog }

export function UpdateTenantDialog(props: UpdateTenantDialogProps) {
  const { tenant, dialog } = props

  // HOOKS
  const { useFormHook } = useReactHookForm({
    schema: schemaUpdateTenant,
    defaultValues: tenant,
    submitActionFn: data => updateTenant({ ...data, id: tenant.id }),
  })

  return (
    <>
      <DialogBody>
        <form onSubmit={useFormHook.onSubmit} className='flex flex-col gap-y-5'>
          <CustomInput useFormHook={useFormHook} name='alias' label='Alias' />
          <Switch
            classNames={{
              base: 'flex-row-reverse gap-x-2',
            }}
            {...useFormHook.register('active')}
            size='sm'
            name='active'
            defaultSelected={tenant.active}
          >
            <div className='flex flex-col gap-1'>
              <p className='text-medium'>Activo</p>
              <p className='text-small text-default-400'>
                Solo un inquilino puede ser activo. Si se activa este inquilino, el anterior se desactivará
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
