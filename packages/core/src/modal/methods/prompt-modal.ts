import type { Component } from 'vue'
import { MODAL_EVENT_PROMPT } from '../modal'
import type { ModalOptions } from '../types'
import { pushModal } from './push-modal'

/**
 * Opens a modal and waits for a result via the `MODAL_EVENT_PROMPT` event.
 * Resolves with the value passed to the event, or `null` if the modal is
 * closed without emitting a result.
 */
export function promptModal<T = unknown>(
  component: Component,
  props: any = {},
  options: Partial<ModalOptions> = {}
): Promise<T | null> {
  const modal = pushModal(component, props, options)
  let isPrompted = false

  const { promise, resolve } = Promise.withResolvers<T | null>()

  const unsubscribe = modal.on(MODAL_EVENT_PROMPT, async (data: T) => {
    // Guard against concurrent calls: ignore a second emit while close is in progress
    if (isPrompted) return
    isPrompted = true

    try {
      await modal.close()
      resolve(data)
    } catch {
      // Guard rejected the close — reset the flag so the user can retry
      isPrompted = false
    }
  })

  // addDestroyGuard is called after the modal is fully closed (non-cancellable)
  modal.addDestroyGuard(() => {
    unsubscribe()
    if (!isPrompted) {
      resolve(null)
    }
  })

  return promise
}
