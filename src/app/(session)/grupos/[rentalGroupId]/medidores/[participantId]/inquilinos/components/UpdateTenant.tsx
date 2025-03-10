'use client'

import { DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { useReactHookForm } from '@/hooks/useReactHookForm'
import { ResponseGetTenants } from '@/controllers/TenatController/getTenants/getTenants'
import { SchemaUpdateTenant, schemaUpdateTenant } from '@/controllers/TenatController/updateTenant/updateTenant.schema'
import { useUpdateTenant } from '@/controllers/TenatController/updateTenant/useUpdateTenant'
import { Button, Input, Switch } from '@heroui/react'
import { Controller, SubmitHandler } from 'react-hook-form'

type UpdateTenantDialogProps = { tenant: ResponseGetTenants[0]; dialog: UseDialog }

export function UpdateTenantDialog(props: UpdateTenantDialogProps) {
  const { tenant, dialog } = props

  // HOOKS
  const { mutate, isPending } = useUpdateTenant()

  const {
    handleSubmit,
    control,
    register,
    formState: { isDirty, isValid },
  } = useReactHookForm({
    schema: schemaUpdateTenant,
    values: tenant,
  })

  // FUNCTIONS
  const onSubmit: SubmitHandler<SchemaUpdateTenant> = data => {
    mutate({ ...data, id: tenant.id }, { onSuccess: dialog.close })
  }

  return (
    <>
      <DialogBody>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-5'>
          <Controller
            name='alias'
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label='Alias'
                {...field}
                value={field.value ?? ''}
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
                labelPlacement='outside'
              />
            )}
          />

          <Switch
            classNames={{
              base: 'flex-row-reverse gap-x-2',
            }}
            {...register('active')}
            size='sm'
            defaultSelected={tenant.active}
          >
            <div className='flex flex-col gap-1'>
              <p>Activo</p>
              <p className='text-default-400'>
                Solo un inquilino puede ser activo. Si se activa este inquilino, el anterior se desactivará
              </p>
            </div>
          </Switch>
        </form>
      </DialogBody>

      <DialogFooter>
        <Button onPress={dialog.close} variant='flat'>
          Cancelar
        </Button>
        <Button
          color='primary'
          isLoading={isPending}
          onPress={() => handleSubmit(onSubmit)()}
          isDisabled={!isDirty || !isValid}
        >
          Actualizar
        </Button>
      </DialogFooter>
    </>
  )
}
