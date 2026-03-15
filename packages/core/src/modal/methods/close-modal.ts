import { getNamespaceState } from '../state'
import type { ModalCloseOptions } from '../types'

/** Closes all modals in the namespace sequentially (LIFO order) */
export async function closeModal(options: ModalCloseOptions = {}): Promise<void> {
  // Snapshot and reverse: close top-to-bottom so a guard rejection on an upper modal
  // leaves lower modals untouched
  const queue = [...getNamespaceState(options.namespace).queue].reverse()
  for (const modal of queue) {
    await modal.close()
  }
}
