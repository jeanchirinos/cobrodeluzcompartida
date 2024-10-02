'use client'

import { DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { ResponseGetTenants } from '@/controllers/TenatController/getTenants/getTenants'
import { SchemaUpdateTenant, schemaUpdateTenant } from '@/controllers/TenatController/updateTenant/updateTenant.schema'
import { useUpdateTenant } from '@/controllers/TenatController/updateTenant/useUpdateTenant'
import { Switch } from '@nextui-org/react'
import { SubmitHandler } from 'react-hook-form'

type UpdateTenantDialogProps = { tenant: ResponseGetTenants[0]; dialog: UseDialog }

export function UpdateTenantDialog(props: UpdateTenantDialogProps) {
  const { tenant, dialog } = props

  // HOOKS
  const { mutateAsync } = useUpdateTenant()

  const useFormHook = useReactHookForm({
    schema: schemaUpdateTenant,
    defaultValues: tenant,
  })

  const { handleSubmit } = useFormHook

  // FUNCTIONS
  const onSubmit: SubmitHandler<SchemaUpdateTenant> = async data => {
    try {
      await mutateAsync({ ...data, id: tenant.id })
    } catch (error) {}
  }

  return (
    <>
      <DialogBody>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-5'>
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
              <p>Activo</p>
              <p className='text-default-400'>
                Solo un inquilino puede ser activo. Si se activa este inquilino, el anterior se desactivará
              </p>
            </div>
          </Switch>
          <HookFormButton useFormHook={useFormHook} className='hidden' />
        </form>
      </DialogBody>
      <DialogFooter
        useFormHook={{ ...useFormHook, onSubmit: handleSubmit(onSubmit) }}
        dialog={dialog}
        variant='3'
        mainButtonProps={{
          children: 'Actualizar',
        }}
      />
    </>
  )
}
