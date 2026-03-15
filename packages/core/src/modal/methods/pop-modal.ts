import type { ModalCloseOptions } from '../types'
import { getCurrentModal } from './get-current-modal'

/** Closes the topmost active modal in the namespace */
export async function popModal(options: ModalCloseOptions = {}): Promise<void> {
  const modal = getCurrentModal(options.namespace)
  if (!modal) return
  await modal.close()
}
