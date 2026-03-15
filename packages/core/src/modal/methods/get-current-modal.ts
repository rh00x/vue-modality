import { getNamespaceState } from '../state'
import type { NamespaceKey } from '../types'

/** Returns the topmost active modal in the namespace, or `undefined` if the queue is empty */
export function getCurrentModal(namespace?: NamespaceKey) {
  const ns = getNamespaceState(namespace)
  return ns.queue.at(-1)
}
