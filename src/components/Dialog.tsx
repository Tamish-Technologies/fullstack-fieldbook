import * as Primitive from '@radix-ui/react-dialog'
import { useRef, type ReactNode } from 'react'

// Selected shadcn/ui Dialog composition, with the Fieldbook's safe initial focus and tokens.
export function Dialog({
  title,
  description,
  children,
  onClose,
  returnTo,
  drawer = false,
  closeLabel = 'Cancel',
}: {
  title: string
  description: string
  children: ReactNode
  onClose: () => void
  returnTo: HTMLElement | null
  drawer?: boolean
  closeLabel?: string
}) {
  const safe = useRef<HTMLButtonElement>(null)
  return (
    <Primitive.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <Primitive.Portal>
        <Primitive.Overlay className="overlay" />
        <Primitive.Content
          className={drawer ? 'dialog drawer' : 'dialog'}
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            safe.current?.focus()
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault()
            if (returnTo?.isConnected) returnTo.focus()
          }}
        >
          <Primitive.Title>{title}</Primitive.Title>
          <Primitive.Description>{description}</Primitive.Description>
          <button ref={safe} onClick={onClose} className="secondary">
            {closeLabel}
          </button>
          {children}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  )
}
