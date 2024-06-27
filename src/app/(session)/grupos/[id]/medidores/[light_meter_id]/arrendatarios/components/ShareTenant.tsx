'use client'

import { DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { Snippet } from '@nextui-org/react'
import { ResponseGetTenants } from '@/controllers/TenatController/getTenants'
import { ROUTE } from '@/constants/routes'
import { Link } from '@/components/Link'

type ShareParticipantDialogProps = { tenant: ResponseGetTenants[0]; dialog: UseDialog }

export function ShareTenantDialog(props: ShareParticipantDialogProps) {
  const { tenant, dialog } = props

  const href = ROUTE.TENANT.SHARE({ tenantId: tenant.id, key: tenant.key })

  return (
    <>
      <DialogBody className='flex flex-col gap-y-4'>
        <p>
          Comparte este{' '}
          <Link
            href={ROUTE.TENANT.SHARE({ tenantId: tenant.id, key: tenant.key })}
            color='primary'
            isExternal
            showAnchorIcon
          >
            enlace
          </Link>{' '}
          con el arrendatario para que pueda ver sus registros de este medidor.
        </p>
        <Snippet hideSymbol tooltipProps={{ content: 'Copiar enlace' }}>
          {href}
        </Snippet>
      </DialogBody>
      <DialogFooter variant='1' dialog={dialog} />
    </>
  )
}
